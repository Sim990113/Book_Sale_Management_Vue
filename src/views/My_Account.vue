<template>
  <div class="accountData">
    <el-form :model="accountForm" ref="accountForm" label-width="100px" class="accountForm">
      <el-form-item label="用户ID" prop="userid" required >
        <el-input  v-model="accountForm.userid" style="width: 19%" readOnly></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="姓名" prop="user_name" required>
            <el-input  v-model="accountForm.user_name"  class="otrow" readOnly></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="user_password" required >
            <el-input  v-model="accountForm.user_password"  class="otrow"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="user_gender" required>
            <el-select v-model="accountForm.user_gender" :placeholder="accountForm.user_gender"  class="otrow">
              <el-option v-for="item in gender" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="身份证号" prop="idnum" required>
            <el-input  v-model="accountForm.idnum"  class="otrow" type="number" ></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-form-item>
        <el-button style="position:absolute; left:0px" type="primary" @click="changeForm('accountForm')">修改</el-button>
        <el-button style="position:absolute; left:100px" @click="resetForm('accountForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accountForm: {
        userid:null,
        user_name:'',
        user_password:'',
        user_gender:'',
        idnum:'',
      },
      gender:[
        {label:'男',value:'男'},
        {label:'女',value:'女'},
      ],

    };
  },
  methods: {
    //提交表
    changeForm(formName) {
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put('http://localhost:8181/user/update',_this.accountForm).then(function(resp){
            if(resp.data=="success"){
              _this.$alert('修改成功!','提示',{
                confirmButtonText:'确定',
                type:'success',
                callback:action => {
                  _this.$router.push('/Home_Page/Page_Home')
                }
              })
            }
          })


        } else {
          _this.$message({
            showClose:true,
            message:'修改失败',
            type:'error'
          });
          return false;
        }
      });
    },
    //重置表
    resetForm(formName) {
      const _this = this
      _this.$refs[formName].resetFields();
      window.location.reload()
    },

  },

  mounted(){
    const _this = this
    axios.get('http://localhost:8181/user/findById/'+this.$cookies.get('userid') ).then(function (resp){
      _this.accountForm = resp.data
    })
  }
}
</script>

<style scoped>
.accountData{
  position: relative;
  width: 1270px;
  left: 610px;
}
</style>