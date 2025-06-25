import http from "./index";

export const ServTalkList = (data) => {
  return http({ url: '/api/v1/talk/list', method: 'post', data });
}

// 聊天列表创建服务接口
export const ServTalkCreate = (data) => {
  return http({ url: '/api/v1/talk/create', method: 'post', data });
}

// 删除聊天列表服务接口
export const ServTalkDelete = (data) => {
  return http({ url: '/api/v1/talk/delete', method: 'post', data });
}

// 对话列表置顶服务接口
export const ServTalkTopping = (data) => {
  return http({ url: '/api/v1/talk/topping', method: 'post', data });
}

// 清除聊天消息未读数服务接口
export const ServTalkClearUnread = (data) => {
  return http({ url: '/api/v1/talk/clear-unread', method: 'post', data });
}

// 获取聊天记录服务接口
export const ServTalkRecords = (data) => {
  return http({ url: '/api/v1/talk/records', method: 'post', data });
}

// 查找用户聊天记录服务接口
export const ServTalkHistoryRecords = (data) => {
  return http({ url: '/api/v1/talk/history-records', method: 'post', data });
}

// 获取转发会话记录详情列表服务接口
export const ServTalkForwardRecords = (data) => {
  return http({ url: '/api/v1/talk/forward-records', method: 'post', data });
}

// 对话列表置顶服务接口
export const ServTalkDisturb = (data) => {
  return http({ url: '/api/v1/talk/disturb', method: 'post', data });
}

// 发送代码块消息服务接口
export const ServTalkMessageSend = (data) => {
  return http({ url: '/api/v1/talk/message/send', method: 'post', data });
}

// 撤回消息服务接口
export const ServTalkMessageRevoke = (data) => {
  return http({ url: '/api/v1/talk/message/revoke', method: 'post', data });
}

// 删除消息服务接口
export const ServTalkMessageDelete = (data) => {
  return http({ url: '/api/v1/talk/message/delete', method: 'post', data });
}

