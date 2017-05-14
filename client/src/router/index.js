import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/Hello'
import Home from '@/components/Home'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import QuestionDetail from '@/components/QuestionDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/home',
      alias: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/question-detail/:id',
      name: 'QuestionDetail',
      component: QuestionDetail,
      props: true
    }

  ] // end of routes
})
