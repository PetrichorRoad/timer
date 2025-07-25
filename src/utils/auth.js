export const saveUserInfo = (userInfo) => {
  localStorage.setItem('IM_AUTH_TOKEN', JSON.stringify(userInfo))
}
export const saveUserSetting = (userInfo) => {
  let { value: { user_info } } = userInfo
  localStorage.setItem('IM_USER_INFO', JSON.stringify(userInfo))
  localStorage.setItem('user', JSON.stringify(user_info))
}
export const getUserInfo = (params) => {
  let userInfo = localStorage.getItem('IM_USER_INFO');
  return JSON.parse(userInfo);
}