import Vue from 'vue'
import Router from 'vue-router'
import mainView from '@/components/main/main'
import login from '@/components/login/login'
import register from '../components/register/register'
import master from '@/components/master/master'
import pintu from '../components/pintu/pintu'
import clearStar from '../components/clearStar/clearStar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainView',
      component: mainView
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/reg',
      name: 'Register',
      component: register
    },
    {
      path: '/home',
      name: 'master',
      component: master
    },
    {
      path: '/pintu',
      name: 'pintu',
      component: pintu
    },
    {
      path: '/clear',
      name: 'clearStar',
      component: clearStar
    },
  ]
})
