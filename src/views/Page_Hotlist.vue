<template>
  <div>
    <div style="background-color:#409eff;width:4px;height: 30px;left:800px;position: relative"></div>
    <h1 style="color:#409eff ; width: 200px ; left: 845px;top: -50px; position: relative">全部畅销书目</h1>
    <div style="background-color:#409eff;width:4px;height: 30px; position: relative;left: 1027px;top: -101px"></div>

    <ul class="infinite-list"  infinite-scroll-delay="1000" style="overflow:auto">
      <el-backtop>
        <i class="el-icon-caret-top"></i>
      </el-backtop>
      <el-row>
        <el-col v-for="item in books" :span="4">
          <el-card class="book" >
            <img :src="require('@/assets/images/'+item.img_url)" class="image" @click="detail(item)" />
            <el-link class="title" @click="detail(item)" :underline="false">{{item.book_name}}</el-link>
            <p class="publish">{{item.publishing_house}}</p>
            <div class="line"></div>
            <p class="discount">折扣价：{{item.sale_price}}元</p>
            <s class="price">原价：{{item.price}}元</s>
            <el-button type="primary" icon="el-icon-shopping-cart-2" class="cart" @click="addcart(item)">
              &nbsp;
              加入购物车</el-button>
          </el-card>

        </el-col>
      </el-row>

    </ul>
  </div>


</template>

<script>
export default {
  name: "Page_Hotlist",
  data(){
    return{
      books:'',
      CartForm:{
        userid:null,
        book_id:null,
        book_name:'',
        amount:null,
        price:'',
        sale_price:'',
        img_url:'',
      },
    }
  },
  mounted(){
    const _this = this
    axios.get('http://localhost:8181/book/findHotBooks').then(function (resp){
      _this.books = resp.data
    })
  },
  methods: {
    detail(item){
      let detial_page = this.$router.resolve('/Home_Page/Detail_Page')
      window.open(detial_page.href,'_blank')
      this.$cookies.set('detail',item.book_id)
    },
    addcart(item){
      const _this = this
      this.CartForm.userid = this.$cookies.get('userid')
      this.CartForm.book_id = item.book_id
      this.CartForm.book_name = item.book_name
      this.CartForm.amount = 1
      this.CartForm.price = item.price
      this.CartForm.sale_price = item.sale_price
      this.CartForm.img_url = item.img_url
      console.log("yes")

      axios.get('http://localhost:8181/cart/CheckCart/'+this.CartForm.userid+'/'+this.CartForm.book_id).then(function(resp){
        if (resp.data != '' )
        {
          _this.CartForm.amount = resp.data[0].amount+1
          axios.put('http://localhost:8181/cart/AddAmount',_this.CartForm).then(function(resp1){
            if(resp1.data=="success"){
              _this.$message({
                showClose:true,
                message:'《'+_this.CartForm.book_name+'》添加购物车再次成功！',
                type:'success'

              })
            }
          })
        }
        else
        {
          axios.post('http://localhost:8181/cart/addcart',_this.CartForm,).then(function(resp){
            let name = _this.CartForm.book_name
            if(resp.data=="success"){
              _this.$message({
                showClose:true,
                message:'《'+name+'》添加购物车成功！',
                type:'success'

              })
            }
          })

        }
      })

    }
  }
}
</script>

<style scoped>

.infinite-list{
  position: relative;
  top: -50px;
  left: 237px;
  width: 1280px;
}

.book{
  border-radius: 20px
}

.image{
  width: 155px;
  height:205px;
  cursor: pointer;
}

.title{
  display: -webkit-box;/*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden; /*超出的文本隐藏*/
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical;/*伸缩盒子的子元素排列：从上到下*/
  font-size: 18px;
}

.publish{
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}

.line{
  background-color: #B3C0D1;
  height: 1px;
}

.discount{
  color: #409eff;
}

.price{
  color: #B3C0D1;
}

.cart{
  width: 100%;
}
</style>