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
    <el-form-item label="资料文件" ref="registerRef" prop="file">
      <el-upload
        class="upload-demo"
        action="string"
        :multiple="false"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :http-request="httprequest"
        list-type="picture"
        accept=".png, .jpg"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item label="描述" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
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
      addResult: state => state.material.result
    })
  },
  data() {
    return {
      fileLimitSize: 5,
      fileUploadPercent: 0,
      ruleForm: {
        name: "",
        desc: "",
        file: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入材料名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请填写描述", trigger: "blur" }],
        file: [
          {
            required: true,
            message: "上传材料",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["addMaterial"]),
    beforeUpload(file) {
      if (this.ruleForm.file) {
        this.$message.error("材料已上传，请删除后再上传");
        return false;
      }

      return true;
    },
    async uploadSuccess(response, file, fileList) {},
    async handleRemove(file, fileList) {
      if (file.status != "success") return false;

      var fileList = [];
      fileList.push(this.ruleForm.file);
      var result = await removeFile(file, fileList);
      if (result.code == 0) {
        this.ruleForm.file = "";
      }
    },
    handlePreview(file) {
      console.log(file);
    },
    async httprequest(uploader) {
      const result = await uploadFile(uploader, "MATERIAL_DOWNLOAD");
      if (result.code == 0) {
        this.ruleForm.file = {
          name: uploader.file.name,
          newname: result.data.name
        };
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
        
      this.ruleForm.file=this.ruleForm.file.newname;
      await this.addMaterial(this.ruleForm);

      if (eval(this.addResult.data)) {
        this.$router.replace("/op/materiallist");
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
