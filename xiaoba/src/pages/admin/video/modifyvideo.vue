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
      <el-select
        disabled
        @change="courseSelected"
        v-model="this.courseoptions[0].value"
        placeholder="请选择课程"
      >
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
    <el-form-item label="ali视频Id" prop="aliVideoId">
      <el-input v-model="ruleForm.aliVideoId">
         <el-button slot="append" icon="el-icon-magic-stick" 
         @click="encodeAliVideoById(ruleForm.aliVideoId)">转码</el-button>
      </el-input>
    </el-form-item>
    <el-form-item label="附件">
      <el-upload
        class="upload-demo"
        action="string"
        :before-upload="beforeUploadAttachments"
        :on-remove="handleRemoveAttachments"
        :http-request="httprequestAttachments"
        :file-list="ruleForm.attachments"
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
    <el-form-item label="观看人数">
      <el-tag type="success">{{ruleForm.viewCount}}</el-tag>
    </el-form-item>
    <el-form-item label="点赞人数">
      <el-tag type="success">{{ruleForm.praiseCount}}</el-tag>
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
      modifyResult: state => state.video.result,
      result: state => state.video.result,
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
        aliVideoId: [{ required: true, message: "请输入阿里云视频id", trigger: "blur" }],
        duration: [
          { required: true, message: "请填写视频播放时长", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["getVideo", "modifyVideo","encodeAliVideo"]),
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
        this.ruleForm.attachments.splice(_index, 1);
      }
    },
    async httprequestAttachments(uploader) {
      const result = await uploadFile(uploader, "VIDEO_ATTACHMENTS");
      if (result.code == 0) {
        this.ruleForm.attachments.push({
          name: uploader.file.name,
          newname: result.data.name,
          url: result.data.path
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

      await this.modifyVideo(this.ruleForm);
      if (eval(this.modifyResult.data)) {
        this.$router.replace("/op/videolist");
      }
    },
    async encodeAliVideoById(aliVideoId){
     
    await this.encodeAliVideo(aliVideoId);

      if (this.result.code != 0) {
        this.$message.error("转码"+this.result.message);
      } else {
        this.$message({
          message: "转码"+this.result.message,
          type: "success"
        });
      }

    }
  },
  components: {}
};
</script>

<style>
</style>
