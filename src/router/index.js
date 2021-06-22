import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from "../store/index";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: '/char/:id',
    // $route.params.id
    name: 'Character Sheet',
    component: () => import('../views/Char.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to, from, next) => {
  if (store.state.loggedIn && to.name != "Character Sheet" && to.name != "User") {
    // Logged in and not at User and not at Character Sheet
    next("/user");
  } else if (!store.state.loggedIn && to.name != "Login") {
    // Not logged in and not at the login page
    next("/");
  } else {
    next();
  }
});