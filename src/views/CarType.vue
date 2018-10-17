<template>
    <div class="carList">
        <span @click="back">全部车款</span>
        <div class="c-type">
            <span v-for="(item,index) in keys" :key='index' @click="conList(index)" :class="index==id ? 'active': ''">{{item}}</span>
        </div>
        <section>
            <div v-for="(item,index) in list" :key='index' class="item">
                <p>{{index}}</p>
                <div v-for="(value,key) in item" :key='key' class="valu" @click="ToImg(value.car_id,value.market_attribute.year+'款 '+value.car_name)">
                    <div>
                        <p class="titles">
                            <span>{{value.market_attribute.year}}款</span>
                            <span>{{value.car_name}}</span>
                        </p>
                        <p>
                            <span v-if='value.market_attribute'>{{value.market_attribute.dealer_price_min}}起</span>
                        </p>
                    </div>
                    <p>
                        <span>{{value.trans_type}}</span>
                        <span v-if='value.market_attribute'>指导价 {{value.market_attribute.dealer_price_max}}</span>
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
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
            detail: state=>state.detail.Detail
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
        back() {
            this.$router.go(-1)
            let obj = {
                val: '全部车款',
                id: this.$route.query.id
            }
            window.localStorage.setItem('carType',JSON.stringify(obj))
        },
        ToImg(carId, val) {
            let obj = {
                carId,
                val,
                id: this.$route.query.id
            }
            window.localStorage.setItem('carType',JSON.stringify(obj))
            this.$router.go(-1)
        }
    },
    mounted() {
        this.Detail(this.$route.query.id);
    }
}
</script>
<style>
    @import url('../assets/scss/cartype.css');
</style>
