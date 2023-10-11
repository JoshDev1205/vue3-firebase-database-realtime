import { createWebHistory, createRouter } from 'vue-router'

import TutorialList from './components/TutorialList.vue'
import AddTutorial from './components/AddTutorial.vue'

const routes = [
  {
    path: '/',
    alias: '/tutorials',
    name: 'tutorials',
    component: TutorialList,
  },
  {
    path: '/add',
    name: 'add',
    component: AddTutorial,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
