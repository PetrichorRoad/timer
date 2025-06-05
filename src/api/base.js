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
export const getUserList = (params) => {
  return request({
    url: '/timer/user/list',
    method: 'get',
    params
  })
}
// /timer/project/list
export const getProjectList = (params) => {
  return request({
    url: '/timer/project/list',
    method: 'get',
    params
  })
}
export const getProjects = (params) => {
  return request({
    url: '/timer/project/list',
    method: 'post',
    params
  })
}
export const updateProject = (data) => {
  return request({
    url: '/timer/project/updateProject',
    method: 'post',
    data
  })
}
export const createProject = (data) => {
  return request({
    url: '/timer/project/createProject',
    method: 'post',
    data
  })
}
export default {
  login, getTaskList, createTask, updateTask, getOrganizationTree, getPositionList, getUserList, getProjectList, updateProject, createProject
}