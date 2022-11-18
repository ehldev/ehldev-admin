import Vue from 'vue'
import Vuex from 'vuex'

import appModule from 'ehldev-admin-library/dist/store/app.js'
import authModule from './auth.js'

console.log(authModule)

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appModule,
    authModule
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
