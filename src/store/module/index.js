import {getBrandList, getMakeList} from '@/api';
// 初始化state
const state = {
  BrandList: [],
  MakeList: []
}

// 同步处理数据
const mutations = {
  updateBrandList(state, payload) {
    var obj = {};
    payload.data.forEach(function(item) {
        var key = item.Spelling.substr(0, 1).toUpperCase();
        if (!obj[key]) {
            obj[key] = {
                title: key,
                list: []
            }
        }
        obj[key].list.push(item);
    })
    var arr = [];
    for (var k in obj) {
        arr.push(obj[k]);
    }
    arr.sort(function(x, y) {
        return x.title.charCodeAt(0) - y.title.charCodeAt(0);
    })
    state.BrandList = arr
    state.isLoading = true
  },
  updateMakeList(state, payload) {
    state.MakeList = payload.data
  }
}

// 异步处理数据
const actions = {
  BrandList({commit}){
    getBrandList().then(res=>{
      commit('updateBrandList', res)
    })
  },
  MakeList({commit},id){
    getMakeList(id).then(res=>{
      commit('updateMakeList', res)
    })
  }
}

export default {
  // 命名空间
  namespaced: true,
  state,
  mutations,
  actions
}