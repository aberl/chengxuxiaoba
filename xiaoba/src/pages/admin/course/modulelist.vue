<template>
  <div>
    <el-table :data="tableData" style="width: 100%" @row-click="getDetails">
      <el-table-column fixed prop="name" label="名称"></el-table-column>
      <el-table-column fixed prop="course" label="所属课程"></el-table-column>
      <el-table-column prop="createdatetime" label="创建时间"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template>
          <el-button @click.native.prevent="setDisable(1)" type="text" size="small">注销</el-button>
          <el-button @click.native.prevent="edit()" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
    <el-form-item label="所属课程" prop="course">
        <el-select v-model="rowSelected.course" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-form-item>
        <el-form-item label="模块名称" prop="name">
          <el-input v-model="rowSelected.name"></el-input>
        </el-form-item>
        <el-form-item label="模块描述" prop="desc">
          <el-input type="textarea" v-model="rowSelected.desc"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio class="radio" label="active">激活</el-radio>
            <el-radio class="radio" label="disable">注销</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="cancelEdit">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import headerTop from "../../../components/Admin/Header/adminHeader.vue";
import footerGuide from "../../../components/Footer/footer.vue";
import leftNavi from "../../../components/Admin/Navi/adminLeftNavi.vue";

export default {
  inject: ['reload'],
  methods: {
    getDetails(row){
     this.rowSelected.name=row.name;
     this.rowSelected.createdatetime=row.createdatetime;
     this.rowSelected.status=row.status;
     this.rowSelected.desc=row.desc;
     console.log(this.rowSelected);
    },
    setDisable(modelId) {},
    edit() {
      this.dialogFormVisible = true;
    },
    cancelEdit() {
      this.dialogFormVisible = false;
    },
    submitForm(){
      this.reload()
      }
  },
  data() {
    return { options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      dialogFormVisible: false,
      ruleForm: {
        course:"",
        name: "",
        desc: "",
        status: "active"
      },
      rules: {
        course:[{ required: true, message: "请选择课程", trigger: "blur" }],
        name: [
          { required: true, message: "请输入模块名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请填写描述", trigger: "blur" }]
      },
      rowSelected:{
        course:"",
        name: "",
        createdatetime: "",
        desc: "",
        status: ""
      }
      ,
      tableData: [
        {
          createdatetime: "2016-05-03",
          name: "JAVA",
          course:"JAVA",
          status: "正常",
          desc:"JAVA"
        },
        {
          createdatetime: "2016-05-03",
          name: "数据库",
          course:"数据库",
          status: "正常",
          desc:"数据库"
        },
        {
          createdatetime: "2016-05-03",
          name: "前端",
          course:"前端",
          status: "正常",
          desc:"JA前端A"
        },
        {
          createdatetime: "2016-05-03",
          name: "开发工具",
          course:"开发工具",
          status: "正常",
          desc:"开发工具"
        },
        {
          createdatetime: "2016-05-03",
          name: "大数据",
          course:"大数据",
          status: "正常",
          desc:"大数据"
        }
      ]
    };
  },
  components: {
    headerTop,
    footerGuide,
    leftNavi
  }
};
</script>

<style>
.el-main {
  text-align: center;
}

.el-table {
  height: 100%;
}

.el-table-column {
  width: 25%;
}
</style>
