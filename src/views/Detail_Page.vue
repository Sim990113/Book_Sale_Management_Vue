<template>
  <div>
    <el-row>
      <el-col :span="8" >
        <img :src="url" class="detail_img"/>
      </el-col>
      <el-col :span="9">
        <el-row>
          <h1>{{detail_info.book_name}}</h1>
        </el-row>
        <el-row>
          <p>作者: {{detail_info.book_author}}</p>
        </el-row>
        <el-row>
          <el-col :span="9">
            <p>出版社: {{detail_info.publishing_house}}</p>
          </el-col>
          <el-col :span="10">
            <p>出版时间: {{detail_info.publish_date}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>分类: {{detail_info.book_type}}</p>
          </el-col>
          <el-col :span="6">
            <p>页数: {{detail_info.pages}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="price" >折扣价:</span>
            <span class="price" style="color: #409eff"> ￥{{detail_info.sale_price}}</span>
          </el-col>
          <el-col :span="6">
            <s class="price">定价: ￥{{detail_info.price}}</s>
          </el-col>
        </el-row>
        <el-row>
          <el-button type="primary" icon="el-icon-shopping-cart-2" class="cart" @click="addcart" >
            &nbsp;
            加入购物车</el-button>
        </el-row>
      </el-col>
      <el-col>

          <span style="color: #409eff;position: relative;top: 15px" class="billboard">本类图书榜</span>
          <el-link class="more" href = '/Home_Page/Page_Hotlist'  :underline="false" target="_blank" >>>更多</el-link>

          <el-collapse v-model="activeNames" class="billboard-tab" accordion>
            <el-collapse-item class="little_collapse" v-for="(item,index) in typeBooks" :title="(index+1)+' '+item.book_name" :name="index+1">
              <img :src="require('@/assets/images/'+item.img_url)" class="littlebook_img" @click="detail(item)"/>
              <h3 class = "little_discount">￥{{item.sale_price}}</h3>
              <s class = "little_price">￥{{item.price}}</s>
            </el-collapse-item>
          </el-collapse>


      </el-col>
    </el-row>

      <el-tabs type="border-card" class="book_detail">
        <el-tab-pane label="商品详情">
          <el-row>
            <h3>{{detail_info.book_name}} 内容简介</h3>
            <span class="introduction">{{detail_info.brief_introduction}}</span>
          </el-row>
          <el-row>
            <h3>{{detail_info.book_name}} 作者简介</h3>
            <span class="introduction">{{detail_info.author_introduction}}</span>
          </el-row>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>

export default {
  name: "Detail_Page",
  data(){
    return{
      book_id:this.$cookies.get('detail'),
      detail_info:'',
      typeBooks:'',
      url:'',
      activeNames:1,
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
  mounted() {
    const _this = this
    axios.get('http://localhost:8181/book/findById/'+this.book_id).then(function (resp){
      _this.detail_info = resp.data
      _this.url = require('@/assets/images/'+_this.detail_info.img_url)
    })

    setTimeout(function () {
      axios.get('http://localhost:8181/book/findByType_5/'+_this.detail_info.book_type).then(function (resp){
        _this.typeBooks = resp.data
      })
    },500);

  },
  methods: {
    detail(item){
      let detial_page = this.$router.resolve('/Home_Page/Detail_Page')
      window.open(detial_page.href,'_blank')
      this.$cookies.set('detail',item.book_id)
    },

    addcart(){
      const _this = this
      this.CartForm.userid = this.$cookies.get('userid')
      this.CartForm.book_id = this.detail_info.book_id
      this.CartForm.book_name = this.detail_info.book_name
      this.CartForm.amount = 1
      this.CartForm.price = this.detail_info.price
      this.CartForm.sale_price = this.detail_info.sale_price
      this.CartForm.img_url = this.detail_info.img_url

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
.detail_img{
  position: relative;
  height: 380px;
  width:270px;
  left: 280px;
}

.price{
  position: relative;
  top:15px
}
.cart{
  position: relative;
  top: 90px;
}

.book_detail{
  position: relative;
  width:1270px;
  left: 280px;
  top: -200px;
}
.introduction{
  display:block;
  text-indent: 2em;

}

.billboard{
  position: absolute;
  left:1200px;
  top:-390px !important;
  width:280px;
  height:230px;
}

.billboard-tab{
  position: relative;
  left: 1200px;
  top:-380px;
  width:280px;
  height:230px;
}

</style>