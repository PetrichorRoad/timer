import avatar from '../assets/images/notify.png'
import notify from '../assets/images/notify.png'

export const GenderOptions = [
  {
    label: '未知',
    value: '0'
  },
  {
    label: '男',
    value: '1'
  },
  {
    label: '女',
    value: '2'
  }
]
export const MESSAGE_TYPE = {
  null: { type: "null", name: "未知", component: messageText },
  0: { type: "", name: "", component: messageText },
  1: { type: "text", name: "文本", component: messageText },
  2: { type: "code", name: "代码", component: messageCode },
  3: { type: "image", name: "图片", component: messageImage },
  4: { type: "audio", name: "音频", component: messageAudio },
  5: { type: "video", name: "视频", component: messageVideo },
  6: { type: "document", name: "文件", component: messageFile },
  7: { type: "location", name: "位置", component: messageLocation },
  8: { type: "card", name: "名片", component: messageText },
  9: { type: "session", name: "会话", component: messageSession },
  10: { type: "login", name: "登录信息", component: messageText },
  11: { type: "vote", name: "投票", component: messageVote },
  12: { type: "mixed ", name: "混合信息", component: messageText },
  13: { type: "notice", name: "公告", component: messageText },

  1000: { type: "SysText", name: "系统文本消息", component: messageText },
  1101: {
    type: "SysGroupCreate",
    name: "创建群聊消息",
    component: messageImage,
  },
  1102: { type: "SysGroupJoin", name: "加入群聊消息", component: messageImage },
  1103: {
    type: "SysGroupLeave",
    name: "离开群聊消息",
    component: messageImage,
  },
  1104: { type: "SysGroupKick", name: "踢出群聊消息", component: messageImage },
  1105: {
    type: "SysGroupMessageRevoke",
    name: "管理员撤回成员消息",
    component: messageImage,
  },
  1106: { type: "SysGroupDismissed", name: "群解散", component: messageImage },
  1107: { type: "SysGroupMuted", name: "群禁言", component: messageImage },
  1108: {
    type: "SysGroupUnmuted",
    name: "群解除禁言",
    component: messageImage,
  },
  1109: {
    type: "SysGroupMemberMuted",
    name: "群成员禁言",
    component: messageImage,
  },
  1110: {
    type: "SysGroupMemberUnmuted",
    name: "群成员解除禁言",
    component: messageImage,
  },
  1113: { type: "SysGroupTransfer", name: "变更群主", component: messageImage },
}

export const msgTypeMap = {
  text: 1,
  code: 2,
  image: 3,
  audio: 4,
  video: 5,
  file: 6,
  location: 7,
  card: 8,
  forward: 9,
  login:10,
  vote:11,
  mixed:12,
}

export const ChatMsgTypeMapping = {
  text: '[文本消息]',
  image: '[图片消息]',
  audio: '[语音消息]',
  video: '[视频消息]',
  document: '[文件消息]',
  location: '[位置消息]',
  card: '[名片消息]',
  mixed: '[转发消息]',
  login: '[登录消息]',
  vote: '[投票消息]',
  code: '[代码消息]',
  mixed: '[图文消息]',
  notice: '[群公告]',
  SysText: '[系统消息]',
  SysGroupCreate: '[创建群消息]',
  SysGroupJoin: '[加入群消息]',
  SysGroupLeave: '[退出群消息]',
  SysGroupKick: '[踢出群消息]',
  SysGroupMessageRevoke: '[撤回消息]',
  SysGroupDismissed: '[群解散消息]',
  SysGroupMuted: '[群禁言消息]',
  SysGroupUnmuted: '[群解除禁言消息]',
  SysGroupMemberMuted: '[群成员禁言消息]',
  SysGroupMemberUnmuted: '[群成员解除禁言消息]'
}

// 可转发的消息类型
export const ForwardableMessageType = [
  "text",
  "code",
  "image",
  "audio",
  "video",
  "document",
  "location",
  "card"
]

export const defaultAvatar = avatar

export const notifyIcon = notify
