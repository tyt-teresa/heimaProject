import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import ElementUI from 'element-ui'
import Components from './components'
import 'element-ui/lib/theme-chalk/index.css'
import './css/index.less'
import axios from './tools/axios.congig'
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(Components)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')//
