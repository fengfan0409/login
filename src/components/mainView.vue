<template>
  <div>
    <div>{{strInput}}</div>
  </div>
</template>

<script>
    export default {
      name: "mainView",
      data(){
        return{
          strWait:'/*这是一段简单的自我介绍*/',
          count:null,
          strInput:''
        }
      },
      methods:{
        inp:function () {
          let timeIn=setInterval(function () {
            if (this.strWait===this.strInput){
              clearInterval(timeIn)
            }
            this.count++;
            this.strInput=this.strWait.substring(0,this.count)
        },200)
        }
      },
      mounted(){
        this.inp()
      }
    }
</script>

<style scoped>

</style>
