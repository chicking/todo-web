import token from './lib/token'

export default class Auth {
  constructor(Vue) {
    this.authenticated = false
    this.Vue = Vue
    this.axios = Vue.axios

    this.data = new Vue({
      data() {
        return {
          user: null,
          authenticated: null
        }
      }
    })
  }

  check(roles) {
    if (this.checkAuth()) {
      if (roles) {
        if (Array.isArray(roles)) {
          return roles.some(role => this.data.user.roles.includes(role))
        } else if (typeof roles === 'string') {
          return this.data.user.roles.includes(roles)
        }
      }
      return true
    }
    return false
  }

  login(credentials) {
    return this.axios.post('/auth/login', credentials)
      .then(response => {
        const user = response.data.data

        this.data.authenticated = true
        this.data.user = user
        return user
      })
  }

  regist(credentials) {
    return this.axios.post('/auth/regist', credentials)
  }

  checkRoles(roles, next) {
    if (roles) {
      if (this.check(roles)) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }

  checkAuth() {
    return this.data.authenticated && token.get() !== null
  }

  fetch() {
    this.data.authenticated = false
    if (token.get()) {
      return this.axios.get('/me')
        .then(response => {
          const user = response.data.data

          this.data.authenticated = true
          this.data.user = user
          return user
        })
    } else {
      return Promise.reject()
    }
  }

  logout() {
    token.remove()
    this.data.user = null
    this.data.authenticated = false
    return Promise.resolve()
  }

  authenticated() {
    return this.data.authenticated
  }

  user() {
    return this.data.user
  }

  getToken() {
    return token.get()
  }

  setToken(authToken) {
    /* eslint-disable no-useless-escape */
    let bearer = authToken.split(/Bearer\:?\s?/i)
    bearer = bearer[bearer.length > 1 ? 1 : 0].trim()
    token.set(bearer)
  }
}
