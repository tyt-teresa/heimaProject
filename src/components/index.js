import homeAside from './home/home-aside.vue'
import homeHeader from './home/home-header.vue'
import breadCrumb from './common/breadcrumb.vue'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import coverImg from './publish/cover-img.vue'
export default {
  install (Vue) {
    Vue.component('home-aside', homeAside)
    Vue.component('home-header', homeHeader)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-img', coverImg)
  }
}
