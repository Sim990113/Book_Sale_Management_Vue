<template>
  <div>
    <el-carousel indicator-position="outside" class="roll_pic">
      <el-carousel-item v-for = "item in roll_pic" :key="item.name" :name="item.name" >
        <img style="height: 100%;width: 100%" :src="item.url"/>
      </el-carousel-item>
    </el-carousel>

    <el-tabs type="border-card" style="width:990px;position: relative;left: 15%;background-color: #f5f7fa">
      <el-tab-pane label="新品特惠">
        <el-row>
          <el-col :span="6" v-for="item1 in newBooks" :key="item1.book_id" >
            <el-card style="width:225px" >
              <img :src="require('@/assets/images/'+item1.img_url)" class="book_image" @click="detail(item1)"/>
              <el-button type="text" class="books_title" @click="detail(item1)" >
                {{item1.book_name}}
              </el-button>
              <h3 class = "books_discount">￥{{item1.sale_price}}</h3>
              <s class = "books_price">￥{{item1.price}}</s>
            </el-card>
          </el-col>
        </el-row>

      </el-tab-pane>
      <el-tab-pane label="今日精选">
        <el-row>
          <el-col :span="6" v-for="item2 in dayBooks" :key="item2.book_id" >
            <el-card style="width:225px" >
              <img :src="require('@/assets/images/'+item2.img_url)" class="book_image" @click="detail(item2)"/>
              <el-button type="text" class="books_title" @click="detail(item2)" >
                {{item2.book_name}}
              </el-button>
              <h3 class = "books_discount">￥{{item2.sale_price}}</h3>
              <s class = "books_price">￥{{item2.price}}</s>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="低价热卖">
        <el-row>
          <el-col :span="6" v-for="item3 in lowprice" :key="item3.book_id" >
            <el-card style="width:225px" >
              <img :src="require('@/assets/images/'+item3.img_url)" class="book_image" @click="detail(item3)"/>
              <el-button type="text" class="books_title" @click="detail(item3)" >
                {{item3.book_name}}
              </el-button>
              <h3 class = "books_discount">￥{{item3.sale_price}}</h3>
              <s class = "books_price">￥{{item3.price}}</s>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="高性价比">
        <el-row>
          <el-col :span="6" v-for="item4 in highbook" :key="item4.book_id" >
            <el-card style="width:225px" >
              <img :src="require('@/assets/images/'+item4.img_url)" class="book_image" @click="detail(item4)"/>
              <el-button type="text" class="books_title" @click="detail(item4)" >
                {{item4.book_name}}
              </el-button>
              <h3 class = "books_discount">￥{{item4.sale_price}}</h3>
              <s class = "books_price">￥{{item4.price}}</s>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <span class="book_hot">图书畅销榜</span>
    <el-link class="more" href = '/Home_Page/Page_Hotlist'  :underline="false" target="_blank" >>>更多</el-link>
    <el-tabs type="border-card" class="right-tabs">
      <el-tab-pane label="经济">
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item class="little_collapse" v-for="(item5,index) in EconomicHotBooks" :title="(index+1)+' '+item5.book_name" :name="index+1">
            <img :src="require('@/assets/images/'+item5.img_url)" class="littlebook_img" @click="detail(item5)"/>
            <h3 class = "little_discount">￥{{item5.sale_price}}</h3>
            <s class = "little_price">￥{{item5.price}}</s>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="文学">
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item class="little_collapse" v-for="(item6,index) in LiteratureHotBooks" :title="(index+1)+' '+item6.book_name" :name="index+1">
            <img :src="require('@/assets/images/'+item6.img_url)" class="littlebook_img" @click="detail(item6)"/>
            <h3 class = "little_discount">￥{{item6.sale_price}}</h3>
            <s class = "little_price">￥{{item6.price}}</s>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="艺术">
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item class="little_collapse" v-for="(item7,index) in ArtHotBooks" :title="(index+1)+' '+item7.book_name" :name="index+1">
            <img :src="require('@/assets/images/'+item7.img_url)" class="littlebook_img" @click="detail(item7)"/>
            <h3 class = "little_discount">￥{{item7.sale_price}}</h3>
            <s class = "little_price">￥{{item7.price}}</s>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="历史">
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item class="little_collapse" v-for="(item8,index) in HistoricHotBooks" :title="(index+1)+' '+item8.book_name" :name="index+1">
            <img :src="require('@/assets/images/'+item8.img_url)" class="littlebook_img" @click="detail(item8)"/>
            <h3 class = "little_discount">￥{{item8.sale_price}}</h3>
            <s class = "little_price">￥{{item8.price}}</s>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>

  </div>

</template>

<script>


export default {
  name: "Page_Home",

  mounted(){
    const _this = this
    axios.get('http://localhost:8181/book/findNewBooks').then(function (resp){

      _this.newBooks = resp.data
    })

    const weekday = new Date().getDay()
    axios.get('http://localhost:8181/book/findDayBooks/'+weekday).then(function (resp){

      _this.dayBooks = resp.data
    })

    axios.get('http://localhost:8181/book/findLowPrice').then(function (resp){

      _this.lowprice = resp.data
    })

    axios.get('http://localhost:8181/book/findHighBooks').then(function (resp){

      _this.highbook = resp.data
    })

    axios.get('http://localhost:8181/book/findEconomicHotBook').then(function (resp){

      _this.EconomicHotBooks = resp.data
    })

    axios.get('http://localhost:8181/book/findLiteratureHotBook').then(function (resp){

      _this.LiteratureHotBooks = resp.data
    })

    axios.get('http://localhost:8181/book/findArtHotBook').then(function (resp){

      _this.ArtHotBooks = resp.data
    })

    axios.get('http://localhost:8181/book/findHistoricHotBook').then(function (resp){

      _this.HistoricHotBooks = resp.data
    })
  },

  data(){
    return{
      roll_pic:[
        {
          name:'roll_page1',
          url:require('@/assets/images/roll_page1.jpg')
        },
        {
          name:'roll_page2',
          url:require('@/assets/images/roll_page2.jpg')
        },
        {
          name:'roll_page3',
          url:require('@/assets/images/roll_page3.jpg')
        },
        {
          name:'roll_page4',
          url:require('@/assets/images/roll_page4.jpg')
        },
        {
          name:'roll_page5',
          url:require('@/assets/images/roll_page5.jpg')
        },
        {
          name:'roll_page6',
          url:require('@/assets/images/roll_page6.jpg')
        }
      ],
      newBooks:[],
      dayBooks:[],
      lowprice:[],
      highbook:[],

      EconomicHotBooks:'',
      LiteratureHotBooks:'',
      ArtHotBooks:'',
      HistoricHotBooks:'',

      activeNames:1,

    }
  },
  methods:{
    detail(item){
      // this.GLOBAL.detail= item
      let detial_page = this.$router.resolve('/Home_Page/Detail_Page')
      window.open(detial_page.href,'_blank')
      // console.log(this.GLOBAL.detail)
      this.$cookies.set('detail',item.book_id)
    },

  }

}
</script>

<style scoped>

</style>