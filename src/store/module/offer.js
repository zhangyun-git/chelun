import {getOffer, getcityId, getCity, getCityRight} from '@/api'
// 初始化数据
const state = {
    offerList: [],
    city: [],
    rightList: []
}

// 同步改变数据
const mutations = {
    updatedOffer(state, payload) {
        state.offerList = payload.data
    },
    updateCity(state, payload) {
        state.city = payload.data
    },
    updateCityRight(state, payload) {
        state.rightList = payload.data
    }
}

// 异步改变数据
const actions = {
    offer({commit},carId){
        getcityId().then(body=>{
            getOffer(carId, body.data.CityID).then(res=>{
                commit('updatedOffer',res)
            })
        })
    },
    City({commit}){
        getCity().then(res=>{
            commit('updateCity',res)
        })
    },
    cityRight({commit}, payload) {
        getCityRight(payload).then(res=>{
            commit('updateCityRight', res)
        })
    }
}

// 抛出
export default {
    // 命名空间
    namespaced: true,
    state,
    mutations,
    actions
}