import homeAside from './home/home-aside.vue'
import homeHeader from './home/home-header.vue'
import breadCrumb from './common/breadcrumb.vue'
export default {
  install (Vue) {
    Vue.component('home-aside', homeAside)
    Vue.component('home-header', homeHeader)
    Vue.component('bread-crumb', breadCrumb)
  }
}
