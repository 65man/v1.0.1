import { getCookie, setCookie } from './cookies'
import { alertTips } from './messageTips.js'
import store from '@/store'
import router from '@/router'

// 获取token
export const getToken = () => {
  // 获取token过期时间
  var expire = getCookie('ZW-G-isExpire')
  // 获取token
  var access_token = getCookie('ZW-G-isTk')
  // 获取Retoken
  var refresh_token = getCookie('ZW-G-isReTk')
  if (!access_token || !expire || !refresh_token) {
    return false
  } else {
    return true
  }
}

// 检查token是否过期
export const checkToken = () => {
  // 获取过期时间
  var expire = getCookie('ZW-G-isExpire')
  // 获取token
  var access_token = getCookie('ZW-G-isTk')
  // 获取当前时间
  var timeNow = parseInt(new Date().getTime() / 1000)
  // 过期时间
  var timeExpire = expire - timeNow
  // 判断是否需要重新获取token
  if (timeExpire <= 200 && timeExpire >= -7000) {
    var refresh_token = getCookie('ZW-G-isReTk')
    // 重新续航时间,请求刷新token的api
    post(refreshApi, {
      access_token,
      refresh_token
    }).then(res => {
      // 刷新成功保持数据
      store.state.token = res['access_token']
      setCookie('ZW-G-isTk', res['access_token'], 7)
      setCookie('ZW-G-isReTk', res['refresh_token'], 7)
      setCookie('ZW-G-isExpire', res['expire'], 7)
      setCookie('ZW-G-isWechat', getCookie('ZW-G-isWechat'), 7)
      setCookie('ZW-G-isRoles', getCookie('ZW-G-isRoles'), 7)
      setCookie('ZW-G-isMaxlv', getCookie('ZW-G-isMaxlv'), 7)
      setCookie('ZW-G-isLv', getCookie('ZW-G-isLv'), 7)
      setCookie('ZW-G-isID', getCookie('ZW-G-isID'), 7)
      setCookie('ZW-G-isCode', getCookie('ZW-G-isCode'), 7)
      setCookie('ZW-G-isAG', getCookie('ZW-G-isAG'), 7)
    }).catch(err => {
      console.log(err)
      alertTips('该用户已在其它地方登录', function reLogin () {
        router.push({
          name: 'login'
        })
      })
    })
  } else if (timeExpire < -7000) {
    alertTips('登录验证已过期，请重新登录', function reLogin () {
      router.push({
        name: 'login'
      })
    })
  } else {
    store.state.token = access_token
    return true
  }
}
