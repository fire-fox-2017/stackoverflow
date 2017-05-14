import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Question from '@/components/Question'
import Ask from '@/components/Ask'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/question/:questionId',
      name: 'Question',
      component: Question
    },
    {
      path: '/ask',
      name: 'Ask',
      component: Ask
    }
  ]
})
