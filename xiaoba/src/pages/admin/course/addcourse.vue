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
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reqUploadFile, reqRemoveUploadFile, reqAddCourse } from "../../../api";
export default {
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
    beforeUpload(file) {
      this.file = file;
      if (file.size / 1024 / 1024 > this.fileLimitSize) {
        this.$message.error(
          "只能上传jpg/png文件，且不超过" + this.fileLimitSize + "M"
        );
        return false;
      }

      var isExistSameFile = false;
      for (var index in this.ruleForm.images) {
        if (this.ruleForm.images[index].originname == this.file.name) {
          this.$message.error(this.file.name + "已上传");
          return false;
        }
      }

      return true;
    },
    uploadProgress(file) {},
    uploadSuccess(response, file, fileList) {},
    async handleRemove(file, fileList) {
      if (file.status != "success") return false;

      var newname = "";
      var removeIndex = -1;
      console.log("delete file name : " + file.name);
      for (var index in this.ruleForm.images) {
        console.log(this.ruleForm.images[index].originname);
        if (this.ruleForm.images[index].originname == file.name) {
          removeIndex = index;
          newname = this.ruleForm.images[index].newname;
        }
      }
      console.log(removeIndex);
      if (removeIndex != -1) {
        this.ruleForm.images.splice(removeIndex, 1);
        const result = await reqRemoveUploadFile(newname);
        if (result.code == 0) {
          this.ruleForm.images.splice(removeIndex, 1);
        } else {
          return false;
        }
      }
    },
    handlePreview(file) {
      console.log(file);
    },
    async httprequest(uploader) {
      var fileObj = uploader.file;
      var form = new FormData();
      form.append("uploadFile", uploader.file);
      form.append("purpose", "COURSE_BACKGROUND");
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: progressEvent => {
          let percent =
            ((progressEvent.loaded / progressEvent.total) * 100) | 0;
          uploader.onProgress({
            percent: percent
          });
        }
      };
      const result = await reqUploadFile(form, config);
      if (result.code == 0) {
        var image = {
          originname: uploader.file.name,
          newname: result.data.name
        };
        this.ruleForm.images.push(image);
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
