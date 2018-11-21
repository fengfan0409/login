<template>
  <div>
    <h1>登录</h1>
    <el-form :model="form">
      <el-form-item label="用户名" label-position="top">
        <el-input placeholder="请输入用户名" v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-position="top" style="margin-bottom: 40px">
        <el-input placeholder="请输入密码" v-model="form.pass"></el-input>
      </el-form-item>
      <el-form-item style="display: inline-block;width: 40%">
        <el-button type="primary" @click="onsubmit" style="width: 100%">登录</el-button>
      </el-form-item>
      <el-form-item style="display: inline-block;width: 40%;float: right">
        <router-link to="reg" style="color: orangered;float: right">没有账号?点我注册</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import {getcookie,setcookie,delcookie} from "../../assets/cookie/cookie";

    export default {
        name: "login",
        data(){
          return{
            form:{
              id:'',
              pass:''
            }
          }
        },
      methods:{
        open2(){
          this.$message('已成功登录')
        },
        open3(){
          this.$message('用户名或密码错误,请重新输入')
        },
        open4(){
          this.$message('服务器请求失败,请重试')
        },
        onsubmit:function () {
          this.$http.post('/api/log',{'name':this.form.id,'password':this.form.pass}).then(
            function (res) {
              console.log(res)
              if (res.body.sucLog){
                this.$router.push({path: '/home'})
                this.open2();
                setcookie('name',this.form.id,24);
                setcookie('password',this.form.pass,24);
              } else {
                this.open3()
              }
          },function () {this.open4()})
        }
      },
      //mounted挂载在目录
      mounted(){
          const name=getcookie('name');
          const password=getcookie('password');
          if (name&&password){
            this.$http.post('/api/log',{'name':name,'pass':password}).then(function (res) {
              if (res.body.sucLog){
                this.$router.push({path: '/home'})
              }
            })
          }
      }
    }
</script>

<style scoped>
  h1{
    margin-bottom: 20px;
    font-size: 20px;
  }
  /*div{*/
    /*!*flex-direction: row-reverse;*!*/
    /*width: 50%;*/
    /*margin: 40px auto;*/
    /*clear: both;*/
  /*}*/
  /*div *{*/
    /*text-align: center;*/
    /*margin: 20px auto;*/
  /*}*/
</style>
