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
    <el-form-item label="图片" ref="registerRef" prop="images">
      <el-upload
        class="upload-demo"
        action="string"
        :multiple="false"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :http-request="httprequest"
        :file-list="ruleForm.images"
        list-type="picture"
        accept=".png, .jpg"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
      </el-upload>
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
    {{ruleForm}}
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
        images: [
          {
            required: true,
            message: "只能上传jpg/png文件，且不超过5M",
            trigger: "blur"
          }
        ]
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
    beforeUpload(file) {
      var _flag = isMatchFileSize(file, this.fileLimitSize);
      if (!_flag) return _flag;

      _flag = isMatchUploaded(file, this.ruleForm.images);
      if (!_flag) return _flag;

      return true;
    },
    async uploadSuccess(response, file, fileList) {},
    async handleRemove(file, fileList) {
      if (file.status != "success") return false;

      var result = await removeFile(file, this.ruleForm.images);
      if (result.code == 0) {
        var _index = getIndex(file, this.ruleForm.images);
        this.ruleForm.images.splice(_index, 1);
      }
    },
    handlePreview(file) {
    },
    async httprequest(uploader) {
      const result = await uploadFile(uploader,"COURSE_MODULE_DETAILS");
      if (result.code == 0) {
        this.ruleForm.images.push({
          name: uploader.file.name,
          newname: result.data.name,
          url:result.data.url
        });
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
      var _images = [];
      this.ruleForm.images.forEach(item => {
        _images.push(item.newname);
      });

      await this.modifyCourseModuleDetails({
        id: this.ruleForm.id,
        courseId: this.ruleForm.courseId,
        courseName: this.ruleForm.courseName,
        name: this.ruleForm.name,
        desc: this.ruleForm.desc,
        images: JSON.stringify(_images),
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
