export const getToken = (params) => {
  let token = localStorage.getItem('token');
  return token;
}