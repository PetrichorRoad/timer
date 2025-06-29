import Base from './base'
// import { chatStore } from '@/store'
import { chatStore } from '@/store/chat'
import { useDialogueStore } from "@/store/dialogue.js";
import { datetime } from '@/utils/lib/utils'

/**
 * 好友状态事件
 */
class Revoke extends Base {
  /**
   * @var resource 资源
   */
  resource

  /**
   * 发送者ID
   */
  from_id = 0

  /**
   * 接收者ID
   */
  to_from_id = 0

  /**
   * 聊天类型[1:私聊;2:群聊;]
   */
  talk_mode = 0

  /**
   * 消息ID
   */
  msg_id = 0

  /**
   * 初始化构造方法
   *
   * @param {Object} resource Socket消息
   */
  constructor(resource) {
    super()

    this.resource = resource
    this.from_id = resource.from_id
    this.to_from_id = resource.to_from_id
    this.talk_mode = resource.talk_mode
    this.msg_id = resource.msg_id

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
  getIndexName() {
    if (this.talk_mode == 2) {
      return `${this.talk_mode}_${this.to_from_id}`
    }

    const to_from_id = this.isCurrSender() ? this.to_from_id : this.from_id

    return `${this.talk_mode}_${to_from_id}`
  }

  handle() {
    // chatStore().updateItem({
    //   index_name: this.getIndexName(),
    //   msg_text: this.resource.remark,
    //   updated_at: datetime()
    // })

    // 判断当前是否正在和好友对话
    if (!this.isTalk(this.talk_mode, this.to_from_id)) {
      return
    }

    useDialogueStore().updateDialogueRecord({
      msg_id: this.msg_id,
      is_revoked: 1
    })
  }
}

export default Revoke
