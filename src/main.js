import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Plugins
import 'ehldev-admin-library/dist/plugins/vue-toast-notification'
import 'ehldev-admin-library/dist/plugins/vuelidate'
import 'ehldev-admin-library/dist/plugins/vue2-smooth-scroll'
import 'ehldev-admin-library/dist/plugins/vue-toast-notification'
import 'ehldev-admin-library/dist/plugins/vue-sweetalert'
import "./plugins/chart"

import './assets/scss/app.scss'
import 'remixicon/fonts/remixicon.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
