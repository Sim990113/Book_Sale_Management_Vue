import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BookManage from "@/views/BookManage";
import OrderManage from "@/views/OrderManage";
import AddBook from "@/views/AddBook";
import Signin from "@/views/Signin";
import Login from "@/views/Login";
import Signup from "@/views/Signup";
import Forget from "@/views/Forget"
import Home_Page from "@/views/Home_Page";
import Shopping_Cart from "@/views/Shopping_Cart";
import My_Order from "@/views/My_Order";
import My_Account from "@/views/My_Account";
import Page_Home from "@/views/Page_Home";
import Page_Discount from "@/views/Page_Discount";
import Page_Hotlist from "@/views/Page_Hotlist";
import Detail_Page from "@/views/Detail_Page";
import Page_Search from "@/views/Page_Search";
import Page_Type from "@/views/Page_Type";
import Manager_Signin from "@/views/Manager_Signin";
import Manager_Signup from "@/views/Manager_Signup";
import Manager_Forget from "@/views/Manager_Forget";
import UpdateBook from "@/views/UpdateBook";


Vue.use(VueRouter)

export const routes = [


    {
        path:"/Login",
        component:Login,
        name:"登录相关",
        children: [
            {
                path: "/Login/Signin",
                name:"登录",
                component: Signin,
            },
            {
                path: "/Login/Signup",
                name:"注册",
                component: Signup,
            },
            {
                path: "/Login/Forget",
                name:"忘记密码",
                component: Forget,
            },
            {
                path: "/Login/Manager_Signin",
                name:"管理员登录",
                component: Manager_Signin,
            },
            {
                path: "/Login/Manager_Signup",
                name:"管理员注册",
                component:Manager_Signup,
            },
            {
                path: "/Login/Manager_Forget",
                name:"管理员忘记密码",
                component: Manager_Forget,
            },
        ]
    },
    //用户界面
    {
        path:"/",
        component:Home_Page,
        name:"用户界面",
        redirect:"/Home_Page/Page_Home",
        children: [
            {
                path: "/Home_Page/Shopping_Cart",
                name:"购物车",
                component: Shopping_Cart,
            },
            {
                path: "/Home_Page/My_Order",
                name:"我的订单",
                component: My_Order,
            },
            {
                path: "/Home_Page/My_Account",
                name:"我的账户",
                component: My_Account,
            },
            {
                path: "/Home_Page/Page_Home",
                name:"首页",
                component: Page_Home,
            },
            {
                path: "/Home_Page/Page_Discount",
                name:"今日特惠",
                component: Page_Discount,
            },
            {
                path: "/Home_Page/Page_Hotlist",
                name:"热销榜",
                component: Page_Hotlist,
            },
            {
                path: "/Home_Page/Detail_Page",
                name:"详情页",
                component: Detail_Page,

            },
            {
                path: "/Home_Page/Page_Search",
                name:"搜索页",
                component: Page_Search,
            },
            {
                path: "/Home_Page/Page_Type",
                name:"分类页",
                component: Page_Type,
            },

        ]
    },
    // 图书页面

    {
      path:"/Book",
      name:"图书管理",
      component:Home,
      children:[
          {
              path:"/Book/BookManage",
              name:"查看图书",
              show:true,
              component:BookManage
          },
          {
              path:"/Book/AddBook",
              name:"添加图书",
              show:true,
              component: AddBook
          },
          {
              path:"/Book/UpdateBook",
              name:"更新图书",
              show:false,
              component: UpdateBook
          }
      ]
    },
    {
        path:"/Book",
        name:"内容管理",
        component:Home,
        children: [
            {
                path:"/Book/OrderManage",
                name:"订单管理",
                show:true,
                component:OrderManage
            },
        ]
    },

]

const router = new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes
})

export default router
