import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import NotFoundComponent from '../views/404.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: NotFoundComponent
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: { forVisitors: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { forVisitors: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { forVisitors: true }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requireAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
