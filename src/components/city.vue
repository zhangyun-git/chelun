<template>
    <div class="city" v-show='isrightList'>
        <div class="location">
            <p>自动定位</p>
            <p @click="isHide">北京</p>
        </div>
        <div class="city_list">
            <p>省市</p>
            <ul>
                <li v-for='(item,index) in city' :key='index' @click="city_right(item.CityID)">{{item.CityName}}</li>
            </ul>
        </div>
        <div class="city_mar" v-show='isShow'>
            <div class="city_right" @click="nodeName($event)">
                <ol>
                    <li v-for='(item,index) in rightList' :key='index' @click="citys(item.CityName)">{{item.CityName}}</li>
                </ol>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex';
export default {
    name: '',
    data() {
        return {
            CityID: 28,
            isShow: false,
            isrightList: true
        }
    },
    computed: {
        ...mapState({
            rightList: state=>state.offer.rightList
        })
    },
    props: ['city'],
    methods: {
        city_right(id) {
            this.CityID = id
            this.cityRight(this.CityID)
            this.isShow = true
        },
        ...mapActions({
            cityRight: 'offer/cityRight'
        }),
        isHide() {
            this.isrightList = !this.isrightList
        },
        nodeName(e) {
            if (e.target.nodeName !== 'LI') {
                this.isShow = false
            }
        },
        citys(name) {
            this.$parent.citys = name
            this.isrightList = false
            this.$parent.cityList = false
            this.isShow = false
        }
    },
    mounted() {
        this.cityRight()
    }
}
</script>
<style lang="sass" scoped>
    @import url('../assets/scss/city.css');
</style>
