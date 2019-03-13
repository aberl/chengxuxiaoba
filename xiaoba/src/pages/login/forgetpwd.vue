<template>
  <div class="container">
    <div style="margin: 200px 0;"></div>
    <form class="form-signin">
      <headwe4login/>
      <i class="iconfont ai-iconwangjimima"></i><strong>忘记密码</strong>
      <div style="margin: 20px 0;"></div>
      <el-input placeholder="请输入手机号码" v-model="mobilephone4reg" clearable>
        <el-button slot="append" type="primary" class="input-with-select">获取验证码</el-button>
      </el-input>
      <div style="margin: 20px 0;"></div>
      <div class="input-group">
        <el-input placeholder="请输入验证码" v-model="validationcode4reg" clearable></el-input>
      </div>
      <div style="margin: 20px 0;"></div>

      <div class="input-group">
        <el-input type="password"  placeholder="请输入密码" v-model="password4reg" show-password></el-input>
      </div>
      <br>
      <div class="input-group">
        <el-input type="password" placeholder="请再次输入密码" v-model="confirmpassword4reg" show-password></el-input>
      </div>
      <div style="margin: 20px 0;"></div>
      <button
        type="button"
        class="btn btn-success btn-lg btn-block"
        @click="goTo('/')"
      >提 交</button>
    </form>
  </div>
</template>

<script>
import headwe4login from "../../components/Header/header4login.vue";
export default {
  data() {
    return {
      mobilephone4log: "",
      password4login: "",
      mobilephone4reg: "",
      validationcode4reg: "",
      password4reg: "",
      confirmpassword4reg: ""
    };
  },
  methods: {
    goTo(path) {
      //this.$router.push({path});
      this.$router.replace(path);
    }},
  components: { headwe4login }
};
</script>


<style>
html,
body {
  height: 100%;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
</style>
