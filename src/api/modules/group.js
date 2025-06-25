import http from "./index";

export const ServGroupList = (data) => {
  return http({ url: '/api/v1/group/list', method: 'post', data });
}

export const ServGroupOvertList = (data) => {
  return http({ url: '/api/v1/group/overt-list', method: 'post', data });
}

export const ServGroupDetail = (data) => {
  return http({ url: '/api/v1/group/detail', method: 'post', data });
}

export const ServGroupCreate = (data) => {
  return http({ url: '/api/v1/group/create', method: 'post', data });
}

export const ServeGroupUpdate = (data) => {
  return http({ url: '/api/v1/group/update', method: 'post', data });
}

export const ServGroupInvite = (data) => {
  return http({ url: '/api/v1/group/invite', method: 'post', data });
}

export const ServGroupMemberRemove = (data) => {
  return http({ url: '/api/v1/group/member/remove', method: 'post', data });
}

export const ServGroupDismiss = (data) => {
  return http({ url: '/api/v1/group/dismiss', method: 'post', data });
}

export const ServGroupMute = (data) => {
  return http({ url: '/api/v1/group/mute', method: 'post', data });
}

export const ServGroupOvert = (data) => {
  return http({ url: '/api/v1/group/overt', method: 'post', data });
}

export const ServGroupSecede = (data) => {
  return http({ url: '/api/v1/group/secede', method: 'post', data });
}

export const ServGroupMemberUpdateRemark = (data) => {
  return http({ url: '/api/v1/group/member/update-remark', method: 'post', data });
}

export const ServGroupInviteList = (data) => {
  return http({ url: '/api/v1/group/invite-list', method: 'post', data });
}

export const ServGroupMemberList = (data) => {
  return http({ url: '/api/v1/group/member/list', method: 'post', data });
}

export const ServGroupNoticeList = (data) => {
  return http({ url: '/api/v1/group/notice/list', method: 'post', data });
}

export const ServGroupNoticeUpdate = (data) => {
  return http({ url: '/api/v1/group/notice/edit', method: 'post', data });
}

export const ServGroupApplyList = (data) => {
  return http({ url: '/api/v1/group/apply/list', method: 'post', data });
}

export const ServGroupApplyAll = (data) => {
  return http({ url: '/api/v1/group/apply/all', method: 'post', data });
}

export const ServGroupApplyDecline = (data) => {
  return http({ url: '/api/v1/group/apply/decline', method: 'post', data });
}

export const ServGroupApplyAgree = (data) => {
  return http({ url: '/api/v1/group/apply/agree', method: 'post', data });
}

export const ServGroupApplyCreate = (data) => {
  return http({ url: '/api/v1/group/apply/create', method: 'post', data });
}

export const ServGroupApplyUnread = (data) => {
  return http({ url: '/api/v1/group/apply/unread', method: 'post', data });
}

export const ServGroupTransfer = (data) => {
  return http({ url: '/api/v1/group/transfer', method: 'post', data });
}

export const ServGroupAssignAdmin = (data) => {
  return http({ url: '/api/v1/group/assign-admin', method: 'post', data });
}

export const ServGroupMemberMute = (data) => {
  return http({ url: '/api/v1/group/member-mute', method: 'post', data });
}

export const ServGroupVoteCreate = (data) => {
  return http({ url: '/api/v1/group/vote/create', method: 'post', data });
}

export const ServGroupVoteSubmit = (data) => {
  return http({ url: '/api/v1/group/vote/submit', method: 'post', data });
}

export const ServGroupVoteDetail = (data) => {
  return http({ url: '/api/v1/group/vote/detail', method: 'post', data });
}