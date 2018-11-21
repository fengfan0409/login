<template>
    <div id="box">
      <div class="score">已得分:{{score}} || 目标得分:{{goat}}</div>
      <ul>
        <!-- v-for item,index用括号 -->
        <li v-for="(item,index) in items" v-bind:class="item" @click="clear(item,index)"></li>
      </ul>
      <el-button type="primary" @click="fresh" class="fresh">重置游戏</el-button>
    </div>
</template>

<script>
    export default {
      name: "clearStar",
      data(){
        return{
          items:[],
          _continue:true,
          score:0,
          goat:1000,
          gameCount:1,
          emptyNum:null,
          passMsg:'',
          passOptions:'',
          clearNum:0
        }
      },
      methods:{
        open() {
          this.$alert('你的分数是'+this.score, this.passMsg, {
            confirmButtonText: this.passOptions
          })
        },
        reOption:function(){
          this.score=0;
          this.gameCount=1;
          this.goat=1000;
          this._continue=true;
          this.emptyNum=null;
          this.passOptions='';
          this.passMsg='';
        },
        randomGame:function () {
          this.items=[];
          for (let i=0;i<100;i++){
            let colorRandom=Math.floor(Math.random()*5);
            switch (colorRandom){
              case 0:
                this.items.push('red');
                break;
              case 1:
                this.items.push('green');
                break;
              case 2:
                this.items.push('yellow');
                break;
              case 3:
                this.items.push('blue');
                break;
              case 4:
                this.items.push('purple');
                break;
            }
          }
        },
        fresh:function(){
          this.reOption();
          this.randomGame()
        },
        clearColor:function(item,index){
          this.$set(this.items,index,'none');
          this.clearNum+=1;
          //右边界情况
          if (index%10===9){
            [index-10,index-1,index+10].forEach((indexNeighbor)=>{
              if (this.items[indexNeighbor]===item) {
                this.clearColor(item,indexNeighbor)
              }
            })
          }
          else {
            //左边界情况
            if (index%10===0){
              [index-10,index+1,index+10].forEach((indexNeighbor)=>{
                if (this.items[indexNeighbor]===item) {
                  this.clearColor(item,indexNeighbor)
                }
              })
            }
            else {
              //正常情况
              [index-10,index-1,index+1,index+10].forEach((indexNeighbor)=>{
                if (this.items[indexNeighbor]===item) {
                  this.clearColor(item,indexNeighbor)
                }
              })
            }
          }
        },
        dropBox:function(){
          this.items.forEach((item,index)=> {
            if (item==='none'){
              let obj={
                floor:Math.floor(index/10),
                remainder:index%10
              };
              //空白格 从下往上赋值变色 最后一格变白
              for (let i=obj.floor-1;i>=0;i--){
                if (i===0){
                  this.$set(this.items,(i+1)*10+obj.remainder,this.items[i*10+obj.remainder]);
                  this.$set(this.items,obj.remainder,'none');
                }
                else {
                  this.$set(this.items,(i+1)*10+obj.remainder,this.items[i*10+obj.remainder])
                }
              }
            }
          });
        },
        combineColumn:function(){
          //必须从右到左遍历,因为向左填补,双空列时正序会把一列空序补上,无法判断出来空列
          for (let i=9;i>=0;i--){
            if (this.items[90+i]==='none') {
              for (let j=i;j<=9;j++){
                for (let k=0;k<=9;k++){
                  if (j===9){
                    this.$set(this.items,k*10+j,'none');
                  }
                  else {
                    this.$set(this.items,k*10+j,this.items[k*10+j+1]);
                  }
                }
              }
            }
          }
        },
        addScore:function(){
          this.score+=(Math.pow(this.clearNum,2)*5)
        },
        gameOver:function(){
          this._continue=false;
          //有一个重复可消即可转变参数
          this.items.forEach((item,index)=>{
            if (item!=='none'){
              //双边界判断
              if (index%10===9){
                if (this.items[index-10]===item||this.items[index-1]===item||this.items[index+10]===item){
                  this._continue=true
                }
                //不管结果都用return终端
                return
              }
              if (index%10===0){
                if (this.items[index-10]===item||this.items[index+1]===item||this.items[index+10]===item){
                  this._continue=true
                }
                return
              }
              //正常判断
              if (this.items[index-10]===item||this.items[index-1]===item||this.items[index+1]===item||this.items[index+10]===item){
                this._continue=true
              }
            }
          })
        },
        clear:function (item,index) {
          if (item==='none'){
            return false
          }
          if (this.items[index-10]!==item&&this.items[index-1]!==item&&this.items[index+1]!==item&&this.items[index+10]!==item){
            console.log('no')
            return false
          }
          //边界情况
          if (index%10===9){
            if (this.items[index-10]!==item&&this.items[index-1]!==item&&this.items[index+10]!==item){
              console.log('no')
              return false
            }
          }
          if (index%10===0){
            if (this.items[index-10]!==item&&this.items[index+1]!==item&&this.items[index+10]!==item){
              console.log('no')
              return false
            }
          }
          this.clearNum=0;
          this.clearColor(item,index);
          this.dropBox();
          this.combineColumn();
          this.addScore();
          this.gameOver();
          if (!this._continue){
            //结算剩余块数加分
            this.emptyNum=0;
            this.items.forEach((val,index)=>{
              if(val==='none'){
                this.emptyNum+=1
              }
            });
            if (this.emptyNum>90){
              this.score+=(60*(this.emptyNum-90)+10*(this.emptyNum-90)*(this.emptyNum-90-1))
            }
            if (this.score<this.goat){
              this.passMsg='Game Over';
              this.passOptions='确定';
            }
            else {
              this.passMsg='你过关啦';
              this.passOptions='下一关';
            }
            this.open();
            if (this.score<this.goat){
              return false
            }
            this.randomGame();
            this.gameCount+=1;
            this.goat=(Math.floor(this.gameCount/10)*0.5+this.gameCount)*2000-1000;
          }
        }
      },
      mounted(){
        this.fresh()
      }
    }
</script>

<style scoped>

  ul{
    width: 400px;
  }
  li{
    margin-bottom: -2px;padding: 0;
    width: 40px;height: 40px;display: inline-block;
  }
  .score{
    height: 20px;width: 400px;text-align: center;
  }
  .blue{
    background:url("../../assets/img/blue1.png");
    background-size: 40px 40px;
  }
  .red{
    background:url("../../assets/img/red1.png");
    background-size: 40px 40px;
  }
  .yellow{
    background:url("../../assets/img/yellow1.png");
    background-size: 40px 40px;
  }
  .green{
    background:url("../../assets/img/green1.png");
    background-size: 40px 40px;
  }
  .purple{
    background:url("../../assets/img/purple1.png");
    background-size: 40px 40px;
  }
  .fresh{
    margin-top: 40px;
    height: 40px;
    width: 400px;
  }
  @media (max-width: 500px) {
    ul{
      width: 300px;
    }
    li{
      margin-bottom: -2px;padding: 0;
      width: 30px;height: 30px;display: inline-block;
    }
    .score{
      height: 20px;width: 300px;text-align: center;
    }
    .fresh{
      margin-top: 20px;
      height: 30px;
      width: 300px;
    }
    .blue{
      background:url("../../assets/img/blue1.png");
      background-size: 30px 30px;
    }
    .red{
      background:url("../../assets/img/red1.png");
      background-size: 30px 30px;
    }
    .yellow{
      background:url("../../assets/img/yellow1.png");
      background-size: 30px 30px;
    }
    .green{
      background:url("../../assets/img/green1.png");
      background-size: 30px 30px;
    }
    .purple{
      background:url("../../assets/img/purple1.png");
      background-size: 30px 30px;
    }
  }
</style>
