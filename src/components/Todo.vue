<template lang="html">
  <div class="container">
    <nav class="nav">
      <div class="nav-right">
        <div class="nav-item">
          {{username}}
        </div>
        <a class="nav-item" @click="logout()">
          <span class="icon">
            <i class="fa fa-sign-out"></i>
          </span>
        </a>
      </div>
    </nav>
    <section class="section">
      <div class="content">
        <p class="control" :class="{'is-loading': loading}">
          <input type="text" v-model="todo.content" class="input" placeholder="Enter your tasks..." @keyup.enter="add(todo)">
        </p>
      </div>
    </section>
    <table class="table">
      <thead>
        <th style="width: 30px;"></th>
        <th>Tasks</th>
        <th style="width: 30px;"></th>
      </thead>
      <tbody>
        <tr v-for="todo of todos" :key="todo._id">
          <td>
            <b-checkbox v-model="todo.done" @change="update(todo)"></b-checkbox>
          </td>
          <td-input v-model="todo.content" @update="update(todo)">
            {{todo.content}}
          </td-input>
          <td>
            <button class="button is-danger is-outlined" @click="remove(todo)">
              <span class="icon is-small">
                <i class="fa fa-remove"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TdInput from './TdInput.vue'

export default {
  data() {
    return {
      todos: [],
      todo: {
        content: ''
      },
      loading: false
    }
  },
  computed: {
    username() {
      return this.$auth.checkAuth()
        ? this.$auth.user().name
        : ''
    }
  },
  beforeMount() {
    this.fetchData()
  },
  methods: {
    add(todo) {
      this.loading = true
      this.axios.post('/todo', todo)
        .then(response => {
          this.todos.push(response.data)
          todo.content = ''
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    update(todo) {
      this.axios.put(`/todo/${todo._id}`, todo)
    },
    remove(todo) {
      const id = todo._id
      this.axios.delete(`/todo/${id}`)
        .then(() => {
          let idx = this.todos.findIndex(todo => todo._id === id)
          this.todos.splice(idx, 1)
        })
    },
    fetchData() {
      this.axios.get('/todo')
        .then(({data}) => {
          this.todos = data.todos
        })
    },
    logout() {
      this.$auth.logout()
    }
  },
  components: {
    TdInput
  }
}
</script>

<style lang="css">
</style>
