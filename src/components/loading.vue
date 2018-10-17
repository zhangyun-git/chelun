<template>
    <div class="loading" v-show="isLoading">
        <img src="../assets/loading.gif">
        <p>加载中</p>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        name: '',
        data() {
            return {

            }
        },
        computed: {
            ...mapState({
                isLoading: state=>state.isLoading
            })
        }
    }
</script>
<style lang='scss'>
    .loading{
        width: 40%;
        position: fixed;
        top:40%;
        left:30%;
        z-index: 999;
        background: rgba(0,0,0,.8);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        img{
            width: 50%;
        }
        p{
            color: #fff;
            font-size: .3rem;
            padding-top: .3rem;
            box-sizing: border-box;
        }
    }
</style>
