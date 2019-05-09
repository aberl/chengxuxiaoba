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
    <el-form-item label="视频" ref="registerRef" prop="images">
      <el-upload class="upload-demo" action="string" :multiple="false" accept=".mp4, .rmvb">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item label="附件" ref="registerRef" prop="images">
      <el-upload class="upload-demo" action="string" :multiple="false" accept=".mp4, .rmvb">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
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
    {{this.courseoptions}}||{{this.coursemoduleoptions}}
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  mounted() {
    this.getAllEffectCourseList();
  },
  computed: {
    ...mapState({
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
        courseName: "",
        name: "",
        desc: "",
        status: "1",
        images: []
      },
      rules: {
        courseId: [
          { required: true, message: "请选择课程", trigger: "change" }
        ],
        courseModuleId: [
          { required: true, message: "请选择课程模块", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入模块名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
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
    ...mapActions(["getAllEffectCourseList", "getAllCourseModuleList"]),
    courseSelected(val) {
        this.getAllCourseModuleList(val);
        this.ruleForm.courseModuleId="";
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
    }
  },
  components: {}
};
</script>

<style>
</style>
