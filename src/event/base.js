import { getUserInfo } from "@/utils/auth.js";
import { useSessionStore } from "@/store/session.js";
import {router} from '@/router'

class Base {
  /**
   * 初始化
   */
  constructor() {}

  /**
   * 获取当前登录用户的ID
   */
  getAccountId() {
    return getUserInfo().uid
  }

  getTalkParams() {
    const talkStore = useSessionStore()

    const { conversation } = talkStore
    const { talk_mode, to_from_id } = conversation
    console.log(conversation);

    return {
      talk_mode,
      to_from_id,
      index_name: `${talk_mode}_${to_from_id}`
    }
  }

  /**
   * 判断消息是否来自当前对话
   *
   * @param {Number} talk_mode 聊天消息类型[1:私信;2:群聊;]
   * @param {Number} to_from_id 发送者ID
   */
  isTalk(talk_mode, to_from_id) {
    const params = this.getTalkParams()

    return params.to_from_id == to_from_id && talk_mode == params.talk_mode
  }

  /**
   * 判断用户是否打开对话页
   */
  isTalkPage() {
    return ['/message', '/'].includes(router.currentRoute.value.path)
  }
}

export default Base
