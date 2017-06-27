<template>
  <div id="app">
    <router-view v-if="$auth.checkAuth()"></router-view>
    <login v-else></login>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'

export default {
  name: 'app',
  beforeCreate() {
    this.$auth.fetch()
      .then(() => {
        this.$router.push('/todo')
      })
  },
  components: {
    Login
  }
}
</script>
