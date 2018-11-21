<template>
    <div class="box">
      <ul>
        <li v-for="item in items" @click='move' class="list" v-bind:class="{empty:isEmpty(item)}">
          {{item}}
        </li>
      </ul>
      <el-button type="primary" @click="renew" class="fresh">重置游戏</el-button>
    </div>
</template>

<script>
  import shuffle from  '../../assets/shuffle'
    export default {
      name: "pintu",
      data(){
        return{
          items:[],
          correctItems:[]
        }
      },
      methods:{
        isEmpty:function(inner){
          if (inner){
            return false
          }
          return true
        },
        move:function (event) {
          let item=+event.target.innerText||'';
          let index=this.items.indexOf('');
          let indexNow=this.items.indexOf(item);
          //大坑:Vue里不能通过索引给array,object赋值,因为defineproperty里set必须通过'='触发!!!!!
          //Vue.set(vm.items, indexOfItem, newValue)||vm.$set(vm.items, indexOfItem, newValue)来解决
          switch (indexNow){
            case index-4:
              this.$set(this.items, index, item);
              this.$set(this.items, index-4, '');
              break;
            case index-1:
              this.$set(this.items, index, item);
              this.$set(this.items, index-1, '');
              break;
            case index+1:
              this.$set(this.items, index, item);
              this.$set(this.items, index+1, '');
              break;
            case index+4:
              this.$set(this.items, index, item);
              this.$set(this.items, index+4, '');
              break;
          }
          if (this.items.join()===this.correctItems.join()){
            let alertPromise=new Promise(function (resolve,reject) {
              setTimeout(function () {
                resolve()
              },1)
            })
            alertPromise.then(function () {
              alert('Victory')
            })
          }
        },
        renew:function () {
          this.items=[];
          for (let i=1;i<16;i++){
            this.items.push(i);
          }
          shuffle(this.items);
          this.items.push('');
        }
      },
      mounted(){
        for (let i=1;i<16;i++){
          this.items.push(i);
          this.correctItems.push(i)
        }
        shuffle(this.items);
        this.items.push('');
        this.correctItems.push('')
      }
    }
</script>

<style scoped>
  .box{
  }
  ul{
    width: 400px;height: 400px;
  }
  .list{
    width: 98px;height: 98px;float: left;line-height: 98px;text-align: center;border: 1px solid black;
    box-shadow: 5px 5px 20px #888888;
    background-color: #e3df79;
  }
  .empty{
    background-color: #FFFFFF;
  }
  .fresh{
    margin-top: 40px;
    height: 40px;
    width: 400px;
  }
</style>
