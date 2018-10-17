import Vue from 'vue';
import Router from 'vue-router';

import store from '../store'

Vue.use(Router)

// 动态加载路由(一级路由)
const Index = () => import('@/views/Index');
const CarType = () => import('@/views/CarType');
const Img = () => import('@/views/Img');
const ColorType = () => import('@/views/ColorType');
const Offer = () => import('@/views/Offer');
const Detail = () => import('@/views/Detail');

let router =  new Router({
  routes: [
    {
        path: '/index',
        name: 'index',
        component: Index
    },
    {
        path: '/cartype',
        name: 'cartype',
        component: CarType
    },
    {
        path: '/img',
        name: 'img',
        component: Img
    },
    {
        path: '/colortype',
        name: 'colortype',
        component: ColorType
    },
    {
        path: '/offer',
        name: 'offer',
        component: Offer
    },
    {
        path: '/detail',
        name: 'detail',
        component: Detail
    },
    {
        path: '*',
        redirect: '/index',
    }
  ]
})

// 全局导航首位
router.beforeEach((to, from, next) => {
    store.commit('changechangeLoading', true)
    next()
})

router.afterEach(() => {
    setTimeout(()=>{
        store.commit('changechangeLoading', false)
    }, 3000)
})

export default router;