
const name = 'jwt_token'

export default {
  get() {
    return localStorage.getItem(name)
  },
  set(token) {
    localStorage.setItem(name, token)
  },
  remove() {
    localStorage.removeItem(name)
  }
}
