import Vue from 'vue'
import Router from 'vue-router'
import Todo from '@/components/Todo'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/todo',
      name: 'Todo',
      meta: {auth: true},
      component: Todo
    }
  ]
})

Vue.router = router

export default router
