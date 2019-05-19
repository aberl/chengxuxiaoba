<template>
  <el-form ref="form" :model="userInfo" label-width="80px">
    <el-form-item label="账户名">
      <el-input v-model="userInfo.name" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="状态">
      <el-radio-group v-model="userInfo.status">
        <el-radio class="radio" label="1">激活</el-radio>
        <el-radio class="radio" label="-1">注销</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="创建时间">
      <el-input v-model="userInfo.createDateTime"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
    {{this.userInfo}}
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  mounted() {
    this.getuserinfo(4);
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        isac: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    ...mapActions(["getuserinfo"]),
    onSubmit() {
      console.log("submit!");
    }
  },
  components: {}
};
</script>

<style>
</style>
