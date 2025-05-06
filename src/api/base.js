import request from "@/utils/request/index";

export const login = (data) => {
  return request({
    url: '/timer/user/login',
    method: 'post',
    data
  })
}
export const getTaskList = (data) => {
  return request({
    url: '/timer/task/list',
    method: 'post',
    data
  })
}
// /timer/task/create
export const createTask = (data) => {
  return request({
    url: '/timer/task/create',
    method: 'post',
    data
  })
}
// /timer/task/update
export const updateTask = (data) => {
  return request({
    url: '/timer/task/update',
    method: 'post',
    data
  })
}
// /timer/organization/tree
export const getOrganizationTree = (params) => {
  return request({
    url: '/timer/organization/tree',
    method: 'get',
    params
  })
}
// /timer/position/list
export const getPositionList = (params) => {
  return request({
    url: '/timer/position/list',
    method: 'get',
    params
  })
}

export default {
  login,getTaskList,createTask,updateTask,getOrganizationTree,getPositionList
}