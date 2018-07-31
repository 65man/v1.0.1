// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import filters from './filter'

import Icon from 'vue-svg-icon/Icon.vue'

// 引入qs数据转换
import qs from 'qs'
// 引入点击复制
import VueClipboard from 'vue-clipboard2'

// ===============注册vux相关组件===============
// TransferDomDirective as TransferDom
import { Group, Selector, XButton, XTable, XInput, Scroller, XDialog, Datetime, ButtonTab, XTextarea, ButtonTabItem, Cell, Tab, TabItem, Step, StepItem, Countup, Grid, GridItem, Flexbox, FlexboxItem, Badge, XHeader, Checker, CheckerItem, CheckIcon, Drawer } from 'vux'
Vue.prototype.qs = qs
Vue.use(VueClipboard)
Vue.component('icon', Icon)
Vue.component('group', Group)
Vue.component('selector', Selector)
Vue.component('x-button', XButton)
Vue.component('x-table', XTable)
Vue.component('x-input', XInput)
Vue.component('scroller', Scroller)
Vue.component('x-dialog', XDialog)
Vue.component('datetime', Datetime)
Vue.component('button-tab', ButtonTab)
Vue.component('button-tab-item', ButtonTabItem)
Vue.component('x-textarea', XTextarea)
Vue.component('cell', Cell)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('step', Step)
Vue.component('step-item', StepItem)
Vue.component('countup', Countup)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('x-header', XHeader)
Vue.component('badge', Badge)
Vue.component('checker', Checker)
Vue.component('checker-item', CheckerItem)
Vue.component('check-icon', CheckIcon)
Vue.component('drawer', Drawer)
Vue.use(VueRouter)

// const routes = [{
//   path: '/',
//   component: Home
// }]

// const router = new VueRouter({
//   routes
// })

FastClick.attach(document.body)

Vue.config.productionTip = false

// 定义路由白名单
// const whiteList = ['/login']

// 路由守卫
// router.beforeEach((to, from, next) => {
//   // 判断是不是登录
//   if (to.path !== '/login') {
//     next({ path: '/login' })
//   }
// })

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
