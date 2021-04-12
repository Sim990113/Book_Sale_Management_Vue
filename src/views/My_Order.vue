<template>
  <div>
    <el-row v-for="item in orders" :label="item" :key="item.book_id" class="row" >
      <el-card>
        <el-col :span="4">
          <img :src="require('@/assets/images/'+item.img_url)" class="image" @click="detail(item)" />
        </el-col>
        <el-col :span="10" style="position: relative;left: 200px">
          <el-link class="title" @click="detail(item)" :underline="false">书名：{{item.book_name}}</el-link>
          <p class="discount">折扣价： ￥ {{item.sale_price}}</p>
          <s class="price">定价： ￥ {{item.price}}</s>
          <p>购买数量：{{item.amount}}</p>
          <p>购买时间：{{item.order_date}}</p>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "My_Order",
  data() {
    return {
      orders:'',

    };
  },

  mounted() {
    const _this = this
    const userid = this.$cookies.get('userid')
    axios.get('http://localhost:8181/orders/findOrders/'+userid ).then(function (resp){
      _this.orders = resp.data
    })
  },

  methods:{

    detail(item){
      let detial_page = this.$router.resolve('/Home_Page/Detail_Page')
      window.open(detial_page.href,'_blank')
      this.$cookies.set('detail',item.book_id)
    },
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