<template>

  <el-container style="bottom: 0px; border: transparent">
    <el-header class="login_header" >
      <img class="logo" :src="require('@/assets/images/logo_transport.png')"/>
    </el-header>
    <el-container style="height: 825px; border: transparent">

      <el-main style="background-color: #f6f4f5;">
        <router-view></router-view>
        <label style="position:absolute;left: 40% ;bottom: 1%">Copyright © 2020 久久图书网. All Rights Reserved</label>
      </el-main>

    </el-container>
  </el-container>

</template>

<script>

</script>