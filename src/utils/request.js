import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import ErrorMessage from '@/api/ErrorMessage.js'
import { checkToken } from '@/utils/token.js'
import { alertTips } from '@/utils/messageTips.js'

// 请求的基准路径
const URL = 'http://192.168.2.159:9997/v3'

// 创建axios实例
const instance = axios.create({
  baseUrl: URL,
  timeout: 5000
})

// 白名单
const whiteList = ['account/refresh', 'verify/captcha', 'account/signup', 'account/password', 'account/login', 'account/validate', 'password/forget', 'password/reset']

        // 拦截结束
function cb (config) {
  if (config.method === 'post' || config.method === 'put') {
    config.data = Vue.prototype.qs.stringify({
      ...config.data
    })
  }
  return config
}

// 请求拦截
instance.interceptors.request.use(config => {
  // 1.0.1 判断是不是要检查token
  if (whiteList.indexOf(config.url) === -1) {
    // 1.0.2 如果需要，检查token
    if (checkToken()) {
      // 1.0.3 token正常,携带token
      if (config.method === 'post' || config.method === 'put') {
        // config.url = config.url + '?ccess-token=' + store.state.token
        config.headers['Authorization'] = 'Bearer ' + store.state.token
      } else {
        config.params['token'] = store.state.token
      }
      return cb(config)
    }
  } else {
    // 2.0.1 不用检查token
    return cb(config)
  }
}, err => {
  console.log(err)
})

// 响应拦截
instance.interceptors.response.use((res) => {
  res.XW_data = res.data.data
  res.XW_code = res.data.errCode
  res.XW_msg = res.data.errMsg
  res.XW_status = res.data.status
  res.XW_request = res.data.request
  console.log(res)
  return res
},
(err) => {
  if (err.response && err.response.status === '401') {
    alertTips('登录验证已过期，请重新登录', function reLogin () {
      router.push({
        name: 'blank'
      })
    })
  } else if (err.response && err.response.status === '500') {
    Vue.$vux.loading.hide()
    alertTips('服务器繁忙，请稍后重试')
  } else {
    return err.response ? err.response : ErrorMessage.timeOut
  }
}
)
export default instance
