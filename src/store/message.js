import { defineStore } from 'pinia'
import { useDialogueStore } from './dialogue'
import { getUserInfo } from '@/utils/lib'
import { ServTalkMessageSend } from '@/api/modules/chat'
import { v4  } from 'uuid'
import { nextTick } from 'vue'
import {msgTypeMap} from '@/constant/default'
import { datetime } from '@/utils/lib/utils'


// 消息状态常量
const MESSAGE_STATUS_SENT = 1
const MESSAGE_STATUS_PENDING = 2
const MESSAGE_STATUS_FAILED = 3

const MAX_RETRIES = 6

// 编辑器草稿
export const useAsyncMessageStore = defineStore('async-message', () => {
  const { uid, nickname, avatar } = getUserInfo()
  const dialogueStore = useDialogueStore()

  // 待推送消息ID
  let items= []

  // 异步消息ID缓存
  const msgIdsSet = new Set()
  // 添加待推送消息
  function addAsyncMessage(data) {
    data.msg_id = uuid()
    items.push(data)

    msgIdsSet.add(data.msg_id)

    addRecordList(data)
    sendMessage(data)
  }

  async function sendMessage(message, retryCount = 0) {
    try {
      const { code } = await ServTalkMessageSend(message)
      if (code !== 200) {
        if (retryCount < MAX_RETRIES) {
          await delay(delayStrategy(retryCount))
          await sendMessage(message, retryCount + 1)
        } else {
          console.error(`Failed to send message after ${MAX_RETRIES} retries`, message)
          updateMessageStatus(message.msg_id, MESSAGE_STATUS_FAILED)
          msgIdsSet.delete(message.msg_id)
        }
        return
      }

      // 更新对话记录状态
      updateMessageStatus(message.msg_id, MESSAGE_STATUS_SENT)

      // 发送成功后将消息从待推送列表中移除
      items = items.filter((item) => item.msg_id !== message.msg_id)
    } catch (error) {
      console.error('Error sending message', error, message)
    }
  }

  // 推送到会话记录中
  async function addRecordList(data) {
    const record = {
      msg_id: data.msg_id,
      sequence: 0,
      msg_type: msgTypeMap[data.type],
      from_id: uid,
      nickname: nickname,
      avatar: avatar,
      is_revoked: 2,
      send_time: datetime(),
      extra: JSON.stringify(data.body),
      quote: {},
      status: MESSAGE_STATUS_PENDING
    }

    if (data.quote_id) {
      const quote = dialogueStore.records.find((item) => item.msg_id === data.quote_id)
      if (quote) {
        record.quote = {
          quote_id: quote.msg_id,
          msg_type: 1,
          nickname: quote.nickname,
          content: quote.extra.content ?? '查看消息'
        }
      }
    }

    dialogueStore.addDialogueRecord(record)
    // console.log('record', dialogueStore.records)
    nextTick(() => {
      dialogueStore.scrollToBottom(false)
    })
  }

  // 更新消息状态
  function updateMessageStatus(msg_id, status) {
    dialogueStore.records.forEach((item) => {
      if (item.msg_id === msg_id) {
        item.status = status
      }
    })
  }

  const msgIdsCache = {
    has(msg_id) {
      return msgIdsSet.has(msg_id)
    },
    clear(msg_id) {
      msgIdsSet.delete(msg_id)
    }
  }

  return {
    addAsyncMessage,
    msgIdsCache
  }
})

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function delayStrategy(retryCount) {
  return retryCount * 1500
}

function uuid() {
  // @ts-ignore
  return v4().replaceAll('-', '')
}
