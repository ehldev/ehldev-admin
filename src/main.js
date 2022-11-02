import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './plugins/axios'

// import { AdminButton, AdminLayout, AdminHeader, AdminSidebar, AdminNav, AdminSearch } from 'ehldev-components-admin'

// Vue.component('AdminButton', AdminButton)
// Vue.component('AdminLayout', AdminLayout)
// Vue.component('AdminHeader', AdminHeader)
// Vue.component('AdminSidebar', AdminSidebar)
// Vue.component('AdminSidebar', AdminSidebar)
// Vue.component('AdminNav', AdminNav)
// Vue.component('AdminSearch', AdminSearch)

import './assets/scss/app.scss'
import 'remixicon/fonts/remixicon.css'
import './assets/scss/app.scss'

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
