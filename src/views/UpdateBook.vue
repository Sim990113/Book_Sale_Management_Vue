<template>
  <div class="updatebookData">
    <el-form :model="updatebookForm" :rules="books" ref="updatebookForm" label-width="100px" class="updatebookForm">
      <el-form-item label="图书ID" prop="book_id" required >
        <el-input  v-model="updatebookForm.book_id" style="width: 30%" readOnly></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="图书名称" prop="book_name" required >
            <el-input  v-model="updatebookForm.book_name"  class="otrow"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="图书作者" prop="book_author" required >
            <el-input  v-model="updatebookForm.book_author"  class="otrow"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="图书类别" prop="book_type" required>
            <el-select v-model="updatebookForm.book_type" placeholder="请选择图书类别"  class="otrow">
              <el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="页数" prop="pages" required>
            <el-input  v-model="updatebookForm.pages"  class="otrow" type="number" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="价格" prop="price" required>
            <el-input  v-model="updatebookForm.price"  class="otrow" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="折扣价" prop="sale_price" required>
            <el-input  v-model="updatebookForm.sale_price"  class="otrow" type="number" ></el-input>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="出版时间" required>
            <el-form-item prop="publish_date">
              <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="updatebookForm.publish_date" style="width: auto"></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="译者" prop="translator">
            <el-input  v-model="updatebookForm.translator" class="otrow"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="出版社" prop="publishing_house">
            <el-input  v-model="updatebookForm.publishing_house"  class="thirdrow"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-form-item label="内容简介" prop="brief_introduction">
        <el-input class="text" type="textarea" style="width: 860px" v-model="updatebookForm.brief_introduction"></el-input>
      </el-form-item>
      <el-form-item label="作者简介" prop="author_introduction">
        <el-input class="text" type="textarea" style="width: 860px" v-model="updatebookForm.author_introduction"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button style="position:absolute; left:300px" type="primary" @click="changeForm('updatebookForm')">修改</el-button>
        <el-button style="position:absolute; left:400px" @click="resetForm('updatebookForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updatebookForm: {
        book_id:'',
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

      },

    };
  },
  methods: {
    //提交表
    changeForm(formName) {
      const _this = this

        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.put('http://localhost:8181/book/update',this.updatebookForm).then(function(resp){
              let book_name = _this.updatebookForm.book_name

              if(resp.data=="success"){
                _this.$alert('《'+book_name+'》修改成功!','提示',{
                  confirmButtonText:'确定',
                  type:'success',
                  callback:action => {
                    _this.$router.push('/Book/BookManage')
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
      // }

    },
    //重置表
    resetForm(formName) {
      const _this = this
      _this.$refs[formName].resetFields();
      window.location.reload()
    },

  },

  created(){
    const _this = this
    axios.get('http://localhost:8181/book/findById/'+this.$route.query.id).then(function (resp){
          _this.updatebookForm = resp.data
    })
  }
}
</script>

<style scoped>

</style>