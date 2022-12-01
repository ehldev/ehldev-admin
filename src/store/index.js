import Vue from 'vue'
import Vuex from 'vuex'

import app from 'ehldev-admin-library/dist/store/app.js'
import authModule from './auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    authModule
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
