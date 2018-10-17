import {getDetail} from '@/api';
import {mergeCar, sortCar, filter} from '@/utils/index'
// 初始化数据
const state = {
    Detail: [],
    banner: [],
    isLoading: false
}

// 同步改变数据
const mutations = {
    // 做数据处理
    // 排序规则：排量的升序->发动机功率升序->吸气方式(自然吸气>涡轮增压)->年份降序
    updateDetail(state, payload) {
        let obj = {};
        if (Object.keys(mergeCar(sortCar(filter(2016, payload.list)))).length) {
            obj['2016'] = mergeCar(sortCar(filter(2016, payload.list)))
        }
        if (Object.keys(mergeCar(sortCar(filter(2017, payload.list)))).length) {
            obj['2017'] = mergeCar(sortCar(filter(2017, payload.list)))
        }
        if (Object.keys(mergeCar(sortCar(filter(2018, payload.list)))).length) {
            obj['2018'] = mergeCar(sortCar(filter(2018, payload.list)))
        }
        if (Object.keys(mergeCar(sortCar(filter(2019, payload.list)))).length) {
            obj['2019'] = mergeCar(sortCar(filter(2019, payload.list)))
        }
        if (Object.keys(mergeCar(sortCar(filter(2014, payload.list)))).length) {
            obj['2014'] = mergeCar(sortCar(filter(2014, payload.list)))
        }
        obj['全部'] = mergeCar(sortCar(payload.list))
        state.banner = payload
        state.Detail = obj
        state.isLoading = true
    }
}

// 异步改变数据
const actions = {
    Detail({commit},id){
        getDetail(id).then(res=>{
            commit('updateDetail', res.data)
        })
    }
}

// 抛出
export default {
    // 命名空间
    namespaced:true,
    state,
    mutations,
    actions
}