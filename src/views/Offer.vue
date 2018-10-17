<template>
    <div class="offer">
        <!-- 头部 -->
        <header>
            <p>可向多个商家咨询最低价，商家及时回复 ?</p>
        </header>
        <!-- 内容 -->
        <div class="content" @scroll="onscroll" ref="content">
            <div>
            <router-link v-if='offerList.details' class="nav" tag='div' :to="{
                path: '/cartype',
                query: {id: offerList.details.serial.SerialID}
            }">
                <div class="img">
                    <img v-if='offerList.details' :src="offerList.details.serial.Picture">
                </div>
                <div class="tit">
                    <p v-if='offerList.details'>{{offerList.details.serial.AliasName}}</p>
                    <p v-if='offerList.details'>{{offerList.details.car_name}}</p>
                </div>
            </router-link>
            <!-- 个人信息 -->
            <div class="self-info">
                <p>个人信息</p>
                <ul>
                    <li>
                        <span>姓名</span>
                        <input type="text" placeholder="输入你的真实中文姓名" ref='name'>
                    </li>
                    <li>
                        <span>手机</span>
                        <input type="text" placeholder="输入你的真实手机号码" ref='phone'>
                    </li>
                    <li @click="moves">
                        <span>城市</span>
                        <span>{{citys}}</span>
                    </li>
                </ul>
                <div class="minumun">
                    <button class="minumum" @click="minumum">询最低价</button>
                </div>
            </div>
            <div class="lists">
                <p>选择报价经销商</p>
                <div v-for='(item, index) in offerList.list' :key='index' :class="index < 3 ? 'actives' : ''" @click="actives(index)" ref='div'>
                    <p>
                        <span>{{item.dealerShortName}}</span>
                        <span>{{item.vendorPrice}}万</span>
                    </p>
                    <p>
                        <span class="address">{{item.address}}</span>
                        <span>售{{item.saleRange}}</span>
                    </p>
                </div>
            </div>
            </div>
        </div>
        <footer v-show='isShow'>
            询最低价
        </footer>
        <div class="elastic" v-show='isMark'>
            <div class="mark">
                <div>
                    {{info}}
                </div>
                <p @click="ismark">{{info == '询价成功' ? '确定' : '好'}}</p>
            </div>
        </div>
        <city :city='city' v-show='cityList'></city>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex';
    import city from '@/components/city.vue'
    export default {
        name: '',
        data() {
            return {
                isShow: false,
                info: '',
                isMark: false,
                citys:'北京',
                cityList: false
            }
        },
        computed: {
            ...mapState({
                offerList: state=>state.offer.offerList,
                city: state=>state.offer.city
            })
        },
        components: {
            city
        },
        methods: {
            ...mapActions({
                offer: 'offer/offer',
                City: 'offer/City'
            }),
            onscroll(e) {
                 if (this.$refs.content.scrollTop >= 300) {
                     this.isShow = true
                 } else {
                     this.isShow = false
                 }
            },
            actives(index) {
                if (this.$refs.div[index].className) {
                    this.$refs.div[index].className = ''
                } else {
                    this.$refs.div[index].className = 'actives'
                }
            },
            minumum() {
                this.isMark = true;
                let names = /[\u4e00-\u9fa5]/;
                let phones = /^1[3,4,5,7,8]\d{9}$/;
                if (this.$refs.name.value.trim() && names.test(this.$refs.name.value.trim())) {
                    if (this.$refs.phone.value.trim() && phones.test(this.$refs.phone.value.trim())) {
                        this.info = '询价成功'
                    } else {
                        this.info = '请输入正确的手机号'
                    }
                } else {
                    this.info = '请输入真实中文姓名'
                }
            },
            ismark() {
                this.isMark = false;
            },
            moves() {
                this.cityList = true
            }
        },
        mounted() {
            this.offer(this.$route.query.carId.trim())
            this.City();
        }
    }
</script>
<style scoped>
    @import url('../assets/scss/offer.css');
</style>

