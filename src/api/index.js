import axios from '@/utils/request/index'

export const getWeather = (params) => {
  return axios.get('/weather/weatherInfo', {
    params
  })
}
export const getCity = (params) => {
  return axios.get('/weather/city', {
    params
  })
}