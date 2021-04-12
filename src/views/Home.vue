<template>

      <el-container style="bottom: 0px; border: transparent">
        <el-header style="height: 90px;background-color: white">

          <el-col style="background-color:#f2f2f2;height:20px;">
            <label style = "position: relative;font-size: medium;font-family: 锐字云字库隶书GB;top: -20px;">欢迎光临久久图书网  管理员 </label>
            <label id="manager_name" style="position:relative;color: #409eff;top: -20px;font-size: medium;font-family: 锐字云字库隶书GB;"></label>
            <label style="position:relative;cursor: pointer;color: #409eff;top: -20px;font-size: medium;font-family: 锐字云字库隶书GB;" @click="logout"> [安全退出]</label>
          </el-col>
          <img style="width: 70px;height: 70px" :src="require('@/assets/images/logo_transport.png')"/>
        </el-header>
        <el-container>
          <el-aside width="200px"  class="aside">
            <el-menu router>
              <!--       这里的index是防止打开1个导航时2个导航都打开，因为默认的时候是两个导航index是一样的，下面的操作是给他们分配不一样的index(因为index是字符串，不是int，所以后面要加一个'')-->
              <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''" :key="index" v-if="item.path=='/Book'">

                <template slot="title">{{item.name}}</template>
                <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path" :key="index2"
                              :class="$route.path==item2.path?'is-active':''" v-if="item2.show">{{item2.name}}
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>

          <el-main>
            <router-view></router-view>
          </el-main>

        </el-container>
      </el-container>

</template>
<script>
export default {
  data(){
    return{

    }
  },
  mounted(){
    let _this = this
    let manager_name = document.getElementById('manager_name')
    let name = _this.$cookies.get('managername')
    manager_name.innerHTML = name
  },
  methods:{
    logout(){
      const _this = this
      this.$cookies.remove('managerid')
      this.$cookies.remove('managername')
      this.$router.push('/Login/Manager_Signin')
    }
  }
}
</script>

