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

export default { login, getUserInfo, getChatList }