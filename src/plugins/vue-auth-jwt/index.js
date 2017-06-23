import Auth from './Auth'

export default {
  install(Vue) {
    const auth = new Auth(Vue)

    // axios
    Vue.axios.interceptors.request.use(config => {
      var token = auth.getToken()
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    })

    Vue.axios.interceptors.response.use(response => {
      console.log(response)
      if (response.data.token) {
        auth.setToken(response.data.token)
      }
      return response
    })

    // Router
    Vue.router.beforeEach((to, from, next) => {
      if (auth.checkAuth()) {
        next(to.matched.every(route => {
          if (route.meta.auth) {
            return auth.check(route.meta.auth)
          } else {
            return true
          }
        }))
      } else {
        next()
      }
    })

    Object.defineProperties(Vue.prototype, {
      $auth: {
        get() {
          return auth
        }
      }
    })
  }
}
