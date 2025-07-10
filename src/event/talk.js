import Base from './base'
import { nextTick } from 'vue'
import { datetime } from '@/utils/lib/utils'
import { MESSAGE_TYPE, ChatMsgTypeMapping } from '@/constant/default'
import { formatTalkItem, playMusic } from '@/utils/lib/talk'
import { ServTalkClearUnread, ServTalkCreate } from '@/api/modules/chat'
import { useSessionStore  } from '@/store/session'
import { useDialogueStore } from "@/store/dialogue.js";
import { useAsyncMessageStore } from '@/store/message.js'

/**
 * 好友状态事件
 */
class Talk extends Base {
  /**
   * 消息体
   */
  body

  /**
   * 接收者ID
   */
  to_from_id = 0

  /**
   * 发送者ID
   */
  from_id = 0

  /**
   * 聊天类型[1:私聊;2:群聊;]
   */
  talk_mode = 0

  /**
   * 初始化构造方法
   *
   * @param {Object} resource Socket消息
   */
  constructor(data) {
    super()

    const { to_from_id, from_id, talk_mode, body } = data

    Object.assign(this, { from_id, to_from_id, talk_mode, body })

    body.extra = JSON.parse(body.extra)
    body.quote = JSON.parse(body.quote)
    this.handle()
  }

  /**
   * 判断消息发送者是否来自于我
   * @returns
   */
  isCurrSender() {
    return this.from_id == this.getAccountId()
  }

  /**
   * 获取对话索引
   *
   * @return String
   */
  getIndexName(){
    return `${this.talk_mode}_${this.to_from_id}`
  }

  /**
   * 获取聊天列表左侧的对话信息
   */
  getTalkText(){
    let text = ''
    if (this.body.msg_type != 1) {
      text = ChatMsgTypeMapping[this.body.msg_type]
    } else {
      text = this.body.extra.content.replace(/<img .*?>/g, '')
    }

    return text
  }

  // 播放提示音
  play() {
    // 客户端有消息提示
    // if (isElectronMode()) return

    // useSettingsStore().isPromptTone && playMusic()
  }

  handle() {
    const findIndex = useSessionStore().findIndex(this.getIndexName())

    const { msgIdsCache } = useAsyncMessageStore()

    // 判断会话列表是否存在，不存在则创建
    if (findIndex === null) {
      return this.addTalkItem()
    }

    // 判断当前是否正在和好友对话
    if (this.isTalk(this.talk_mode, this.to_from_id)) {
      const isCache = msgIdsCache.has(this.body.msg_id)
      if (isCache) {
        msgIdsCache.clear(this.body.msg_id)
      }
      this.insertTalkRecord(!isCache)

      // if (useSettingsStore().isLeaveWeb) {
      //   this.showMessageNocice()
      // }
    } else {
      this.updateTalkItem()
      this.play()
      this.showMessageNocice()
    }
  }

  /**
   * 显示消息提示
   * @returns
   */
  showMessageNocice() {
    // 是我自己发送的消息不提醒
    if (this.from_id == this.getAccountId()) return

    const notification = new Notification('LumenIM 在线聊天', {
      dir: 'auto',
      lang: 'zh-CN',
      body: '您有新的聊天消息请注意查收!'
    })

    notification.onclick = () => {
      notification.close()
    }
  }

  /**
   * 加载对接节点
   */
  async addTalkItem() {
    const { code, data } = await ServTalkCreate({
      talk_mode: this.talk_mode,
      to_from_id: this.to_from_id
    })

    if (code !== 200) return

    useSessionStore().addItem({ ...formatTalkItem(data), unread_num: 1 })
  }

  /**
   * 插入对话记录
   */
  insertTalkRecord(addRecord = true) {
    let {extra} = this.body
    const record = { ...this.body, extra: JSON.stringify(extra)}

    // 群成员变化的消息，需要更新群成员列表
    if ([1102, 1103, 1104].includes(record.msg_type)) {
      useDialogueStore().updateGroupMembers()
    }

    if (addRecord) {
      useDialogueStore().addDialogueRecord(record)
      useAsyncMessageStore().addIndexDBRecords(record)
    }

    // useSessionStore().updateMessage(
    //   {
    //     index_name: this.getIndexName(),
    //     msg_text: this.getTalkText(),
    //     updated_at: datetime()
    //   },
    //   this.isCurrSender()
    // )

    if (this.getAccountId() !== this.from_id) {
      // 这里需要做节流操作
      ServTalkClearUnread({
        talk_mode: this.talk_mode,
        to_from_id: this.to_from_id
      })
    }

    this.scrollToBottom()
  }

  // 将面板滚动条滚动到最底部
  scrollToBottom() {
    // 获取聊天面板元素节点
    const el = document.getElementById(useDialogueStore().container)
    if (!el) return

    // 判断的滚动条是否在底部
    const isBottom = Math.ceil(el.scrollTop) + el.clientHeight >= el.scrollHeight

    if (isBottom || this.isCurrSender()) {
      nextTick(() => {
        el.scrollTop = el.scrollHeight

        setTimeout(() => {
          el.scrollTop = el.scrollHeight
        }, 100)
      })
    } else {
      useDialogueStore().setUnreadBubble()
    }
  }

  /**
   * 更新对话列表记录
   */
  updateTalkItem() {
    // useSessionStore().updateMessage(
    //   {
    //     index_name: this.getIndexName(),
    //     msg_text: this.getTalkText(),
    //     updated_at: datetime()
    //   },
    //   this.isCurrSender() || this.to_from_id == this.getAccountId()
    // )
  }
}

export default Talk
