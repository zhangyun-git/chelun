<template>
    <div class="app">
        <router-view></router-view>
        <Loading/>
    </div>
</template>
<script>
  // import {getBrandList,getMakeList} from './api/index'
  import Loading from '@/components/loading.vue' // 引入loding组件
  export default {
    name: '',
    data() {
      return {
        
      }
    },
    components: {
      Loading
    }
    // mounted() {
    //   getBrandList().then(res=>{
    //     console.log(res)
    //   })
    //   getMakeList(9).then(res=>{
    //     console.log(res)
    //   })
    // }
  }
</script>
<style lang='scss'>
  *{
    padding: 0;
    margin: 0;
    text-decoration: none;
  }
  html,body,.app{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  // @charset "utf-8";
  // *{
  //   margin:0px;
  //   padding:0px;
  //   text-decoration:none;
  //   box-sizing:border-box;
  //   font-size:.14rem;
  //   font-style:normal;
  //   font-weight:normal;
  // }
  // ul,li{
  //   list-style:none;
  // }
  // html{
  //   -webkit-touch-callout: none;
  //   -webkit-user-select: none;
  //   user-select: none;
  //   font-size:625%;
  // }
  // img,div,body,html,ul,li,a{
  //   -webkit-touch-callout: none; 
  // }
  // input,button{
  //   outline:0;
  // }
  // /*  input,textarea,button{
  //   -webkit-appearance: none;
  //   -moz-appearance: none ;
  //   appearance: none ;
  // } */
  // button{
  //   cursor:pointer;
  // }
  // input::-webkit-input-placeholder,textarea::-webkit-input-placeholder {
  //   color: #ccc;
  // }
  // %moretext{
  //   display: -webkit-box;
  //   -webkit-box-orient:vertical;
  //   -webkit-line-clamp:2;
  //   overflow:hidden;
  //   text-overflow: ellipsis;
  //   word-break: break-all;
  // }
  // %text{
  //   white-space: nowrap;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  // }
  // @mixin num($w,$h){
  //   width:$w;
  //   height:$h;
  // }
  // html,body{
  //   overflow-x:hidden;
  //   @include num(100%,100%);
  // }
</style>
