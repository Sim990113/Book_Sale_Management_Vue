<template>

  <div>
    <el-link :underline="false" href="/Login/Signin"><< 用户通道</el-link>
      <el-form :model="LoginForm" :rules="managers" ref="LoginForm" label-width="100px" class="LoginForm" >
        <el-row>
          <div style="background-color:#409eff;width:4px;height: 30px;left: 10%;top: 91px;position: relative;"></div>
          <label style="width: 20px;height: 20px;border-left: #409eff; position: relative;left: 12%;top: 60px;font-family: 'Adobe 黑体 Std R';font-weight: bold;font-size: 24px">管理员登录</label>
        </el-row>
      <br><br><br><br>
        <el-row class="Logincontent">
          <el-form-item label="用户名:" prop="manager_id" required >
            <el-input  v-model.number="LoginForm.manager_id"  class="logrow" placeholder="用户名"></el-input>
          </el-form-item>
        </el-row>

        <el-row class="Logincontent">
            <el-form-item label="密码:" prop="manager_password" required >
              <el-input  v-model="LoginForm.manager_password"  type = 'password' class="logrow" placeholder="密码"></el-input>
            </el-form-item>
        </el-row>

        <el-row class="Logincontent">
          <el-col :span="6">
            <el-form-item label="验证码:" prop="captcha_key" required>
              <el-input v-model="LoginForm.captcha_key" style="width: 200px" placeholder="验证码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <span class="s-canvas" @click="changeCode">
              <canvas id="s-canvas" style="position: relative; left:40% "  :width="contentWidth" :height="contentHeight"></canvas>
            </span>
          </el-col>
        </el-row>
        <br><br><br>
        <el-form-item class="Logincontent">
          <el-button style="position:absolute; width: 400px;height: 50px; background-color: #409eff" type="primary" @click="submitForm('LoginForm')">登录</el-button>
        </el-form-item>
        <br><br><br><br><br>
        <label style="position:relative;left: 15% ;cursor: pointer;" @click="forget">忘记密码?</label>
        <label class="signup" style="position:relative;left: 60%;cursor: pointer;" @click="signup" >立即注册>></label>
      </el-form>

  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      identifyCode:"",
      key:'',
      LoginForm:{
        manager_id:null,
        manager_password:'',
        captcha_key:'',
      },
      managers:{
        manager_id:[
          {require:true, message:'请输入数字管理员Id',trigger:'blur',type:'number'}
        ],
        manager_password: [
          {require:true, message:'请输入密码',trigger:'blur'}
        ],
        captcha_key: [
          {require:true, message:'请输入正确的验证码',trigger:'blur'}
        ],
      },

    }
  },
  props: {
    identifyCodes: {
      //验证码从该字段中抽取生成
      type: String,
      default: "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    },
    fontSizeMin: {
      // 字体最小值
      type: Number,
      default: 25
    },
    fontSizeMax: {
      // 字体最大值
      type: Number,
      default: 35
    },
    backgroundColorMin: {
      // 验证码图片背景色最小值
      type: Number,
      default: 200
    },
    backgroundColorMax: {
      // 验证码图片背景色最大值
      type: Number,
      default: 220
    },
    dotColorMin: {
      // 背景干扰点最小值
      type: Number,
      default: 60
    },
    dotColorMax: {
      // 背景干扰点最大值
      type: Number,
      default: 120
    },
    contentWidth: {
      //容器宽度
      type: Number,
      default: 170
    },
    contentHeight: {
      //容器高度
      type: Number,
      default: 44
    }
  },
  watch: {
    identifyCode() {
      this.drawPic();
    },
  },
  mounted() {
    this.drawPic();
    this.makeCode(this.identifyCodes, 4);
  },
  methods:{
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 生成一个随机的颜色
    randomColor(min, max) {
      let r = this.randomNum(min, max);
      let g = this.randomNum(min, max);
      let b = this.randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    drawPic() {
      let canvas = document.getElementById("s-canvas");
      let ctx = canvas.getContext("2d");
      ctx.textBaseline = "bottom";
      // 绘制背景
      ctx.fillStyle = this.randomColor(
          this.backgroundColorMin,
          this.backgroundColorMax
      );
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
      // 绘制文字
      for (let i = 0; i < this.identifyCode.length; i++) {
        this.drawText(ctx, this.identifyCode[i], i);
      }
      this.drawLine(ctx);
      this.drawDot(ctx);
    },
    drawText(ctx, txt, i) {
      ctx.fillStyle = this.randomColor(50, 160); //随机生成字体颜色
      ctx.font =
          this.randomNum(this.fontSizeMin, this.fontSizeMax) + "px SimHei"; //随机生成字体大小
      let x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1));
      let y = this.randomNum(this.fontSizeMax, this.contentHeight - 5);
      var deg = this.randomNum(-30, 30);
      // 修改坐标原点和旋转角度
      ctx.translate(x, y);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.fillText(txt, 0, 0);
      // 恢复坐标原点和旋转角度
      ctx.rotate((-deg * Math.PI) / 180);
      ctx.translate(-x, -y);
    },
    drawLine(ctx) {
      // 绘制干扰线
      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = this.randomColor(100, 200);
        ctx.beginPath();
        ctx.moveTo(
            this.randomNum(0, this.contentWidth),
            this.randomNum(0, this.contentHeight)
        );
        ctx.lineTo(
            this.randomNum(0, this.contentWidth),
            this.randomNum(0, this.contentHeight)
        );
        ctx.stroke();
      }
    },
    drawDot(ctx) {
      // 绘制干扰点
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = this.randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(
            this.randomNum(0, this.contentWidth),
            this.randomNum(0, this.contentHeight),
            1,
            0,
            2 * Math.PI
        );
        ctx.fill();
      }
    },
    /*切换验证码start*/
    changeCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(e, n) {
      for (let i = 0; i < n; i++) {
        this.identifyCode += e[this.randomNum(0, e.length)];
      }
      this.$emit("update:changeCode", this.identifyCode);
    },
    /*切换验证码end*/
    submitForm(formName) {
      const _this = this
        if(typeof this.LoginForm.manager_id != 'number'){
          this.$notify({
            title:'提示',
            message: '请输入正确的管理员Id',
            type:'warning'
          })
        }
        else if(this.LoginForm.manager_id==''){
          this.$notify({
            title:'提示',
            message: '请填写管理员Id',
            type:'warning'
          })
        }
        else if(this.LoginForm.manager_password==''){
          this.$notify({
            title:'提示',
            message: '请填写密码',
            type:'warning'
          })
        }
        else{
          _this.$cookies.set('getmid',0)
          axios.get('http://localhost:8181/manager/findById/'+this.LoginForm.manager_id).then(function (resp){
            _this.$cookies.set('getmid',1)
           if(_this.LoginForm.manager_password != resp.data.manager_password)
              {
                console.log(resp)
                console.log(_this.LoginForm.manager_password)
                _this.$notify({
                  title:'提示',
                  message: '请填写正确的密码',
                  type:'warning'
                })
              }
            else if(_this.identifyCode.toLowerCase() != _this.LoginForm.captcha_key.toLowerCase())
            {
              _this.$notify({
                title:'提示',
                message: '验证码错误',
                type:'warning'
              })
            }
            else if(_this.LoginForm.manager_password == resp.data.manager_password && _this.identifyCode.toLowerCase() == _this.LoginForm.captcha_key.toLowerCase())
              {

                _this.$notify({
                  title:'提示',
                  message: '登录成功',
                  type:'success'
                })
                _this.$cookies.set('managerid',_this.LoginForm.manager_id)
                _this.$cookies.set('managername',resp.data.manager_name)
                console.log(_this.$cookies.get('managername'))
                _this.$router.push('/Book/BookManage')

              }
          })
          setTimeout(function () {
            if(_this.$cookies.get('getmid')==0)
            {
              _this.$notify({
                title:'提示',
                message: '没有此用户，请注册',
                type:'warning'
              })
            }
          },500);
        }
    },
    forget(){
      this.$router.push('/Login/Manager_Forget')
    },
    signup(){
      this.$router.push('/Login/Manager_Signup')
    },
  },

}
</script>
