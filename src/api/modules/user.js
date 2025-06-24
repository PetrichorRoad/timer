import http from '@/api/modules/index'

export const login = (data) => {
    return http({
        url: '/api/v1/auth/login',
        method: 'post',
        data
    })
}
export const getUserInfo = (data) => {
    return http({
        url: '/api/v1/user/setting',
        method: 'post',
        data
    })
}
export const getChatList = (data) => {
    return http({
        url: '/api/v1/talk/list',
        method: 'post',
        data
    })
}
export const getTalkRecords = (data) => {
    return http({
        url: '/api/v1/talk/records',
        method: 'post',
        data
    })
}
export const getGroupInfo = (data) => {
    return http({
        url: '/api/v1/group/member/list',
        method: 'post',
        data
    })
}
export const getFriendsInfo = (data) => {
    return http({
        url: '/api/v1/contact/detail',
        method: 'post',
        data
    })
}
export const getFriendsStatus = (data) => {
    return http({
        url: '/api/v1/contact/online-status',
        method: 'post',
        data
    })
}
export const getVoteDetailById = (data) => {
    return http({
        url: '/api/v1/group/vote/detail',
        method: 'post',
        data
    })
}

export default { login, getUserInfo, getChatList, getTalkRecords, getGroupInfo, getFriendsInfo, getFriendsStatus, getVoteDetailById }