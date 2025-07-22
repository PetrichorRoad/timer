export const getToken = (params) => {
  let token = localStorage.getItem('token');
  return token;
}
export const getIMToken = (params) => {
  let jwt = localStorage.getItem('IM_AUTH_TOKEN');
  let {value} = JSON.parse(jwt);
  return value;
}
export const getUserInfo = (params) => {
  let userInfo = localStorage.getItem('userInfo');
  return JSON.parse(userInfo);
}