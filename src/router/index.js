import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ProjectsRoutes from "../modules/Projects/Routes";
import AuthRoutes from "../modules/Auth/Routes";

import store from "../store";

Vue.use(VueRouter);

let routes = [
  {
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
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
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

  if(to.meta.auth) {
    if (token) {
      let user = await store.dispatch('authModule/verifyToken');

      if (user) {
        store.commit("authModule/SET_USER", user);
        next();
      }
    } else {
      next({ name: "login" })
    }
  } else {
    if(to.name == 'login' && token) {
      next({name: 'Home'})
    } else {
      console.log('2')
      next()
    }
  }

  // if (to.name !== "login" && to.meta.auth && !token) next({ name: "login" });

  // if(to.name == 'login' && token) {
  //   next({name: 'Home'})
  // } else if(to.name == 'login' && !token) {
  //   next()
  // }

  // if (to.meta.auth) {
  //   if (token) {
  //     let response = await AuthService.getUserData();
  //     let user = response.data.user;

  //     if (response.statusText === "OK" && user) {
  //       store.commit("authModule/SET_USER", user);
  //       next();
  //     }
  //   }
  // } else {
  //   next();
  // }
});

export default router;
