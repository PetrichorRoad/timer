<template>
  <section class="el-container is-vertical editor">
    <header class="el-header toolbar border-top">
      <n-popover
        placement="top-start"
        trigger="click"
        raw
        :width="500"
        :height="250"
        ref="emoticonRef"
        class="w-[500px] h-[250px] rounded-[10px] overflow-hidden border-my-border-1 border-[1px] border-solid"
      >
        <template #trigger>
          <div class="toolbar-item">
            <n-icon size="18" class="icon" :component="PersonOutline" />
            <p class="title">表情符号</p>
          </div>
        </template>

        <MeEditorEmoticon @on-select="onEmoticonEvent" />
      </n-popover>

      <div
        class="toolbar-item"
        v-for="nav in navs"
        :key="nav.title"
        v-show="nav.show"
        @click="nav.click"
      >
        <n-icon size="18" class="icon" :component="nav.icon" />
        <p class="title">{{ nav.title }}</p>
      </div>
    </header>

    <main class="el-main">
      <form enctype="multipart/form-data" style="display: none">
        <input type="file" ref="fileImageRef" accept="image/*" @change="onUploadFile" />
        <input type="file" ref="uploadFileRef" @change="onUploadFile" />
      </form>

      <QuillEditor
        ref="editor"
        :options="editorOption"
        @change="onEditorChange"
        style="height: 100%"
      />
    </main>
  </section>

  <MeEditorVote v-if="isShowEditorVote" @close="isShowEditorVote = false" @submit="onVoteEvent" />

  <MeEditorCode
    v-if="isShowEditorCode"
    @on-submit="onCodeEvent"
    @close="isShowEditorCode = false"
  />

  <MeEditorRecorder
    v-if="isShowEditorRecorder"
    @on-submit="onRecorderEvent"
    @close="isShowEditorRecorder = false"
  />
</template>


<script lang="js" setup>
import QuillEditor, { Quill, Delta } from '@/components/editor/quill-editor'
import Emitter from 'quill/core/emitter.js'
import { reactive, watch, ref, markRaw, computed, onMounted, onUnmounted } from 'vue'
import { BookOutline, PersonOutline, WineOutline } from "@vicons/ionicons5";
import  defaultAvatar  from '@/assets/images/notify.png'
import MeEditorVote from './chat-editor/MeEditorVote.vue'
import MeEditorEmoticon from './chat-editor/MeEditorEmoticon.vue'
import MeEditorCode from './chat-editor/MeEditorCode.vue'
import MeEditorRecorder from './chat-editor/MeEditorRecorder.vue'
// import { useEditorDraftStore } from '@/store'
import { deltaToMessage, deltaToString, isEmptyDelta, onUploadImage } from '@/utils/util.js'
import { getImageInfo } from '@/utils/file'
// import { EditorConst } from '@/constant/event-bus'
// import { useEventBus } from '@/hooks'

const emit = defineEmits(['editor-event'])
// const editorDraftStore = useEditorDraftStore()
const props = defineProps({
  showVote: {
    type: Boolean,
    default: false
  },
  indexName: {
    type: String,
    default: ''
  },
  members: {
    type: Array,
    default: () => []
  },
  callback: {
    type: Function,
    default: () => {}
  }
})


// const { showVote = false, indexName = '', members = [], callback } = defineProps()

const editor = ref(null)

const getQuill = () => {
  // @ts-ignore
  return editor?.value?.getQuill()
}

const getQuillSelectionIndex = () => {
  const quill = getQuill()
  if (!quill) return 0

  return (quill.getSelection() || {}).index || quill.getLength()
}

const isShowEditorVote = ref(false)
const isShowEditorCode = ref(false)
const isShowEditorRecorder = ref(false)
const fileImageRef = ref()
const uploadFileRef = ref()
const emoticonRef = ref()

const editorOption = {
  theme: 'snow',
  placeholder: '按Enter发送 / Shift+Enter 换行',
  formats: ['emoji', 'quote', 'mention', 'image'],
  modules: {
    toolbar: false,

    keyboard: {
      bindings: {
        enter: {
          key: 'Enter',
          // 回车发送消息
          handler: onSendMessage
        }
      }
    },

    mention: {
      allowedChars: /^[\u4e00-\u9fa5]*$/,
      mentionDenotationChars: ['@'],
      positioningStrategy: 'fixed',
      renderItem: (data) => {
        const el = document.createElement('div')
        el.className = 'ed-member-item'
        el.innerHTML = `<img src="${data.avatar}" class="avator"/>`
        el.innerHTML += `<span class="nickname">${data.nickname}</span>`
        return el
      },
      source: function (searchTerm, render) {
        if (!props.members.length) return render([])

        const items = [
          { id: 0, nickname: '所有人', avatar: defaultAvatar, value: '所有人' },
          ...props.members.map((item) => {
            return {
              id: item.id,
              nickname: item.nickname,
              avatar: item.avatar,
              value: item.nickname
            }
          })
        ]

        render(items.filter((item) => item.nickname.toLowerCase().indexOf(searchTerm) !== -1))
      },

      mentionContainerClass: 'ql-mention-list-container me-scrollbar me-scrollbar-thumb'
    },

    uploader: {
      mimetypes: ['image/webp', 'image/gif', 'image/png', 'image/jpg', 'image/jpeg'],
      handler(range, files) {
        // @ts-ignore
        const quill = this.quill

        if (!quill.scroll.query('image')) return

        const promises = files.map((file) => {
          return onUploadImage(file)
        })

        Promise.all(promises).then((images) => {
          const update = images.reduce((delta, image) => {
            return delta.insert({ image })
          }, new Delta().retain(range.index).delete(range.length))

          quill.updateContents(update, Emitter.sources.USER)
          quill.setSelection(range.index + images.length, Emitter.sources.SILENT)
        })
      }
    }
  }
}

const navs = reactive([
  {
    title: '图片',
    icon: markRaw(BookOutline),
    show: true,
    click: () => {
      fileImageRef.value.click()
    }
  },
  {
    title: '附件',
    icon: markRaw(BookOutline),
    show: true,
    click: () => {
      uploadFileRef.value.click()
    }
  },
  {
    title: '代码',
    icon: markRaw(BookOutline),
    show: true,
    click: () => {
      isShowEditorCode.value = true
    }
  },
  {
    title: '语音消息',
    icon: markRaw(BookOutline),
    show: true,
    click: () => {
      isShowEditorRecorder.value = true
    }
  },
  {
    title: '群投票',
    icon: markRaw(BookOutline),
    show: computed(() => props.showVote),
    click: () => {
      isShowEditorVote.value = true
    }
  },
  {
    title: '历史记录',
    icon: markRaw(BookOutline),
    show: true,
    click: () => {
      props.callback('history_event')
    }
  }
])

async function onVoteEvent(data) {
  const ok = await callback('vote_event', data)
  ok && (isShowEditorVote.value = false)
}

async function onEmoticonEvent(data) {
  emoticonRef.value.setShow(false)

  if (data.type == 1) {
    const quill = getQuill()
    let index = getQuillSelectionIndex()

    if (index == 1 && quill.getLength() == 1 && quill.getText(0, 1) == '\n') {
      quill.deleteText(0, 1)
      index = 0
    }

    if (data.img) {
      quill.insertEmbed(index, 'emoji', {
        alt: data.value,
        src: data.img,
        width: '24px',
        height: '24px'
      })
    } else {
      quill.insertText(index, data.value)
    }

    quill.setSelection(index + 1, 0, 'user')
  } else {
    await props.callback('emoticon_event', data.value)
  }
}

async function onCodeEvent(data) {
  const ok = await props.callback('code_event', data)
  ok && (isShowEditorCode.value = false)
}

async function onUploadFile(e) {
  if (!e.target.files) return

  const file = e.target.files[0]

  e.target.value = null

  if (file.type.indexOf('image/') === 0) {
    const quill = getQuill()
    let index = getQuillSelectionIndex()

    if (index == 1 && quill.getLength() == 1 && quill.getText(0, 1) == '\n') {
      quill.deleteText(0, 1)
      index = 0
    }

    let src = await onUploadImage(file)
    if (src) {
      quill.insertEmbed(index, 'image', src)
      quill.setSelection(index + 1)
    }

    return
  }

  if (file.type.indexOf('video/') === 0) {
    await props.callback('video_event', file)
  } else {
    await props.callback('file_event', file)
  }
}

async function onRecorderEvent(file) {
  const ok = await props.callback('file_event', file)
  ok && (isShowEditorRecorder.value = false)
}
async function onSendMessage() {
  let delta = getQuill().getContents()
  let data = deltaToMessage(delta)

  if (data.items.length === 0) return

  if (data.msgType == 1) {
    if (data.items[0].content.length > 1024) {
      return window['$message'].info('发送内容超长，请分条发送')
    }

    const ok = await props.callback('text_event', data)
    ok && getQuill().setContents([], Quill.sources.USER)
    return
  }

  if (data.msgType == 3) {
    const ok = await props.callback('image_event', {
      ...getImageInfo(data.items[0].content),
      url: data.items[0].content,
      size: 10000
    })

    ok && getQuill().setContents([], Quill.sources.USER)
    return
  }

  if (data.msgType == 12) {
    const ok = await props.callback('mixed_event', data)
    ok && getQuill().setContents([], Quill.sources.USER)
    return
  }
}

function onEditorChange() {
  const delta = getQuill().getContents()

  const text = deltaToString(delta)

  if (!isEmptyDelta(delta)) {
    // editorDraftStore.items[props.indexName || ''] = JSON.stringify({
    //   text: text,
    //   ops: delta.ops
    // })
  } else {
    // 删除 editorDraftStore.items 下的元素
    // delete editorDraftStore.items[props.indexName || '']
  }
  props.callback('input_event', text)
}

function loadEditorDraftText() {
  // 这里延迟处理，不然会有问题
  // setTimeout(() => {
  //   hideMentionDom()

  //   const quill = getQuill()

  //   if (!quill) return

  //   // 从缓存中加载编辑器草稿
  //   let draft = editorDraftStore.items[props.indexName || '']
  //   if (draft) {
  //     quill.setContents(JSON.parse(draft)?.ops || [])
  //   } else {
  //     quill.setContents([])
  //   }

  //   quill.setSelection(getQuillSelectionIndex(), 0, 'user')
  // }, 10)
}

function onSubscribeMention(data) {
  const quill = getQuill()

  // @ts-ignore
  const mention = quill.getModule('mention')

  // @ts-ignore
  mention.mentionCharPos = quill.getSelection()?.index ?? quill.getLength()

  // @ts-ignore
  mention.insertItem({ id: data?.id, denotationChar: '@', value: data.value }, false)
}

function onSubscribeQuote(data) {
  const delta = getQuill().getContents()
  if (delta.ops?.some((item) => item.insert.quote)) {
    return
  }

  const quill = getQuill()
  const index = getQuillSelectionIndex()

  quill.insertEmbed(0, 'quote', data)
  quill.setSelection(index + 1, 0, 'user')
}

function hideMentionDom() {
  let el = document.querySelector('.ql-mention-list-container')
  el && el.remove()
}

watch(() => props.indexName, loadEditorDraftText, { immediate: true })

onMounted(() => {
  loadEditorDraftText()
})

onUnmounted(() => {
  hideMentionDom()
})

// useEventBus([
//   { name: EditorConst.Mention, event: onSubscribeMention },
//   { name: EditorConst.Quote, event: onSubscribeQuote }
// ])
</script>


<style lang="less" scoped>
.editor {
  --tip-bg-color: rgb(241 241 241 / 90%);

  height: 100%;

  .toolbar {
    height: 38px;
    display: flex;

    .toolbar-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      margin: 0 2px;
      position: relative;
      user-select: none;
      cursor: pointer;

      .title {
        display: none;
        position: absolute;
        top: 40px;
        left: 0px;
        line-height: 26px;
        background-color: var(--tip-bg-color);
        color: var(--im-text-color);
        min-width: 20px;
        font-size: 12px;
        padding: 0 5px;
        border-radius: 2px;
        white-space: pre;
        user-select: none;
        z-index: 999999999999;
      }

      &:hover .title {
        display: block;
      }
    }
  }
}

html[theme-mode='dark'] {
  .editor {
    --tip-bg-color: #48484d;
  }
}
</style>

<style lang="less">
.ql-container.ql-snow {
  border: unset;
}

.ql-editor {
  padding: 8px;
  border: unset;

  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    background-color: unset;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: transparent;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: var(--im-scrollbar-thumb);
    }
  }
}

.ql-editor.ql-blank::before {
  font-family:
    PingFang SC,
    Microsoft YaHei,
    'Alibaba PuHuiTi 2.0 45' !important;
  left: 8px;
}

.ql-snow .ql-editor img {
  max-width: 100px;
  border-radius: 3px;
  background-color: #48484d;
  margin: 0px 2px;
}

.ed-emoji {
  background-color: unset !important;
}

.ql-editor.ql-blank::before {
  font-style: unset;
  color: #b8b3b3;
}

.quote-card-content {
  display: flex;
  background-color: #f6f6f6;
  flex-direction: column;
  padding: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  user-select: none;

  .quote-card-title {
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    justify-content: space-between;

    .quote-card-remove {
      margin-right: 5px;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      transition: all 0.3s;
    }
  }

  &:hover .quote-card-title .quote-card-remove {
    font-size: 30px;
  }

  .quote-card-meta {
    margin-top: 4px;
    font-size: 12px;
    line-height: 20px;
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

html[theme-mode='dark'] {
  .ql-editor.ql-blank::before {
    color: #57575a;
  }

  .quote-card-content {
    background-color: var(--im-message-bg-color);
  }
}
</style>
