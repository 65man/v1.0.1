import axios from '@/utils/request2.js'
// import axios from 'axios'

// 这里给axios设置一个全局的基准路径，这样以后它发的所有请求，都会带上这个基准路径
// axios.defaults.baseURL = URL
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

// ============================登录模块==========================

export const loginByUserName = (type, username, password) => {
  return axios.post('account/login', {type, username, password}).then(res => res.date)
}
