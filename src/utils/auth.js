export const saveUserInfo = (userInfo) => {
  localStorage.setItem('IM_AUTH_TOKEN', JSON.stringify(userInfo))
}
export const saveUserSetting = (userInfo) => {
  let { value: { user_info } } = userInfo
  console.log('用户信息存进去');
  localStorage.setItem('IM_USER_INFO', JSON.stringify(userInfo))
  localStorage.setItem('user', JSON.stringify(user_info))
}