import { createRouter, createWebHistory } from 'vue-router'
import calculatorRotation from "@/components/calculatorRotation.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: calculatorRotation
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
