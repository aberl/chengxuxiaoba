<template>
  <div class="container">
    <div style="margin: 200px 0;"></div>
    <form class="form-signin">
      <headwe4login/>

      <el-tabs v-model="activeTab">
        <!--注册-->
        <el-tab-pane name="reg">
          <span slot="label">
            <i class="iconfont ai-iconzhuce"></i>注 册
          </span>
          <register/>
        </el-tab-pane>

        <!--账号登录-->
        <el-tab-pane name="accountlogin">
          <span slot="label">
            <i class="iconfont ai-icongerenzhanghaoguanli"></i>账号登录
          </span>
          <login/>
        </el-tab-pane>

        <!--微信登录-->
        <el-tab-pane class="text-center" name="wechatlogin">
          <strong>安全登录，防止被盗</strong>
          <span slot="label">
            <i class="iconfont ai-iconweixin"></i>微信登录
          </span>
          <loginWithWechat/>
        </el-tab-pane>
      </el-tabs>
    </form>
  </div>
</template>

<script>
import headwe4login from "../../components/Header/header4login.vue";
import register from "../../components/Account/register.vue";
import login from "../../components/Account/login.vue";
import loginWithWechat from "../../components/Account/loginWithWechat.vue";
export default {
  data() {
    return {
      activeTab: "accountlogin",
    };
  },
  methods: {
 
  },
  components: {
    headwe4login,
    register,
    login,
    loginWithWechat
  }
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