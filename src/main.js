import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'

import router from './router'
import store from './store'


Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('@/assets/load.gif'),
  attempt: 1
})
// 去掉生成环境的提示
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
