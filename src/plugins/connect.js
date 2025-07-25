import { NAvatar } from 'naive-ui'
// import { useTalkStore, useUserStore } from '@/store'
// import { notifyIcon } from '@/constant/default'
import WsSocket from '@/plugins/websocket.js'
import EventTalk from '@/event/talk.js'
import EventKeyboard from '@/event/keyboard.js'
import EventRevoke from '@/event/revoke.js'
import { getToken, getIMToken } from '@/utils/lib'

const urlCallback = () => {
  if (!getIMToken()) {
    window.location.reload()
  }
  let userInfo = JSON.parse(localStorage.getItem('userInfo') || {})
  let clientId = userInfo.accountId
  // return `${import.meta.env.VITE_SOCKET_API}/wss/default.io?token=${getIMToken()}`
  return `${import.meta.env.VITE_SOCKET_API}/timer/ws/${clientId}`
}

class Connect {
  conn;

  constructor() {
    this.conn = new WsSocket(urlCallback, {
      onError: () => {
        // console.error('WebSocket 连接失败:', evt)
      },
      onOpen: () => {
        // useUserStore().updateSocketStatus(true)
        // useTalkStore().loadTalkList()
      },
      onClose: () => {
        // useUserStore().updateSocketStatus(false)
      }
    })
    this.bindEvents()
  }

  connect() {
    this.conn.connection()
  }

  disconnect() {
    this.conn.close()
  }

  isConnect() {
    return this.conn.connect?.readyState === WebSocket.OPEN
  }

  emit(event, data) {
    this.conn.emit(event, data)
  }

  bindEvents() {
    console.log('绑定事件...');
    this.onPing()
    this.onPong()
    this.onImMessage()
    this.onImMessageKeyboard()
    this.onImMessageRevoke()
    this.onImContactApply()
    this.onImGroupApply()
    this.onEventError()
  }

  onPing() {
    this.conn.on('ping', () => this.emit('pong', ''))
  }

  onPong() {
    this.conn.on('pong', () => {})
    this.conn.on('connect', () => {})
  }

  onImMessage() {
    console.log('收到消息');
    this.conn.on('im.message', (data) => new EventTalk(data))
  }

  onImMessageKeyboard() {
    this.conn.on('im.message.keyboard', (data) => new EventKeyboard(data))
  }

  onImMessageRevoke() {
    this.conn.on('im.message.revoke', (data) => new EventRevoke(data))
  }

  onImContactApply() {
    // this.conn.on('im.contact.apply', (data) => {
    //   window['$notification']?.create({
    //     title: '好友申请通知',
    //     content: data.remark,
    //     description: `申请人: ${data.nickname}`,
    //     meta: data.apply_time,
    //     avatar: () =>
    //       h(NAvatar, {
    //         size: 'small',
    //         round: true,
    //         src: notifyIcon,
    //         style: 'background-color:#fff;'
    //       }),
    //     duration: 10000
    //   })

    //   useUserStore().isContactApply = true
    // })
  }

  onImGroupApply() {
    // this.conn.on('im.group.apply', () => {
    //   window['$notification']?.create({
    //     title: '入群申请通知',
    //     content: '有新的入群申请，请注意查收',
    //     avatar: () =>
    //       h(NAvatar, {
    //         size: 'small',
    //         round: true,
    //         src: notifyIcon,
    //         style: 'background-color:#fff;'
    //       }),
    //     duration: 10000
    //   })

    //   useUserStore().isGroupApply = true
    // })
  }

  onEventError() {
    this.conn.on('event_error', (data) => {
      console.error('WebSocket事件错误:', data)
      window['$message']?.error(`错误代码: ${data.error_code} - ${data.error_message}`)
    })
  }
}

// 导出单例
export default new Connect()
