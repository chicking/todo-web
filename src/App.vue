<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  beforeCreate() {
    this.$auth.fetch()
      .then(() => {
        this.$router.push('/todo')
      })
      .catch(() => {
        this.$router.push('/login')
      })
  }
}
</script>

<style>
html, body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
