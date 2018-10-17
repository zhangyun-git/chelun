import {getImgAll, getImgList, getColorType} from '@/api'
// 初始化数据
const state = {
    imgList: [],
    imgAll: [],
    Page: 1,
    isFetching: false,
    current: 0,
    showSwiper: false,
    colorType: []
}

// 同步改变数据
const mutations = {
    updateImgAll(state, payload) {
        state.imgAll = payload.data
    },
    updateImgList(state, payload) {
        state.imgList = payload.data
    },
    /**
     *  做数据处理
     * @param {*} state
     * @param {*} payload
     */
    updateImgList(state, payload){
        state.imgList = state.imgList.concat(payload.List);
        state.Page++;
        state.isFetching = false;
    },
    startFetching(state){
        state.isFetching = true;
    },
    /**
     * 控制swiper的显示隐藏
     * @param {*} state
     * @param {*} payload
     */
    changeSwiper(state, payload) {
        state.showSwiper = payload.show;
        state.current = payload.id
    },
    updateColorType(state, payload) {
        state.colorType = payload.data
    }
}

// 异步改变数据
const actions = {
    Img({commit}, payload){
        getImgAll(payload).then(res=>{
            commit('updateImgAll', res)
        })
    },
    ImgList({commit, state}, payload){
        payload.Page = state.Page;
        if (state.isFetching){
            return;
        }
        commit('startFetching');
        getImgList(payload).then(res=>{
            commit('updateImgList', res.data);
        })
    },
    getColorType({commit}, payload){
        getColorType(payload).then(res=>{
            commit('updateColorType', res)
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