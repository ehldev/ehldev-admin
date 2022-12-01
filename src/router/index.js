import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ProjectsRoutes from "../modules/Projects/Routes";
import AuthRoutes from "../modules/Auth/Routes";

import store from "../store";

Vue.use(VueRouter);

let routes = [{
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      auth: true
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

routes.push(...ProjectsRoutes, ...AuthRoutes);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  let token = store.getters["authModule/getAuthToken"];

  try {
    if (to.meta.auth) {
      if (token) {
        let user = await store.dispatch('authModule/verifyToken');

        console.log(user)

        if (user) {
          store.commit("authModule/SET_USER", user);
          next();
        }
      } else {
        next({
          name: "login"
        })
      }
    } else {
      if (to.name == 'login' && token) {
        next({
          name: 'Home'
        })
      } else {
        console.log('2')
        next()
      }
    }
  } catch (error) {
    console.log(error)
  }

  // if(to.meta.auth) {
  //   if (token) {
  //     let user = await store.dispatch('authModule/verifyToken');

  //     if (user) {
  //       store.commit("authModule/SET_USER", user);
  //       next();
  //     }
  //   } else {
  //     next({ name: "login" })
  //   }
  // } else {
  //   if(to.name == 'login' && token) {
  //     next({name: 'Home'})
  //   } else {
  //     console.log('2')
  //     next()
  //   }
  // }
});

export default router;