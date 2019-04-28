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
    <el-form-item label="图片" ref="registerRef" prop="images">
      <el-upload
        class="upload-demo"
        action="string"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :http-request="httprequest"
        :file-list="ruleForm.images"
        accept=".jpg, .png"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
      </el-upload>
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
      <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
    {{this.ruleForm}}
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { reqUploadFile, reqRemoveUploadFile, reqAddCourse } from "../../../api";
export default {
  mounted() {
    this.getCourseDetails(this.$route.query.id);
  },
  computed: {
    ...mapState({
      ruleForm: state => state.course.courseDetails
    })
  },
  data() {
    return {
      removeImages: [],
      addImages: [],
      fileLimitSize: 5,
      fileUploadPercent: 0,
      rules: {
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
    ...mapActions(["getCourseDetails","modifyCourseDetails"]),
    beforeUpload(file) {
      if (file.size / 1024 / 1024 > this.fileLimitSize) {
        this.$message.error(
          "只能上传jpg/png文件，且不超过" + this.fileLimitSize + "M"
        );
        return false;
      }

      let _existIndex = -1;

  for (var _index in this.ruleForm.images) {
        if (this.ruleForm.images[_index].name == file.name) {
         _existIndex = _index;
          break;
        }
      }
 if (_existIndex != -1) {
        this.$message.error(file.name + "已上传");
        return false;
      }
      return true;
    },
    uploadProgress(file) {},
    uploadSuccess(response, file, fileList) {},
    async handleRemove(file, fileList) {
      if (file.status != "success") return false;
      let fileUid = file.uid;

      for (var _index in this.ruleForm.images) {
        if (this.ruleForm.images[_index].name == file.name) {
          this.ruleForm.images.splice(_index, 1);
        }
      }
    },
    handlePreview(file) {
      console.log(file);
    },
    async httprequest(uploader) {
      let imageFile = uploader.file;
      this.ruleForm.images.push({ name: imageFile.name, url: "", isNew:false, file: imageFile });
    },
    async submitForm(formName) {
      var flag = true;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          flag = false;
        }
      });
      if (!flag) return false;

      this.modifyCourseDetails(this.ruleForm);
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
</style>
