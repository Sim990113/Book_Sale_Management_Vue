<template>
  <div>
    <el-form :model="ForgetForm" :rules="users" ref="ForgetForm" label-width="100px" class="ForgetForm" >
      <el-row>
        <div style="background-color:#409eff;width:4px;height: 30px;left: 10%;top: 91px;position: relative;"></div>
        <label style="width: 20px;height: 20px;border-left: #409eff; position: relative;left: 12%;top: 60px;font-family: 'Adobe 黑体 Std R';font-weight: bold;font-size: 24px">忘记密码</label>
        <label style="position:relative;left: 60% ;top: 60px;">想起账号了？</label>
        <label style="position:relative;left: 60% ;top: 60px;cursor: pointer;text-decoration:underline" @click="signin">请登录</label>
      </el-row>
      <br><br><br><br>
      <el-row class="ForgetContent">
        <el-form-item label="姓名:" prop="user_name" required >
          <el-input  v-model="ForgetForm.user_name"  class="signuprow" placeholder="姓名"></el-input>
        </el-form-item>
      </el-row>

      <el-row class="ForgetContent">
        <el-form-item label="身份证号:" prop="idnum" required >
          <el-input  v-model="ForgetForm.idnum" class="signuprow" placeholder="身份证号"></el-input>
        </el-form-item>
      </el-row>

      <el-row class="ForgetContent">
        <el-col :span="6">
          <el-form-item label="验证码:" prop="captcha_key" required>
            <el-input v-model="ForgetForm.captcha_key" style="width: 200px" placeholder="验证码"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
            <span class="s-canvas" @click="changeCode">
              <canvas id="s-canvas" style="position: relative; left:40% "  :width="contentWidth" :height="contentHeight"></canvas>
            </span>
        </el-col>
      </el-row>
      <br><br><br>
      <el-form-item class="ForgetContent">
        <el-button style="position:absolute; width: 400px;height: 50px; background-color: #409eff" type="primary" @click="submitForm('ForgetForm')">确认</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>

export default {
  name: "Forget",
  data(){
    return{
      identifyCode:"",
      ForgetForm:{
        captcha_key:'',
        userid:null,
        user_name:'',
        user_password:'',
        user_gender:'',
        idnum:''
      },
      users:{
        user_name:[
          {require:true, message:'请输入真实姓名',trigger:'blur'}
        ],
        idnum: [
          {require:true, message:'请输入正确的身份证号',trigger:'blur'}
        ]
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
  methods: {
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
    submitForm(formName) {
      const _this = this
      //判断用户是否输入了中文
      if(escape(this.ForgetForm.user_name).indexOf( "%u" )<0){
        this.$notify({
          title:'提示',
          message: '请输入正确的姓名',
          type:'warning'
        })
      }
      else if(this.ForgetForm.user_name==''){
        this.$notify({
          title:'提示',
          message: '请填写姓名',
          type:'warning'
        })
      }
      else if(this.ForgetForm.idnum==''){
        this.$notify({
          title:'提示',
          message: '请填写身份证号',
          type:'warning'
        })
      }
      else if(this.ForgetForm.captcha_key==''){
        this.$notify({
          title:'提示',
          message: '请填写验证码',
          type:'warning'
        })
      }
      else if(this.ForgetForm.idnum.length!=18){
        this.$notify({
          title:'提示',
          message: '请填写正确的身份证号',
          type:'warning'
        })
      }
      else if(_this.identifyCode.toLowerCase() != _this.ForgetForm.captcha_key.toLowerCase())
      {
        _this.$notify({
          title:'提示',
          message: '验证码错误',
          type:'warning'
        })
      }
      else if(_this.identifyCode.toLowerCase() == _this.ForgetForm.captcha_key.toLowerCase()){
        axios.get('http://localhost:8181/user/findByIdnum/'+this.ForgetForm.idnum).then(function (resp){
          if(resp.data != '' ){
            if(_this.ForgetForm.user_name == resp.data.user_name)
            {
              _this.ForgetForm.userid = resp.data.userid
              _this.ForgetForm.user_gender = resp.data.user_gender
              _this.ForgetForm.user_password = _this.ForgetForm.idnum.substr(12,18)
              axios.put('http://localhost:8181/user/forget',_this.ForgetForm).then(function (resp1){
                _this.$alert('重置成功，您的用户ID是 '+resp.data.userid+' ，您的重置密码是身份证后六位 '+_this.ForgetForm.user_password+' 请您牢记','提示',{
                  confirmButtonText:'确定',
                  type:'success',
                  callback:action => {
                    _this.$router.push('/Login/Signin')
                  }
                })
              })
            }
            else
            {
              _this.$notify({
                title:'提示',
                message: '用户姓名与身份证号不匹配',
                type:'warning'
              })
            }
          }
          else
          {
            _this.$notify({
              title:'提示',
              message: '用户不存在',
              type:'warning'
            })
          }
        })
      }
    },
    signin(){
      this.$router.push('/Login/Signin')
    }
  }
}
</script>