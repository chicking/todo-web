<template lang="html">
  <v-card>
    <v-card-text>
      <v-container fluid>
        <v-row row>
          <v-col xs12>
            <v-text-field
              name="input-1-3"
              label="Input your task"
              single-line
              v-model="todo.content"
              @keyup.enter.native="add(todo)"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-list two-line>
      <v-list-item v-for="todo of todos" :key="todo._id">
        <v-list-tile v-if="isEditMode(todo)">
          <v-list-tile-content>
            <v-list-tile-title>
              <v-text-field
                ref="input"
                name="input-1-3"
                label="Todo"
                single-line
                v-model="todo.content"
                @keyup.enter.native="update(todo)"
                @focusout.native="editTodo = null"
              ></v-text-field>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-else>
          <v-list-tile-action>
            <v-checkbox v-model="todo.done" @change="update(todo)"/>
          </v-list-tile-action>
          <v-list-tile-content @dblclick="editMode(todo)">
            <v-list-tile-title v-text="todo.content">Content</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn class="red--text" icon @click.native="remove(todo)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-item>
    </v-list>
  </v-card>
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
    }
  }
}
</script>

<style lang="css">
</style>
