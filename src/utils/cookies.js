import Cookies from 'js-cookie'

// export function getCookie(name) {
//   reutrn Cookies.get(name)

// }

export const getCookie = (name) => Cookies.get(name)

export const setCookie = (name, value, time) => Cookies.set(name, value, {expires: time})

export const clearCookie = (name) => Cookies.remove(name)
