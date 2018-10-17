<template>
    <div class="img_con">
        <!-- 头部标题 -->
        <div class="tits">
            <p @click="ToColor">{{colorType}}</p>
            <p @click="ToCar">{{carType}}</p>
        </div>
        <!-- 图片分类 -->
        <div class="img_list" @click="imgClick">
            <ul v-for='(item,index) in imgAll' :key='index'>
                <li v-for='(value,key) in item.List' :key='key' :style="{'background-image':`url(${value.Url.replace('{0}',value.LowSize)})`}" @click="img_detail(key,item.Id)" :data-id='key'>
                    <div v-if='key==0' class="infos">
                        <p>{{item.Name}}</p>
                        <p>{{item.Count}}张></p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="no-img" v-if='!imgAll.length'>
            <img src="../assets/咖啡杯 茶杯.png">
            <p>还没有内容</p>
        </div>
        <!-- 图片列表 -->
        <div class="img_detail" v-show='isImg_detail' @scroll="scroll" ref='img_detail' @click="imgClick">
            <ol ref='ol'>
                <li v-for='(item,index) in ImgList' :key='index'>
                    <img :data-src="`${item.Url.replace('{0}', item.LowSize)}`" :data-id='index'>
                </li>
            </ol>
        </div>
        <!-- 图片轮播 -->
        <section class="swiper" v-show='showSwiper' @click='swiperClick'>
            <swiper :options="swiperOption" ref="mySwiper">
                <!-- slides -->
                <swiper-slide v-for='(item,index) in ImgList' :key='index'>
                    <img :src="`${item.Url.replace('{0}', item.HighSize)}`" class="swiper-lazy">
                    <div class="swiper-lazy-preloader"></div>
                </swiper-slide>
            </swiper>
            <p>{{`${1+current*1}/${ImgList.length}`}}</p>
        </section>
    </div>
</template>
<script>
    import {lazyLoad} from '@/utils/lazyLoad.js'
    import {debounce} from '@/utils/utils';
    import {mapState, mapActions, mapMutations} from 'vuex';
    import 'swiper/dist/css/swiper.css';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    export default {
        name: '',
        data() {
            return {
                ImageID: 6,
                isImg_detail: false,
                carType: '车款',
                colorType: '颜色'
            }
        },
        computed: {
            ...mapState({
                imgAll: state=>state.img.imgAll,
                ImgList: state=>state.img.imgList,
                isFetching: state=>state.img.isFetching,
                Page: state=>state.img.Page,
                current: state=>state.img.current,
                showSwiper: state=>state.img.showSwiper
            }),
            swiper() {
                return this.$refs.mySwiper.swiper
            },
            swiperOption() {
                let that = this;
                return {
                    lazy: {
                        loadPrevNext: true
                    },
                    on: {
                        slideChange: function() {
                            if (this.activeIndex > (that.page-1)*30-5) {
                                this.ImgLists({
                                    SerialID: this.$route.query.SerialID,
                                    ImageID: this.ImageID
                                });
                            }
                            that.changeSwiper({
                                id: this.activeIndex,
                                show: true
                            })
                        }
                    }
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        methods: {
            ...mapActions({
                Img: 'img/Img',
                ImgLists: 'img/ImgList'
            }),
            ...mapMutations({
                changeSwiper: 'img/changeSwiper'
            }),
            img_detail(k,id) {
                if (k == 0) {
                    this.ImageID = id
                    this.isImg_detail = true
                }
                this.ImgLists({
                    SerialID: this.$route.query.SerialID,
                    ImageID: this.ImageID
                });
            },
            scroll(){
                let scrollTop = this.$refs.img_detail.scrollTop;
                let height = this.$refs.ol.getBoundingClientRect().height;
                if ((scrollTop > ((height-window.innerHeight) - 20)) && !this.isFetching){
                    // 执行加载下一页的逻辑
                    this.ImgLists({
                        SerialID: this.$route.query.SerialID,
                        ImageID: this.ImageID
                    })
                }
            },
            imgClick(e) {
                let id = e.target.dataset.id
                if (id) {
                    this.changeSwiper({
                        id,
                        show: true
                    })
                }
                this.swiper.slideTo(id, 1000, false)
            },
            swiperClick(e) {
                if (e.target == e.currentTarget) {
                    this.changeSwiper({
                        show: false
                    })
                }
            },
            ToColor() {
                this.$router.push({
                    path: '/colortype',
                    query: {
                        SerialID: this.$route.query.SerialID
                    }
                })
            },
            ToCar() {
                this.$router.push({
                    path: '/cartype',
                    query: {
                        id: this.$route.query.SerialID
                    }
                })
            }
        },
        updated(){
            if (this.isImg_detail && this.Page == 2) {
                lazyLoad('.img_detail');
            }
        },
        mounted() {
            if (this.$route.query.val) {
                this.colorType = this.$route.query.val
            } else {
                this.colorType = '颜色'
            }

            if (window.localStorage.getItem('carType')) {
                // 车辆类型的数据
                var carType = JSON.parse(window.localStorage.getItem('carType'));
                var carTit = Object.keys(carType)
             }

            this.ImgLists({
                SerialID: this.$route.query.SerialID,
                ImageID: this.ImageID
            });

            let func = debounce(this.scroll, 100);
            this.$refs.img_detail.addEventListener('scroll', func);

            // 是否显示swiper
            this.changeSwiper({
                show: false
            })
            // 颜色类型的数据
            if (this.$route.query.ColorId) {
                this.Img({
                    SerialID: this.$route.query.SerialID,
                    ColorId: this.$route.query.ColorId
                })
            } else {
                this.Img(this.$route.query.SerialID)
            }

            // 车辆类型的数据
            if (carTit.length) {
                this.carType = carType.val
                this.Img({
                    SerialID: carType.id,
                    carId: carType.carId
                })
            } else {
                this.carType = '车款'
                this.Img(carType.id)
            }
        }
    }
</script>
<style>
    @import url('../assets/scss/img.css');
</style>
