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
      <el-select disabled @change="courseSelected" v-model="this.courseoptions[0].value" placeholder="请选择课程">
        <el-option
          v-for="item in this.courseoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select
      disabled
      v-model="this.coursemoduleoptions[0].value"
        @change="courseModuleSelected"
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
    <el-form-item label="视频" ref="registerRef" prop="video">
      <el-upload
        class="upload-demo"
        action="string"
        :multiple="false"
        :before-upload="beforeUploadVideo"
        :on-remove="handleRemoveVideo"
        :http-request="httprequestVideo"
        accept=".mp4, .rmvb"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
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
    <el-form-item label="状态">
      <el-radio-group v-model="ruleForm.status">
        <el-radio class="radio" label="1">激活</el-radio>
        <el-radio class="radio" label="-1">注销</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
    {{this.ruleForm}}
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
    this.getVideo(this.$route.query.id);
  },
  computed: {
    ...mapState({
      ruleForm: state => state.video.videoDetail,
      courseModule: state => {
        return state.video.videoCourseModule;
      }
    }),
    courseoptions: function() {
      return [
        {
          value: this.courseModule.courseId,
          label: this.courseModule.courseName
        }
      ];
    },
    coursemoduleoptions: function() {
      return [
        {
          value: this.courseModule.id,
          label: this.courseModule.name
        }
      ];
    }
  },
  data() {
    return {
      labelPosition: "left",
      rules: {
        name: [
          { required: true, message: "请输入视频名称", trigger: "change" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请填写描述", trigger: "blur" }],
        duration: [
          { required: true, message: "请填写视频播放时长", trigger: "blur" }
        ],
        video: [
          {
            required: true,
            message: "只能上传mp4/rmvb文件",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["getVideo", "getCourseModuleDetails"]),
    courseSelected(val) {
      this.getAllCourseModuleList(val);
      this.ruleForm.courseModuleId = "";
    },
    beforeUploadVideo(file) {
      if (this.ruleForm.video) {
        this.$message.error("视频已上传，请删除后再上传");
        return false;
      }
      return true;
    },
    async getCourseModule(courseModuleId) {
      console.log(courseModuleId + "xxxxx");
      // const _result = await this.getCourseModuleDetails(
      //   courseModuleId
      // );
      // if (_result.code == 0)
      // this.courseModule=_result.data;
    },
    async handleRemoveVideo(file, fileList) {
      if (file.status != "success") return false;

      var fileList = [];
      fileList.push(this.ruleForm.video);
      var result = await removeFile(file, fileList);
      if (result.code == 0) {
        this.ruleForm.video = "";
      }
    },
    async httprequestVideo(uploader) {
      const result = await uploadFile(uploader, "COURSE_VIDEO");
      if (result.code == 0) {
        this.ruleForm.video = {
          name: uploader.file.name,
          newname: result.data.name
        };
      }
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
      this.ruleForm.video = this.ruleForm.video.newname;

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
