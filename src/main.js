// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './bootstrap'

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
Vue.use(Buefy)

import Auth from './plugins/vue-auth-jwt'
Vue.use(Auth)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
