import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login/Login'
import Home from '@/page/home/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        component: Login
    },
    {
      path: '/index',
      component: Home
    },
  ]
})
