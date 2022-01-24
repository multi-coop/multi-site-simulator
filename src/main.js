import Vue from 'vue'
import 'document-register-element/build/document-register-element'

// import wrap from '@vue/web-component-wrapper'
import vueCustomElement from 'vue-custom-element'

// import App from './App.vue'
// import router from './router'
import store from './store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
// require('@/assets/main.scss')

import MultiSimulator from './components/MultiSimulator.vue'

Vue.config.productionTip = false

Vue.use(Buefy)

MultiSimulator.store = store
// MultiSimulator.router = router

// new Vue({
//   router,
//   store,
//   render: function (h) { return h(App) }
// }).$mount('#app')

// const WrappedElement = wrap(Vue, MultiSimulator)
// window.customElements.define('my-web-component', WrappedElement)

Vue.use(vueCustomElement)
Vue.customElement('my-web-component', MultiSimulator)
