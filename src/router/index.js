import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProjectsRoutes from '../modules/Projects/Routes'
import AuthRoutes from '../modules/Auth/Routes'

import store from '../store'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

routes.push(...ProjectsRoutes, ...AuthRoutes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(() => {
    let storeData = store
    console.log('Token')
    console.log(storeData.getters['authModule/getAuthToken'])
})

export default router
