
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.interceptors.request.use(function (config) {
  let userinfo = window.localStorage.getItem('user-info')
  let token = userinfo ? JSON.parse(userinfo).token : null
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})

export default axios
