<template>
  <div>
         <div style="margin-top: 15px;">
            <el-input placeholder="手机号码" v-model="mobilephone4log" clearable></el-input>
          </div>
          <br>
          <div class="input-group">
            <el-input type="password" placeholder="密码" v-model="password4login" show-password></el-input>
          </div>
          <br>
          <el-button type="text" @click="goTo('/forgetpwd')">忘记密码</el-button>
          <br>
          <button type="button" class="btn btn-success btn-lg btn-block" @click="goTo('/')">登 录</button>
  </div>
</template>

<script>
export default {
data() {
    return {
      tag: this.isSendValidateCodeSuccess,
      activeTab: "accountlogin",
      mobilephone4log: "",
      password4login: "",
      mobilephone4reg: "",
      validationcode4reg: "",
      password4reg: "",
      confirmpassword4reg: "",
      timer: null,
      isValidationCodeButtonDisabled: false, //发送验证码按钮的禁用状态
      validationCodeButtonContent: "发送验证码",
      disabledContent: "s后重新发送", // 按钮里显示的内容
      enableContent: "发送验证码", // 按钮里显示的内容
      countDountTime: "" //记录具体倒计时时间
    };
  },
  methods: {

  },
  components: {

  }
}
</script>

<style>

</style>
