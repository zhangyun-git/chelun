<template>
  <div class="app" ref='app'>
    <!-- 显示loading图 -->
    <Loading></Loading>
    <div class="box">
      <!-- 车辆品牌列表 -->
      <div class="wrap">
        <div v-for='(item,index) in brand' :key='index' :id='item.title' class="list">
          <h3 :ref="'a'+index">{{item.title}}</h3>
          <ul>
            <li v-for='(items,indx) in item.list' :key='indx' @click='isHide(index,indx)'>
              <img v-lazy="items.CoverPhoto">
              <span>{{items.Name}}</span>
            </li>
          </ul>
        </div>
      </div>
      </div>
      <!-- 车系列表 -->
      <div :class="isShow ? 'CarSystem move' : 'CarSystem'" ref='make'
       @touchstart.stop='makeTouchstart' 
       @touchmove.stop='makeTouchmove' 
       @touchend.stop='makeTouchend'>
        <div v-for='(item,index) in make' :key='index' class="make">
          <h3>{{item.GroupName}}</h3>
          <ol>
            <router-link v-for='(items,ind) in item.GroupList' :key='ind' tag='li' :to="{
              path: '/detail',
              query: {id: items.SerialID}
            }">
              <img :data-src="items.Picture">
              <p>
                <span>{{items.AliasName}}</span>
                <span>{{items.DealerPrice}}</span>
              </p>
            </router-link>
          </ol>
        </div>
    </div>
    <!-- 侧边栏字母列表 -->
    <div class="title" v-show='!isShow'>
      <p @click='top'>#</p>
      <p v-for='(item,index) in brand' :key='index' @touchstart='touchstart(index,$event)' @touchmove='touchmove($event)'>{{item.title}}</p>
    </div>
  </div>
</template>
<script>
  import Bscroll from 'better-scroll'; // 引入better-scroll
  import {mapState, mapActions, mapMutations} from 'vuex' // 引入vuex映射的方法
  import {lazyLoad} from '@/utils/lazyLoad.js'
  export default {
    name: '',
    data() {
      return {
        isShow: false,
        MasterID: 128,
        makeListID:0
      }
    },
    computed: {
      // 将vuex的数据缓存
      ...mapState({
        brand: state=>state.index.BrandList,
        make: state=>state.index.MakeList
      })
    },
    methods: {
      ...mapActions({
        BrandList: 'index/BrandList',
        MakeList: 'index/MakeList'
      }),
      isHide(indexs,inds) {
        this.brand.forEach((item,index)=>{
          if (index == indexs) {
            item.list.forEach((items,ind)=>{
              if (ind == inds) {
                this.MasterID = items.MasterID
                this.MakeList(this.MasterID);
              }
            })
          }
        })
        this.isShow = true
      },
      touchstart(id, e) {
        this.id = id; // 点击的下标
        this.start = e.changedTouches[0].clientY;  // 第一次点击的字母距离上面的位置
        this.scroll.scrollToElement(this.$refs['a'+id][0])
      },
      touchmove(e) {
        let newID = this.id + parseInt((e.changedTouches[0].clientY - this.start)/e.target.clientHeight)
        if (newID <= 0) {
          newID = 0
        }else if (newID >= 20) {
          newID = 20
        }
        this.scroll.scrollToElement(this.$refs['a'+newID][0])
      },
      top() {
        this.scroll.scrollTo(0,0) // 点击#回到页面顶部
      },
      makeTouchstart(e) {
        /**
         * e.changedTouches[0].clientX   鼠标点击的位置距离页面左边的位置
         * this.$refs.app.offsetWidth-this.$refs.make.offsetWidth  侧边盒子距离页面的距离
         * e.changedTouches[0].clientX-(this.$refs.app.offsetWidth-this.$refs.make.offsetWidth) 鼠标点击的位置距离侧边盒子的距离
         * (e.changedTouches[0].clientX-(this.$refs.app.offsetWidth-this.$refs.make.offsetWidth))/this.$refs.make.offsetWidth 鼠标点击的位置距离侧边盒子的比例
         */
        this.makeListID = (e.changedTouches[0].clientX-(this.$refs.app.offsetWidth-this.$refs.make.offsetWidth))/this.$refs.make.offsetWidth
      },
      makeTouchmove(e) {
        let moveBar = (e.changedTouches[0].clientX-(this.$refs.app.offsetWidth-this.$refs.make.offsetWidth))/this.$refs.make.offsetWidth
        /**
         * moveBar - this.makeListID 前后比例相减 如果X轴左滑会>0
         * this.$refs.make.style.transform = `translateX(${(moveBar - this.makeListID)*100+'%'})`  移动前后滑动增加比例
         */
        if (moveBar - this.makeListID > 0) {
          this.isShow = false
          this.$refs.make.style.transform = `translateX(${(moveBar - this.makeListID)*100+'%'})`
        }
      },
      makeTouchend() {
        // 动画还原
        this.$refs.make.style.transform = `translate(100%)`
        this.isShow = false
      }
    },
    mounted() {
      this.BrandList(); 
      this.MakeList();
      this.scroll = new Bscroll('.box',{
        click: true
      })
    },
    updated() {
      lazyLoad('.CarSystem')
    }
  }
</script>
<style scoped>
  @import url('../assets/scss/index.css');
</style>
