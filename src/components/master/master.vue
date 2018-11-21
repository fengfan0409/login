<template>
  <div>
    {{msg}}
  </div>
</template>

<script>
  import {getcookie,setcookie,delcookie} from "../../assets/cookie/cookie";
  export default {
    name: "master",
    data(){
      return{
        msg:1
      }
    },
    methods:{

    },
    mounted(){
      const name=getcookie('name');
      const password=getcookie('password');
      if (name&&password){
        this.$http.post('/api/log',{'name':name,'pass':password}).then(function (res) {
          if (!res.body.sucLog){
            this.$router.push({path: '/login'})
          }
        })
      }
      else {
        this.$router.push({path: '/login'})
      }
    }
  }
</script>

<style>

</style>
