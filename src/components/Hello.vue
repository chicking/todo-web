<template>
  <div class="hello">
    <md-toolbar>
      <h1 class="md-title">{{title}}</h1>
    </md-toolbar>

    <div class="main-content">
      <img src="../assets/logo.png">
    </div>
  </div>

</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      title: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
.main-content {
  padding-left: 16px;
}
</style>
