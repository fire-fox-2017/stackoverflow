// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('semantic-ui-css/semantic.css')
require('semantic-ui-css/semantic.js')
import Vue from 'vue'
import App from './App'
import store from './store'
// import Navbar from './components/Navbar'
import Home from './components/Home'
import router from './router'

// Vue.component('Navbar', Navbar)
Vue.component('Home', Home)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
