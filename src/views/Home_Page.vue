<template>
  <el-container style="border: transparent">
    <el-header class="home_header">
      <el-row>
        <el-col style="background-color:#f2f2f2;height:20px;">
          <label style = "position: relative;font-size: medium;font-family: 锐字云字库隶书GB;top: -20px;left: 15%">欢迎光临久久图书网   </label>
          <label id="name" style="position:relative;cursor: pointer;color: #409eff;top: -20px;font-size: medium;font-family: 锐字云字库隶书GB;left: 15%" @click="signin">  登录 </label>
          <label id="log1" style = "position: relative;font-size: medium;font-family: 锐字云字库隶书GB;top: -20px;left: 15% ;"> | </label>
          <label id="log2" style="position:relative;cursor: pointer;color: #409eff;top: -20px;font-size: medium;font-family: 锐字云字库隶书GB;left: 15%" @click="signup"> 注册</label>
          <el-link class="top_menu" @click = "shopping_cart" target="_blank"  :underline="false" style="left: 54%;">
            <i class="el-icon-shopping-cart-2" style="color: #409eff"></i>
            &nbsp;
            购物车
          </el-link>
          <el-link class="top_menu" @click = "my_order" target="_blank"  :underline="false" style="left: 57%;">
            我的订单
          </el-link>
          <el-link class="top_menu" @click = "my_account" target="_blank"  :underline="false" style="left:60%" >
            我的账户
          </el-link>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-link href ='/Home_Page/Page_Home' :underline="false"><img class="home_logo" :src="require('@/assets/images/logo_transport.png')"/></el-link>

          <div style="position: absolute;left: 34%;top:2px;width:31%;">
            <el-input placeholder="请输入内容" v-model="input"  >
              <el-select v-model="select" slot="prepend" placeholder="搜索全部" style="width: 110px;">
                <el-option label="搜索全部" value="all"></el-option>
                <el-option label="书名" value="book_name"></el-option>
                <el-option label="作者" value="book_author"></el-option>
                <el-option label="出版社" value="publishing_house"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" style="background-color: #409eff;color: white" @click="search"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-dropdown style="position: relative;left: 15%;top: -25px;"  @command="handleCommand">
            <el-button style="background-color: #409eff;color: white;width: 210%;text-align: left;font-family: 宋体  ">
              <i class="el-icon-s-operation" style="fill: white"></i>
              图书分类 <i class="el-icon-arrow-down el-icon--right" style="position: relative;left: 65%"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in classify" :key="item.value" :label = "item.label" :value = "item.value" :command="item.value" >{{item.value}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-link id="pagehome" class="top2_menu" href = '/Home_Page/Page_Home'target="_blank"  :underline="false" style="left: 35%;" >首页</el-link>
          <el-link id="pagediscount" class="top2_menu" href = '/Home_Page/Page_Discount'target="_blank"  :underline="false" style="left: 49%">今日特惠</el-link>
          <el-link id="pagehotlist" class="top2_menu" href = '/Home_Page/Page_Hotlist'target="_blank"  :underline="false" style="left: 63%">畅销榜</el-link>

        </el-col>
      </el-row>
  </el-header>
  <el-main>
    <router-view></router-view>
  </el-main>
  <el-footer>
    <label style="position:relative;left: 40% ;">Copyright © 2020 久久图书网. All Rights Reserved</label>
  </el-footer>

  </el-container>
</template>

<script>
export default {
  name: "Home_Page",
  inject:['reload'],
  data(){
    return{
      sure:'',
      input:'',
      select:'',
      classify:[
        {label:'A 马克思主义、列宁主义、毛泽东思想、邓小平理论',value:'A 马克思主义、列宁主义、毛泽东思想、邓小平理论'},
        {label:'B 哲学、宗教',value:'B 哲学、宗教'},
        {label:'C 社会科学总论',value:'C 社会科学总论'},
        {label:'D 政治、法律',value:'D 政治、法律'},
        {label:'E 军事',value:'E 军事'},
        {label:'F 经济',value:'F 经济'},
        {label:'G 文化、科学、教育、体育',value:'G 文化、科学、教育、体育'},
        {label:'H 语言、文字',value:'H 语言、文字'},
        {label:'I 文学',value:'I 文学'},
        {label:'J 艺术',value:'J 艺术'},
        {label:'K 历史',value:'K 历史'},
        {label:'N 自然科学总论',value:'N 自然科学总论'},
        {label:'O 数理科学和化学',value:'O 数理科学和化学'},
        {label:'P 天文学、地球科学',value:'P 天文学、地球科学'},
        {label:'Q 生物科学',value:'Q 生物科学'},
        {label:'R 医药、卫生',value:'R 医药、卫生'},
        {label:'S 农业科学',value:'S 农业科学'},
        {label:'T 工业技术',value:'T 工业技术'},
        {label:'U 交通运输',value:'U 交通运输'},
        {label:'V 航空、航天',value:'V 航空、航天'},
        {label:'X 环境科学、劳动保护科学（安全科学）',value:'X 环境科学、劳动保护科学（安全科学）'},
        {label:'Z 综合性图书',value:'Z 综合性图书'}
      ]
    }
  },
  mounted() {

    // 自动获取当前页的path来修改menu样式
    let page_home = document.getElementById("pagehome")
    let page_discount = document.getElementById("pagediscount")
    let page_hotlist = document.getElementById("pagehotlist")
    let page_publishinghouse = document.getElementById("pagepublishinghouse")
    let path_url = window.location.href;

    if(path_url == "http://localhost:8080/Home_Page/Page_Home")
    {
      page_home.style.color = '#409eff'
    }
    else if(path_url == "http://localhost:8080/Home_Page/Page_Discount")
    {
      page_discount.style.color = '#409eff'
    }
    else if(path_url == "http://localhost:8080/Home_Page/Page_Hotlist")
    {
      page_hotlist.style.color = '#409eff'
    }
    else if(path_url == "http://localhost:8080/Home_Page/Page_Publishinghouse")
    {
      page_publishinghouse.style.color = '#409eff'
    }

    let log1 = document.getElementById('log1')
    let log2 = document.getElementById('log2')
    let name = document.getElementById('name')
    let username = this.$cookies.get('username')
    if(username!=null)
    {
      this.sure = 1
      name.innerHTML = username
      log2.innerHTML = ' [安全退出]'
      log1.style.display = 'none'
    }


  },

  methods:{
    signin(){
      if (this.sure == 1 )
      {
        let my_account = this.$router.resolve('/Home_Page/My_Account')
        window.open(my_account.href,'_blank')
      }
      else{
        this.$router.push('/Login/Signin')
      }

    },
    signup(){
      if (this.sure ==1)
      {
        this.$cookies.remove('userid')
        this.$cookies.remove('username')
        this.reload()
        this.$router.push('/Home_Page/Page_Home')
        this.sure = 0
      }
      else{
        this.$router.push('/Login/Signup')
      }

    },

    handleCommand(command){
      this.$cookies.set('type',command)
      let type_page = this.$router.resolve('/Home_Page/Page_Type')
      window.open(type_page.href,'_blank')
    },

    search(){

      if(this.select =='' || this.select == 'all' )
      {
        this.$cookies.set('type','all')
        this.$cookies.set('search',this.input)
      }
      else
      {
        this.$cookies.set('type',this.select)
        this.$cookies.set('search',this.input)
      }

      let search_page = this.$router.resolve('/Home_Page/Page_Search')
      window.open(search_page.href,'_blank')

    },

    shopping_cart(){
      if(this.sure != 1)
      {
        this.$message({
          showClose:true,
          message:"请先登录账号！",
          type:'warning'
        })
      }
      else if(this.sure == 1)
      {
        let shopping_cart = this.$router.resolve('/Home_Page/Shopping_Cart')
        window.open(shopping_cart.href,'_blank')
      }
    },

    my_order(){
      if(this.sure != 1)
      {
        this.$message({
          showClose:true,
          message:"请先登录账号！",
          type:'warning'
        })
      }
      else if(this.sure == 1)
      {
        let my_order = this.$router.resolve('/Home_Page/My_Order')
        window.open(my_order.href,'_blank')
      }
    },

    my_account(){
      if(this.sure != 1)
      {
        this.$message({
          showClose:true,
          message:"请先登录账号！",
          type:'warning'
        })
      }
      else if(this.sure == 1)
      {
        let my_account = this.$router.resolve('/Home_Page/My_Account')
        window.open(my_account.href,'_blank')
      }
    }


  }

}
</script>