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
    <el-form-item label="角色">
  <el-checkbox-group 
    v-model="userInfo.roles"
    :min="1"
    :max="3">
    <el-checkbox v-for="(name, value) in this.roles" :label="value" :key="value">{{name}}</el-checkbox>
  </el-checkbox-group>
    </el-form-item>
    <el-form-item label="VIP时效">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="userInfo.vipStartDate" value-format="yyyy-MM-dd HH:mm:ss"  style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="userInfo.vipEndDate" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
    <el-form-item label="创建时间">
      <el-input v-model="userInfo.createDateTime" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  mounted() {
      if (this.$route.query.id)
      {
    this.getuserinfo(this.$route.query.id);
    this.getrolelist();
      }
      else{
          this.$router.replace("/op/userlist");
      }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      roles: state => state.user.roles
    })
  },
  data() {
    return {
        checkedCities1:[],
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
    ...mapActions(["getuserinfo", "getrolelist","updateUserInfo"]),
    onSubmit() {
      console.log(this.userInfo);
        this.updateUserInfo(this.userInfo);
      this.$router.replace("/op/userlist");
    }
  },
  components: {}
};
</script>

<style>
</style>
