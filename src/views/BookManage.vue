<template >
  <div class="bookData">
      <div style="height: 40px ;position: relative;inset-inline: auto;">
        <el-input
            style="width: 370px;position:absolute;top: 7px"
            size="small"
            v-model="search"
            placeholder="书名/作者"
            prefix-icon="el-icon-search"/>
        <el-select v-model="type" @change="classifiction" clearable placeholder="图书类别" size="small" style="width: 150px;position:absolute;top:7px;left: 370px">
          <el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button size="small" style="width:80px; position: absolute;top: 7px;left: 522px " type="primary" round @click="addbook">添加图书</el-button>
      </div>

    <el-table
        class="bookTable"
        :data="tables"
        border
        stripe
        style="width: 100%">
      <el-table-column
          sortable
          prop="book_id"
          label="Id"
          width="70">
      </el-table-column>
      <el-table-column
          prop="book_name"
          label="书名"
          width="150">
      </el-table-column>
      <el-table-column
          prop="book_type"
          width="150"
          label="图书类别"
          :show-overflow-tooltip="true"
          >

      </el-table-column>
      <el-table-column
          prop="book_author"
          label="作者"
          width="150">
      </el-table-column>
      <el-table-column
          prop="publishing_house"
          label="出版社"
          width="200">
      </el-table-column>
      <el-table-column
          prop="translator"
          label="译者"
          width="100">
      </el-table-column>
      <el-table-column
          prop="publish_date"
          label="出版时间"
          width="100">
      </el-table-column>
      <el-table-column
          prop="pages"
          label="页数"
          width="60">
      </el-table-column>
      <el-table-column
          prop="price"
          label="价格"
          width="50">
      </el-table-column>
      <el-table-column
        prop="sale_price"
        label="优惠价格"
        width="100">
      </el-table-column>
      <el-table-column
          prop="brief_introduction"
          label="内容简介"
          width="500" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
          prop="author_introduction"
          label="作者简介"
          width="400" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
          prop="img_url"
          label="封面"
          width="160">
        <template slot-scope="scope">
          <img height="204" width="152" :src="require('@/assets/images/' + scope.row.img_url)"></img>
        </template>

      </el-table-column>
      <el-table-column width="112" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="editbook(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle  @click="deletebook(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-pagination
        @current-change="page"
        layout="total, prev, pager, next, jumper"
        :total="totalpage"
        :hidden="value">
    </el-pagination>
  </div>

</template>

<script>
export default {
  methods: {
    // “添加”按钮转到添加图书界面
    addbook(){
      this.$router.push('/Book/AddBook')
    },
    // 分页函数
    page(currentPage){
      const _this = this
      axios.get('http://localhost:8181/book/findBooks/'+currentPage+'/10').then(function (resp){
        _this.tableData = resp.data.content
        _this.totalpage = resp.data.totalElements
      })
    },
    classifiction(value){
      this.com = value
    },
    editbook(row){
      this.$router.push({
          path:'/Book/UpdateBook',
          query:{
            id:row.book_id
          }
      })
    },

    deletebook(row){
      const _this = this
      let book_name = row.book_name
      axios.delete('http://localhost:8181/book/deleteById/'+row.book_id).then(function (resp){

        _this.$alert('《'+book_name+'》删除成功!','提示',{
          confirmButtonText:'确定',
            type:'success',
          callback:action => {
            window.location.reload()
          }
        })


      })
    }

  },

  created(){
    const _this = this
    axios.get('http://localhost:8181/book/findBooks/1/10').then(function (resp){
        _this.tableData = resp.data.content
        _this.totalpage = resp.data.totalElements
    })
    axios.get('http://localhost:8181/book/findBooks').then(function (resp){
      _this.totalData = resp.data
    })
  },

  data() {
    return {
      totalpage: null,
      tableData: null,
      totalData: null,
      value: false,
      search: '',
      com:'',
      type:'',
      classify:[
        {label:'A 马克思主义、列宁主义、毛泽东思想、邓小平理论',value:'A 马克思主义、列宁主义、毛泽东思想、邓小平理论'},
        {label:'B 哲学、宗教',value:'B 哲学、宗教'},
        {label:'C 社会科学总论',value:'C 社会科学总论'},
        {label:'D 政治、法律',value:'D 政治、法律'},
        {label:'E 军事',value:'E 军事'},
        {label:'F 经济',value:'F 经济'},
        {label:'G 文化、科学、教育、体育',value:'G 文化、科学、教育、体育'},
        {label:'H 语言、文字',value:'H 语言、文'},
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
  computed:{
    // 模糊搜索
    tables (){
      const search = this.search
      const com = this.com
      if (search!="") {
        if(com==''){
          //搜索的时候关闭下方分页
          this.value=true
          return this.totalData.filter(data =>
              data.book_author.toLowerCase().includes(search)||data.book_name.toLowerCase().includes(search))
        }
        else{
          this.value=true
          return this.totalData.filter(data =>
              (data.book_author.toLowerCase().includes(search)||data.book_name.toLowerCase().includes(search) )&& data.book_type.includes(com))
        }



      }
      else if(search==''&&com!=''){

        this.value=true
        return this.totalData.filter(data =>
            data.book_type.includes(com))

      }
      else {
        //不搜索的时候，显示分页
        this.value=false
        return this.tableData
      }
    }
  }
}
</script>