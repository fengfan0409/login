<template>
  <div>
    <h1>注册</h1>
    <el-form :model="form">
      <el-form-item label="用户名" label-position="top">
        <el-input placeholder="请设置用户名" v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-position="top">
        <el-input placeholder="请设置密码" v-model="form.pass"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" label-position="top" style="margin-bottom: 40px">
        <el-input placeholder="请再次输入密码" v-model="form.passAgain" @blur="passAgain_onblur"></el-input>
      </el-form-item>
      <el-form-item style="display: inline-block;width: 40%">
        <!--v-bind绑定disabled属性-->
        <el-button type="primary" @click="onsubmit" style="width: 100%" v-bind:disabled="disabled()" >注册</el-button>
      </el-form-item>
      <el-form-item style="display: inline-block;width: 40%;float: right">
        <router-link to="/login" style="color: orangered;float: right">已有账号?点我登录</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {getcookie,setcookie,delcookie} from "../../assets/cookie/cookie";
    export default {
        name: "register",
      data(){
        return{
          form:{
            id:'',
            pass:'',
            passAgain:'',
          }
        }
      },
        methods:{
          open2(){
            this.$message('已成功注册,自动跳转至首页')
          },
          open3(){
            this.$message('不符合要求,请重新输入')
          },
          open4(){
            this.$message('服务器请求失败,请重试')
          },
          onsubmit:function () {
            this.$http.post('/api/reg',{'name':this.form.id,'password':this.form.pass}).then(function () {
              this.open4()
            },function (res) {
              if (res.body.sucReg){
                this.router.push({path: '/home'})
                this.open2();
                setcookie('name',this.form.id,24);
                setcookie('password',this.form.pass,24);
              } else {
                this.open3()
              }
            })
          },
          disabled:function(disNo){
            console.log(disNo)
            if (disNo==='disNo'){
              return false
            }
            else {
              return true
            }
          },
          passAgain_onblur:function () {
            if (this.form.pass===this.form.passAgain){
              console.log('yes')
              this.disabled('disNo')
            }
          }
        },
      mounted(){
        const name=getcookie('name');
        const password=getcookie('password');
        if (name&&password){
          console.log(666)
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
</style>
