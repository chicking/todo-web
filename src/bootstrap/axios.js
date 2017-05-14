import Vue from 'vue'
import axios from 'axios'

Vue.axios = axios
Vue.axios.defaults.baseURL = '/api'

Object.defineProperties(Vue.prototype, {
  axios: {
    get() {
      return axios
    }
  }
})
