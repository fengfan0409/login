<template>
  <div id="app">
    <el-menu index="4" class="el-menu" mode="horizontal">
      <el-menu-item index="1" class="navList">
        <router-link to="/">首页</router-link>
      </el-menu-item>
      <el-menu-item index="2" class="navList">
        <router-link to="/login">登录</router-link>
      </el-menu-item>
      <el-menu-item index="3" class="navList">
        <router-link to="/reg">注册</router-link>
      </el-menu-item>
    </el-menu>
    <router-view class="middleBox"></router-view>
    <!--<el-button type="primary" icon="el-icon-delete" id="cooDel" v-on:click="deleteAllCookies">清除cookie</el-button>-->
  </div>
</template>

<script>
export default {
  name: 'App',
  // data(){
  //     return{
  //     }
  // },
  // mounted(){
  //
  // }
  methods:{
    deleteAllCookies:function () {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    }
  }
}

</script>

<style>
  @import "assets/reset.css";
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
  .navList *{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .middleBox{
    margin: 20px auto;
  }
  #cooDel{
    position: fixed;
    top: 20px;
    right: 200px;
  }
</style>
