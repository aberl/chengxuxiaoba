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
    <el-form-item label="图片" prop="aliImageUrlsStr">
      <el-input v-model="ruleForm.aliImageUrlsStr"></el-input>
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
      <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { reqUploadFile, reqRemoveUploadFile, reqAddCourse } from "../../../api";
import {
  uploadFile,
  isMatchFileSize,
  isMatchUploaded,
  removeFile,
  getIndex
} from "../../../VueAPI/File/uploadFile";
export default {
  mounted() {
    if (this.$route.query.id) this.getCourseDetails(this.$route.query.id);
    else this.$router.replace("/op/courselist");
  },
  computed: {
    ...mapState({
      ruleForm: state => state.course.courseDetails,
      modifyResult: state => state.course.result
    })
  },
  data() {
    return {
      fileLimitSize: 5,
      fileUploadPercent: 0,
      rules: {
        name: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请填写描述", trigger: "blur" }],
        aliImageUrlsStr: [{ required: true, message: "请输入图片url地址", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions(["getCourseDetails", "modifyCourseDetails"]),
   
    async submitForm(formName) {
      var flag = true;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          flag = false;
        }
      });
      if (!flag) return false;

      await this.modifyCourseDetails({
        id: this.ruleForm.id,
        name: this.ruleForm.name,
        desc: this.ruleForm.desc,
        aliImgUrls: this.ruleForm.aliImageUrlsStr,
        status: this.ruleForm.status
      });

      if (eval(this.modifyResult.data)) {
        this.$router.replace("/op/courselist");
      }
    },
    resetForm(formName) {
      this.ruleForm.name = "";
      this.ruleForm.desc = "";
      this.ruleForm.status = "1";
    }
  }
};
</script>

<style>
</style>
