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
        :file-list="ruleForm.file"
        list-type="picture"
        accept="*"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input type="textarea" v-model="ruleForm.description"></el-input>
    </el-form-item>
    <el-form-item label="状态">
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
    if (this.$route.query.id) this.getMaterial(this.$route.query.id);
    else this.$router.replace("/op/materiallist");
  },
  computed: {
    ...mapState({
      ruleForm: state => state.material.material,
      modifyResult: state => state.material.result
    })
  },
  data() {
    return {
      fileLimitSize: 5,
      fileUploadPercent: 0,
      rules: {
        name: [
          { required: true, message: "请输入材料名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请填写描述", trigger: "blur" }
        ],
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
    ...mapActions(["getMaterial", "modifyMaterial"]),
    beforeUpload(file) {
      if (this.ruleForm.file && this.ruleForm.file.length > 0) {
        this.$message.error("材料已上传，请删除后再上传");
        return false;
      }

      return true;
    },
    async uploadSuccess(response, file, fileList) {},
    async handleRemove(file, fileList) {
      if (file.status != "success") return false;

      var fileList = this.ruleForm.file;
      var result = await removeFile(file, fileList);

      if (result.code == 0) {
        this.ruleForm.file = [];
      }
    },
    handlePreview(file) {
    },
    async httprequest(uploader) {
      const result = await uploadFile(uploader, "MATERIAL_DOWNLOAD");
      if (result.code == 0) {
        this.ruleForm.file = [
          {
            name: uploader.file.name,
            newname: result.data.name
          }
        ];
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

      await this.modifyMaterial(this.ruleForm);

      if (eval(this.modifyResult.data)) {
        this.$router.replace("/op/materiallist");
      }
    }
  }
};
</script>

<style>
</style>
