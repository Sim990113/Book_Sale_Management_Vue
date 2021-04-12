import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import Logs from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/total.css'
import global_ from './components/Global'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.prototype.GLOBAL = global_
Vue.use(VueCookies)

new Vue({
  router,
  store,
  Logs,
  render: h => h(App)
  // filters: {
  //   ellipsis(value) {
  //     if (!value) return "";
  //     if (value.length > 300) {
  //       return value.slice(0, 300) + "...";
  //     }
  //     return value;
  //   }
  // }
}).$mount('#app')
