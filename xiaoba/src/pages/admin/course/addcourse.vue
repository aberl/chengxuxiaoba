<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="图片" prop="aliImgUrls">
      <el-input v-model="ruleForm.aliImgUrls"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-radio-group v-model="ruleForm.status">
        <el-radio class="radio" label="1">激活</el-radio>
        <el-radio class="radio" label="-1">注销</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {
  uploadFile,
  isMatchFileSize,
  isMatchUploaded,
  removeFile,
  getIndex
} from "../../../VueAPI/File/uploadFile";
export default {
   computed: {
    ...mapState({
      addResult: state => state.course.result
    })
  },
  data() {
    return {
      fileLimitSize: 5,
      fileUploadPercent: 0,
      ruleForm: {
        name: "",
        desc: "",
        status: "1",
        aliImgUrls: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请填写描述", trigger: "blur" }],
        aliImgUrls: [{ required: true, message: "请输入图片url地址", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions(["addCourse"]),

    async submitForm(formName) {
      var flag = true;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          flag = false;
        }
      });
      if (!flag) return false;

      // var _images = [];
      // this.ruleForm.images.forEach(item => {
      //   _images.push(item.newname);
      // });

      // this.ruleForm.images = JSON.stringify(_images);
      await this.addCourse(this.ruleForm);

      if(eval(this.addResult.data)){
       this.$router.replace("/op/courselist");
      }
    },
    resetForm(formName) {
      this.ruleForm.name="";
      this.ruleForm.desc="";
      this.ruleForm.status="1"
    }
  }
};
</script>

<style>
</style>
