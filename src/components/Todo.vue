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
        <p class="control">
          <input type="text" v-model="todo.content" class="input" placeholder="Enter your tasks..." @keyup.enter="add(todo)">
        </p>
      </div>
    </section>
    <div class="b-table">
      <div class="b-table-content">
        <div class="table-wrapper">
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
                <td>
                  {{todo.content}}
                </td>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      editTodo: null,
      dialog: false,
      todo: {
        content: ''
      }
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
    isEditMode(todo) {
      return this.editTodo === todo
    },
    editMode(todo) {
      this.editTodo = todo
      this.$nextTick(() => {
        this.$refs.input[0].focus()
      })
    },
    add(todo) {
      this.axios.post('/todo', todo)
        .then(response => {
          this.todos.push(response.data)
          todo.content = ''
        })
    },
    update(todo) {
      this.axios.put(`/todo/${todo._id}`, todo)
      this.editTodo = null
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
  }
}
</script>

<style lang="css">
</style>
