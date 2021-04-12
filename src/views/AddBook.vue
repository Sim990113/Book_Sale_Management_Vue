<template>
  <div class="addbookData">
    <el-form :model="addbookForm" :rules="books" ref="addbookForm" label-width="100px" class="addbookForm">
      <el-row>
        <el-col :span="6">
          <el-form-item label="图书名称" prop="book_name" required >
            <el-input  v-model="addbookForm.book_name"  class="otrow"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="图书作者" prop="book_author" required >
            <el-input  v-model="addbookForm.book_author"  class="otrow"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="图书类别" prop="book_type" required>
            <el-select v-model="addbookForm.book_type" placeholder="请选择图书类别"  class="otrow">
              <el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="页数" prop="pages" required>
            <el-input  v-model="addbookForm.pages"  class="otrow" type="number" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="价格" prop="price" required>
            <el-input  v-model="addbookForm.price"  class="otrow" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="译者" prop="translator">
            <el-input  v-model="addbookForm.translator" class="otrow"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="9">
          <el-form-item label="出版时间" required>
            <el-form-item prop="publish_date">
              <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="addbookForm.publish_date" style="width: auto"></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="出版社" prop="publishing_house">
            <el-input  v-model="addbookForm.publishing_house"  class="thirdrow"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-form-item label="内容简介" prop="brief_introduction">
        <el-input class="text" type="textarea" style="width: 860px" v-model="addbookForm.brief_introduction"></el-input>
      </el-form-item>
      <el-form-item label="作者简介" prop="author_introduction">
        <el-input class="text" type="textarea" style="width: 860px" v-model="addbookForm.author_introduction"></el-input>
      </el-form-item>
      <el-form-item style="position: relative;left: 20px" label="上传封面" :label-width="imgLabelWidth" required>
        <el-upload
          v-model="addbookForm.img_url"
          ref="upload"
          action="#"
          accept="image/png,image/gif,image/jpg,image/jpeg"
          list-type="picture-card"
          :limit=limitNum
          :auto-upload="false"
          :on-exceed="handleExceed"
          :on-change="handleBeforeUpload"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item>
        <el-button style="position:absolute; left:300px" type="primary" @click="submitForm('addbookForm')">立即添加</el-button>
        <el-button style="position:absolute; left:400px" @click="resetForm('addbookForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addbookForm: {
        book_name: '',
        book_author: '',
        book_type: '',
        publish_date: '',
        publishing_house: '',
        translator:'',
        pages:'',
        price:'',
        sale_price:'',
        author_introduction:'',
        brief_introduction:'',
        img_url:'',


      },
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


      ],

      books: {
        book_name: [
          { required: true, message: '请输入图书名称', trigger: 'blur' }
        ],
        book_author: [
          { required: true, message: '请输入图书作者', trigger: 'blur' }
        ],
        book_type: [
          { required: true, message: '请选择图书类型', trigger: 'change' }
        ],
        publish_date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        pages:[
          { required: true,message:'请输入页数',trigger:'blur'}
        ],
        price:[
          { required: true,message:'请输入图书价格',trigger:'blur'}
        ],
        img_url: [
          {required:true,message:'请上传图书封面',trigger:'blur'}
        ]
      },
      dialogImageUrl:'',
      dialogVisible:false,
      imgLabelWidth:'80px',
      limitNum:1,


    };
  },
  methods: {
    //提交表
    submitForm(formName) {
      const _this = this
      _this.addbookForm.sale_price = _this.addbookForm.price * 0.8
      console.log(_this.addbookForm)
      if (this.addbookForm.img_url==''){
        const h = this.$createElement;
        this.$notify({
          title: '提示',
          message: h('i', { style: 'color: red'}, '请上传图书封面图片！')
        });
      }
      else{
        this.$refs[formName].validate((valid) => {
          if (valid) {

            axios.post('http://localhost:8181/book/addbook',this.addbookForm).then(function(resp){
                let name = _this.addbookForm.book_name
                if(resp.data=="success"){
                  _this.$message({
                    showClose:true,
                    message:'《'+name+'》添加成功！',
                    type:'success'

                  })
                  _this.$refs.upload.clearFiles()
                  _this.$refs[formName].resetFields()
                }
            })


          } else {
            _this.$message({
              showClose:true,
              message:'添加失败',
              type:'error'
            });
            return false;
          }
        });
      }

    },
    //重置表
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 上传文件之前
    handleBeforeUpload(file){
      if(!(file.name.endsWith('.png')|| file.name.endsWith('.gif') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg'))){
        this.$notify.warning({
          title:'警告',
          message:'请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
        })
      }
      let size = file.size / 1024 / 1024 / 2
      if(size>2){
        this.$notify.warning({
          title:'警告',
          message:'图片大小必须小于2M'
        })
      }
      this.addbookForm.img_url = file.name;
    },

    // 文件超出个数限制时
    handleExceed(files,fileList){
      this.$notify.warning({
        title:'警告',
        message:"只能选择1个文件，当前共选择了2个"
      });
    },
    //文件列表移除文件
    handleRemove(file,fileList){
    },

    //点击文件列表中已经上传的文件时
    handlePictureCardPreview(file){
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }

  }
}
</script>

<style scoped>

</style>