<template>
    <div class="colorCon">
        <span @click="back">全部颜色</span>
        <div>
            <p>
                <span v-for='(item,index) in keys' :key='index' @click='active(index)' :class="activeIndex == index ? 'active' : ''">{{item}}</span>
            </p>
            <ul>
                <li v-for='(item,index) in colorList' :key='index' @click="toColor(item.ColorId, item.Name)">
                    <span :style='`background:${item.Value}`'></span>
                    {{item.Name}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions, mapMutations} from 'vuex';
    export default {
        name: '',
        data() {
            return {
                activeIndex: 0
            }
        },
        computed:{
            ...mapState({
                colorType: state=>state.img.colorType
            }),
            colorList() {
                return this.colorType[this.keys[this.activeIndex]]
            },
            keys(){
                return Object.keys(this.colorType).sort((a,b)=>{
                    return b - a
                })
            }
        },
        methods: {
            ...mapActions({
                getColorType: 'img/getColorType'
            }),
            back() {
                this.$router.go(-1)
                this.$router.push({
                    path: '/img',
                    query: {
                        SerialID: this.$route.query.SerialID,
                        val: '全部颜色'
                    }
                })
            },
            active(index) {
                this.activeIndex = index
            },
            toColor(ColorId, val) {
                this.$router.push({
                    path: '/img',
                    query: {
                        ColorId,
                        SerialID: this.$route.query.SerialID,
                        val
                    }
                })
            }
        },
        mounted() {
            // 获取车辆颜色的数据
            this.getColorType(this.$route.query.SerialID)
        }
    }
</script>
<style>
    @import url('../assets/scss/colorType.css');
</style>
