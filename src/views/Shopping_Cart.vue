<template>
  <div>
    <el-row v-for="item in carts" :label="item" :key="item.book_id" class="row" >
      <el-card>
        <el-col :span="4">
          <img :src="require('@/assets/images/'+item.img_url)" class="image" @click="detail(item)" />
        </el-col>
        <el-col :span="10" style="position: relative;left: 200px">
          <el-link class="title" @click="detail(item)" :underline="false">{{item.book_name}}</el-link>
          <p class="discount">折扣价： ￥ {{item.sale_price}}</p>
          <s class="price">定价： ￥ {{item.price}}</s>
          <p>购买数量：{{item.amount}}</p>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-shopping-cart-2" class="buy" @click="addorder(item)" >&nbsp;
            购买</el-button>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "Shopping_Cart",
  data() {
    return {
      carts:'',
      OrderForm:{
        userid:null,
        book_id:null,
        book_name:'',
        amount:null,
        price:'',
        sale_price:'',
        order_date:'',
        img_url:'',
      },

    };
  },

  mounted() {
    const _this = this
    const userid = this.$cookies.get('userid')
    axios.get('http://localhost:8181/cart/findCarts/'+userid ).then(function (resp){
      _this.carts = resp.data
    })
  },

  methods:{

    detail(item){
      let detial_page = this.$router.resolve('/Home_Page/Detail_Page')
      window.open(detial_page.href,'_blank')
      this.$cookies.set('detail',item.book_id)
    },

    addorder(item){
      const _this = this
      const orderDate = new Date()
      this.OrderForm.userid = this.$cookies.get('userid')
      this.OrderForm.book_id = item.book_id
      this.OrderForm.book_name = item.book_name
      this.OrderForm.amount = item.amount
      this.OrderForm.price = item.price
      this.OrderForm.sale_price = item.sale_price
      this.OrderForm.order_date = orderDate.toLocaleString().toString()
      this.OrderForm.img_url = item.img_url

      axios.post('http://localhost:8181/orders/addorder',_this.OrderForm).then(function(resp){
        let name = _this.OrderForm.book_name
        if(resp.data=="success"){
          _this.$message({
            showClose:true,
            message:'《'+name+'》添加购物车成功！',
            type:'success'
              })
            }
          })
    }
  }

}
</script>

<style scoped>
.row{
  position: relative;
  left:280px;
  width: 1250px;
}
.image{
  position: relative;
  width: 144px;
  height: 207px;
  left: 200px;
}
.title{
  position: relative;
  font-size: 15px;
  font-weight: bold;



}

.buy{
  position: relative;
  left: 300px;
  height: 200px;
}

</style>