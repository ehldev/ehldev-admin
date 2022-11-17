import Vue from 'vue'
import Vuex from 'vuex'

import appModule from 'ehldev-admin-library/dist/store/app.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appModule
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
