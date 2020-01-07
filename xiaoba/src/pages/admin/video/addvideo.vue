<template>
  <el-form
    :label-position="labelPosition"
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="课程模块" prop="courseModuleId">
      <el-select @change="courseSelected" v-model="ruleForm.courseId" placeholder="请选择课程">
        <el-option
          v-for="item in this.courseoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select
        @change="courseModuleSelected"
        v-model="ruleForm.courseModuleId"
        placeholder="请选择模块"
      >
        <el-option
          v-for="item in this.coursemoduleoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="视频名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="ali视频Id" prop="aliVideoId">
      <el-input v-model="ruleForm.aliVideoId">
         <el-button slot="append" icon="el-icon-magic-stick">转码</el-button>
      </el-input>
    </el-form-item>
    <el-form-item label="附件">
      <el-upload
        class="upload-demo"
        action="string"
        :before-upload="beforeUploadAttachments"
        :on-remove="handleRemoveAttachments"
        :http-request="httprequestAttachments"
        accept="*"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item label="视频时长" prop="duration">
      <el-input v-model="ruleForm.duration"></el-input>
    </el-form-item>
    <el-form-item label="视频描述" prop="desc">
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
  isMatchUploaded,
  removeFile,
  getIndex
} from "../../../VueAPI/File/uploadFile";
export default {
  mounted() {
    this.getAllEffectCourseList();
  },
  computed: {
    ...mapState({
      addResult: state => state.video.result,
      courseoptions: state => {
        var _options = [];
        for (var index in state.course.courseList) {
          _options.push({
            value: state.course.courseList[index].id,
            label: state.course.courseList[index].name
          });
        }
        return _options;
      },
      coursemoduleoptions: state => {
        var _options = [];
        for (var index in state.course.courseModuleList) {
          _options.push({
            value: state.course.courseModuleList[index].id,
            label: state.course.courseModuleList[index].name
          });
        }
        return _options;
      }
    })
  },
  data() {
    return {
      labelPosition: "left",
      ruleForm: {
        courseId: "",
        courseModuleId: "",
        aliVideoId: "",
        attachments: [],
        name: "",
        duration: "",
        desc: "",
        status: "1"
      },
      rules: {
        courseId: [
          { required: true, message: "请选择课程", trigger: "change" }
        ],
        courseModuleId: [
          { required: true, message: "请选择课程模块", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入视频名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请填写描述", trigger: "blur" }],
        duration: [
          { required: true, message: "请填写视频播放时长", trigger: "blur" }
        ],
        aliVideoId: [{ required: true, message: "请输入阿里云视频id", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions(["getAllEffectCourseList","getAllCourseModuleList","addVideo"]),
    courseSelected(val) {
      this.getAllCourseModuleList(val);
      this.ruleForm.courseModuleId = "";
    },
    beforeUploadAttachments(file) {
      var _flag = isMatchUploaded(file, this.ruleForm.attachments);
      if (!_flag) return _flag;

      return true;
    },
    async handleRemoveAttachments(file, fileList) {
      if (file.status != "success") return false;

      var result = await removeFile(file, this.ruleForm.attachments);
      if (result.code == 0) {
        var _index = getIndex(file, this.ruleForm.attachments);
        this.ruleForm.images.splice(_index, 1);
      }
    },
    async httprequestAttachments(uploader) {
      const result = await uploadFile(uploader, "VIDEO_ATTACHMENTS");
      if (result.code == 0) {
        this.ruleForm.attachments.push({
          name: uploader.file.name,
          newname: result.data.name
        });
      }
    },
    courseModuleSelected(val) {},
    async submitForm(formName) {
      var flag = true;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          flag = false;
        }
      });
      if (!flag) return false;

       var _attachments = [];
      this.ruleForm.attachments.forEach(item => {
        _attachments.push(item.newname);
      });
      
      this.ruleForm.attachments = JSON.stringify(_attachments);
     
      await this.addVideo(this.ruleForm);
       if (eval(this.addResult.data)) {
        this.$router.replace("/op/videolist");
      }
    }
  },
  components: {}
};
</script>

<style>
</style>
