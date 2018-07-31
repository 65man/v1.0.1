import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import LoginFirst from '@/views/LoginFirst'
import Layout from '@/views/layout'
import Home from '@/views/home'
import UserList from '@/views/userList'
import UserCount from '@/views/userCount'
import ShareQrcode from '@/views/shareQrcode'
import AgentCount from '@/views/agentCount'
import AgentHigher from '@/views/agentHigher'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home
        },
        {
          path: 'loginFirst',
          name: 'loginFirst',
          component: LoginFirst
        },
        {
          path: 'userList',
          name: 'userList',
          component: UserList
        },
        {
          path: 'userCount',
          name: 'userCount',
          component: UserCount
        },
        {
          path: 'shareQrcode',
          name: 'shareQrcode',
          component: ShareQrcode
        },
        {
          path: 'agentCount',
          name: 'agentCount',
          component: AgentCount
        },
        {
          path: 'agentHigher',
          name: 'agentHigher',
          component: AgentHigher
        }
      ]
    }
  ]
})
