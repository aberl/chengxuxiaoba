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
        accept="*"
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
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
    {{uploadImages}}
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { reqUploadFile, reqRemoveUploadFile, reqAddCourse } from "../../../api";
export default {
  computed: {
    ...mapState({
      uploadResult: state => state.file.currentUploadResult,
      uploadImages: state => state.file.uploadFiles
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
        images: []
      },
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
    ...mapActions(["uploadFile", "removeFile"]),
    beforeUpload(file) {
      if (file.size / 1024 / 1024 < this.fileLimitSize) {
        this.$message.error(
          "只能上传jpg/png文件，且不超过" + this.fileLimitSize + "M"
        );
        return false;
      }

      var isExistSameFile = false;
      for (var index in this.uploadImages) {
        console.log(this.uploadImages[index].originname+"|"+file.name);
        if (this.uploadImages[index].originname == file.name) {
          this.$message.error(file.name + "已上传");
          return false;
        }
      }

      return true;
    },
    uploadSuccess(response, file, fileList) {},
    async handleRemove(file, fileList) {
      
      if (file.status != "success") return false;

      this.removeFile(file);
    },
    handlePreview(file) {
      console.log(file);
    },
    async httprequest(uploader) {
     await this.uploadFile(uploader);
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

      const result = await reqAddCourse(
        this.ruleForm.name,
        this.ruleForm.desc,
        JSON.stringify(_images),
        this.ruleForm.status
      );

      if (result.code == 0) {
        this.$router.replace("/op/courselist");
      }
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
</style>
