<template>
    <div class="detail">
        <!-- 显示loading图 -->
        <!-- <Loading></Loading> -->
        <div class="wrap">
            <!-- 图片 -->
            <div class="banner" @click="toImg(banner.SerialID)">
                <img :src="banner.CoverPhoto">
                <p>{{banner.pic_group_count}}张图片</p>
            </div>
            <div class="info">
                <div>
                    <p v-if='banner.market_attribute'>{{banner.market_attribute.dealer_price}}</p>
                    <p v-if='banner.market_attribute'>指导价 {{banner.market_attribute.official_refer_price}}</p>
                </div>
                <button @click="push(banner.list[0].car_id)">询问底价</button>
            </div>
            <div class="list">
                <nav>
                    <span v-for="(item,index) in keys" :key='index' @click="conList(index)" :class="index==id ? 'active': ''">{{item}}</span>
                </nav>
                <section>
                    <div v-for="(item,index) in list" :key='index' class="items">
                        <p>{{index}}</p>
                        <div v-for="(value,key) in item" :key='key' class="valus">
                            <p>
                                <span>{{value.market_attribute.year}}款</span>
                                <span>{{value.car_name}}</span>
                            </p>
                            <p>
                                {{value.trans_type}}
                            </p>
                            <p>
                                <span v-if='value.market_attribute'>指导价 {{value.market_attribute.dealer_price_max}}</span>
                                <span v-if='value.market_attribute'>{{value.market_attribute.dealer_price_min}}起</span>
                            </p>
                            <router-link tag='button' :to="{
                                path: '/offer',
                                query: {carId: value.car_id}
                            }" class="btn">询问底价</router-link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <footer @click="push(banner.list[0].car_id)">
            <p>询问底价</p>
            <p>本地经销商为你报价</p>
        </footer>
    </div>
</template>
<script scoped>
    import Loading from '@/components/loading.vue' // 引入loding组件
    import {mapState, mapActions} from 'vuex'
    export default {
        name: '',
        data() {
            return {
                id: 0
            }
        },
        computed: {
            ...mapState({
                detail: state=>state.detail.Detail,
                banner: state=>state.detail.banner
            }),
            keys(){
                return Object.keys(this.detail).sort((a,b)=>{
                    return a < b
                })
            },
            list() {
                return this.detail[this.keys[this.id]]
            }
        },
        methods: {
            ...mapActions({
                Detail: 'detail/Detail'
            }),
            conList(index) {
                this.id = index
            },
            push(carId){
                this.$router.push({
                    path: '/offer',
                    query: {
                        carId: carId
                    }
                })
            },
            toImg(SerialID) {
                this.$router.push({
                    path: '/img',
                    query: {
                        SerialID: SerialID
                    }
                })
            }
        },
        components: {
            Loading
        },
        mounted() {
            this.Detail(this.$route.query.id);
        }
    }
</script>
<style>
    @import url('../assets/scss/detail.css');
</style>
