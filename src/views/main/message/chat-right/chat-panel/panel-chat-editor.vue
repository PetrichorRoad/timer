<template>
  <footer class="el-footer height100">
    <Editor
      :index-name="indexName"
      :show-vote="talkMode == 2"
      :members="members"
      :callback="onEditorEvent"
    />
  </footer>
  <!-- <HistoryRecord
    v-if="isShowHistory"
    :talk-mode="talkMode"
    :to-from-id="toFromId"
    @close="isShowHistory = false"
  /> -->
</template>
<script lang="js" setup>
// import {
//   useSettingsStore,
//   useUploadsStore,
//   useEditorStore,
// } from '@/store'
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import {storeToRefs } from 'pinia'
import ws from '@/plugins/connect'
// import { ServTalkMessageSend } from '@/api/modules/chat.js'
import {sendMessage} from "@/api/base"
import { ServGroupVoteCreate } from '@/api/modules/group.js'
import { throttle } from 'lodash'
import { getVideoImage } from '@/utils/file'
import Editor from '@/components/editor/editorQuill.vue'
// import HistoryRecord from '@/components/mechat/HistoryRecord.vue'
import { ServUploadImage } from '@/api/modules/upload.js'
import { bus } from '@/utils'
// import { useInject } from '@/hooks'
import { useSessionStore } from "@/store/session.js";
import { useDialogueStore } from "@/store/dialogue.js";
import {useAsyncMessageStore} from '@/store/message.js'
// const { message } = useInject()
// const editorStore = useEditorStore()
// const settingsStore = useSettingsStore()
// const uploadsStore = useUploadsStore()
const talkStore = useSessionStore();
const talkInfo = storeToRefs(talkStore);
const talkSessionInfo = computed(() => {
  let {talkMode,conversation} = talkInfo;
  let {to_from_id} = conversation.value;
  return {talkMode:talkMode.value,to_from_id}
});
const dialogueStore = useDialogueStore()
const { addAsyncMessage } = useAsyncMessageStore()
const props = defineProps({
  uid: {
    type: Number,
    default: 0
  },
  talkMode: {
    type: Number,
    default: null
  },
  toFromId: {
    type: Number,
    default: null
  },
  indexName: {
    type: String,
    default: ''
  },
  online: {
    type: Boolean,
    default: false
  },
  members: {
    default: () => []
  }
})

const isShowHistory = ref(false)

const onSendMessage = async (data= {}) => {
  if (!ws.isConnect()) {
    return Promise.resolve(false)
  }
  let {to_from_id,talkMode} = talkSessionInfo.value

  const params = {
    ...data,
    talk_mode: talkMode,
    to_from_id
  }
  // 异步发送
  if (['text', 'mixed', 'image', 'video', 'code'].includes(params.type)) {
    addAsyncMessage(params)
    // 同步发送
    const { code } = await sendMessage(params)
    
    return true
  }

  
  return true
}

// 发送文本消息
const onSendTextEvent = (data) => {
  return onSendMessage({
    type: 'text',
    quote_id: data.quoteId,
    body: {
      content: data.items[0].content,
      text: data.items[0].content,
      mentions: data.mentionUids
    }
  })
}

// 发送图片消息
const onSendImageEvent = (data) => {
  return onSendMessage({
    type: 'image',
    body: { ...data }
  })
}

// 发送图片消息
const onSendVideoEvent = async (data) => {
  const resp = await getVideoImage(data)

  const coverForm = new FormData()
  coverForm.append('file', resp.file)

  const cover = await ServUploadImage(coverForm)
  if (cover.code != 200) return false

  const form = new FormData()
  form.append('file', data)

  const video = await ServUploadImage(form)
  if (video.code != 200) return false

  return await onSendMessage({
    type: 'video',
    body: {
      url: video.data.src,
      cover: cover.data.src,
      duration: parseInt(`${resp.duration}`),
      size: data.size
    }
  })
}

// 发送代码消息
const onSendCodeEvent = (data) => {
  return onSendMessage({
    type: 'code',
    body: {
      code: data.code,
      lang: data.lang
    }
  })
}

// 发送文件消息
const onSendFileEvent = async (data) => {
  let maxsize = 500 * 1024 * 1024
  if (data.size > maxsize) {
    message.warning('上传文件不能超过500M!')
    return true
  }

  uploadsStore.initUploadFile(data, props.talkMode, props.toFromId, dialogueStore.target.username)
  return true
}

// 发送投票消息
const onSendVoteEvent = async (data) => {
  const { code } = await ServGroupVoteCreate({
    group_id: props.toFromId,
    mode: data.mode,
    is_anonymous: data.is_anonymous,
    title: data.title,
    options: data.options
  })

  return code == 200
}

// 发送表情消息
const onSendEmoticonEvent = (data) => {
  return onSendMessage({
    type: 'emoticon',
    body: {
      emoticon_id: data
    }
  })
}

const onSendMixedEvent = (data) => {
  return onSendMessage({
    type: 'mixed',
    quote_id: data.quoteId,
    body: {
      items: data.items
    }
  })
}

const onKeyboardPush = throttle(() => {
  ws.emit('im.message.keyboard', {
    to_from_id: props.toFromId
  })
}, 3000)

// 编辑器输入事件
const onInputEvent = async (data) => {
  talkStore.updateItem({
    index_name: props.indexName,
    draft_text: data
  })

  // 判断对方是否在线和是否需要推送
  // 3秒时间内推送一次
  // if (settingsStore.isKeyboard && props.online) {
  //   onKeyboardPush()
  // }

  return true
}



// 注册事件
const evnets = {
  text_event: onSendTextEvent,
  image_event: onSendImageEvent,
  video_event: onSendVideoEvent,
  code_event: onSendCodeEvent,
  file_event: onSendFileEvent,
  input_event: onInputEvent,
  vote_event: onSendVoteEvent,
  emoticon_event: onSendEmoticonEvent,
  history_event: async () => {
    isShowHistory.value = true
    return false
  },
  mixed_event: onSendMixedEvent
}

onMounted(() => {
  // editorStore.loadUserEmoticon()
})

const onEditorEvent = async (event, data) => {
  console.log(event, data);
  if (!evnets[event]) return false

  let ok = await evnets[event](data)
  if (ok && !['history_event', 'input_event'].includes(event)) {
    bus.emit('talk-session-scroll', { top: 0 })
  }

  return ok
}
</script>
<style lang="less" scoped></style>
