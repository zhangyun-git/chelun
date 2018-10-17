import Vue from 'vue';
import Vuex from 'vuex';
import Logger from 'vuex/dist/logger';

// 引入module
import index from './module'
import detail from './module/detail'
import offer from './module/offer'
import img from './module/img'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: true
  },
  mutations: {
    changeLoading(state, payload) {
      state.isLoading = payload
    }
  },
  modules: {
    index,
    detail,
    offer,
    img
  },
  plugins: [Logger()]
})