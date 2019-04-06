<template>
  <div>
    <div style="margin-top: 15px;">
      <el-input placeholder="手机号码" v-model="mobilephone4login" clearable></el-input>
    </div>
    <br>
    <div class="input-group">
      <el-input type="password" placeholder="密码" v-model="password4login" show-password></el-input>
    </div>
    <br>
    <el-button type="text" @click="goTo('/forgetpwd')">忘记密码</el-button>
    <br>
    <button type="button" class="btn btn-success btn-lg btn-block" @click="login">登 录</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { warn } from "../../VueAPI/Dialog/dialog";
import { matchMobilePhone } from "../../VueAPI/Regex/regex";
import { reqLogin } from "../../api";
export default {
  computed: {
    //判断手机号码
    isRightPhoneNumber: function() {
      return matchMobilePhone(this.mobilephone4login);
    }
  },
  data() {
    return {
      mobilephone4login: "",
      password4login: ""
    };
  },
  methods: {
    ...mapActions(["receiveUserInfo","conserveUserInfo"]),
    async login() {
      if (this.mobilephone4login == null || this.mobilephone4login == "") {
        warn("手机号不能为空", "");
        return;
      }
      if (!this.isRightPhoneNumber) {
        warn("手机号码格式错误", "");
        return;
      }
      if (this.password4login == null || this.password4login == "") {
        warn("密码不能为空", "");
        return;
      }

      const result = await reqLogin(
        this.mobilephone4login,
        this.password4login
      );

      if (result.code != 0) {
        warn(result.message, "");
        return;
      }

      this.receiveUserInfo(result.data);
      this.conserveUserInfo(result.data);

      //去首页
      this.$router.replace("/");

    }
  },
  components: {}
};
</script>

<style>
</style>
