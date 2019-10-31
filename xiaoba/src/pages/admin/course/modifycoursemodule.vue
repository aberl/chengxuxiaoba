<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="所属课程" prop="course">
      <el-select @change="courseSelected" v-model="ruleForm.courseId" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="模块名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="图片" prop="aliImageUrlsStr">
      <el-input v-model="ruleForm.aliImageUrlsStr"></el-input>
    </el-form-item>
    <el-form-item label="模块描述" prop="desc">
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
import {
  uploadFile,
  isMatchFileSize,
  isMatchUploaded,
  removeFile,
  getIndex
} from "../../../VueAPI/File/uploadFile";
export default {
  mounted() {
    if (this.$route.query.id) {
      this.getAllEffectCourseList();
      this.getCourseModuleDetails(this.$route.query.id);
    } else this.$router.replace("/op/modulelist");
  },
  computed: {
    ...mapState({
      ruleForm: state => state.course.courseModuleDetails,
      modifyResult: state => state.course.result,
      options: state => {
        state.course.courseList;
        var _options = [];
        for (var index in state.course.courseList) {
          _options.push({
            value: state.course.courseList[index].id,
            label: state.course.courseList[index].name
          });
        }
        return _options;
      }
    })
  },
  data() {
    return {
      fileLimitSize: 5,
      fileUploadPercent: 0,
      rules: {
        courseId: [
          { required: true, message: "请选择课程", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入模块名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请填写描述", trigger: "blur" }],
        aliImageUrlsStr: [{ required: true, message: "请输入图片url地址", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions([
      "getAllEffectCourseList",
      "getCourseModuleDetails",
      "modifyCourseModuleDetails"
    ]),
    courseSelected(val) {
      for (var index in this.options) {
        if (this.options[index].value != val) continue;

        this.ruleForm.courseName = this.options[index].label;
      }
    },
    async submitForm(formName) {
      var flag = true;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          flag = false;
        }
      });
      if (!flag) return false;
      await this.modifyCourseModuleDetails({
        id: this.ruleForm.id,
        courseId: this.ruleForm.courseId,
        courseName: this.ruleForm.courseName,
        name: this.ruleForm.name,
        desc: this.ruleForm.desc,
        aliImgUrls: this.ruleForm.aliImageUrlsStr,
        status: this.ruleForm.status
      });

      if (eval(this.modifyResult.data)) {
        this.$router.replace("/op/modulelist");
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
</style>
