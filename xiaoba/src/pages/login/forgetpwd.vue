<template>
  <div class="container">
    <div style="margin: 200px 0;"></div>

    <form class="form-signin">
      <headwe4login/>
      <i class="iconfont ai-iconwangjimima"></i>
      <strong>忘记密码</strong>
      <div style="margin: 20px 0;"></div>
      <div v-if="!isResetSuccess">
        <el-input placeholder="手机号码" v-model="mobilephone" clearable>
          <el-button
            slot="append"
            type="primary"
            @click="sendcode"
            class="input-with-select"
            v-bind:disabled="isValidationCodeButtonDisabled"
          >{{validationCodeButtonContent}}</el-button>
        </el-input>
        <div style="margin: 20px 0;"></div>
        <div class="input-group">
          <el-input placeholder="验证码" v-model="validationcode" clearable></el-input>
        </div>
        <div style="margin: 20px 0;"></div>

        <div class="input-group">
          <el-input type="password" placeholder="密码由6-12位数字或字母组成" v-model="password" show-password></el-input>
        </div>
        <br>
        <div style="margin: 20px 0;"></div>
        <button type="button" class="btn btn-success btn-lg btn-block" @click="resetPassword">提 交</button>
      </div>
      <div v-if="isResetSuccess">密码修改成功,{{rdirectContent}}</div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { warn } from "../../VueAPI/Dialog/dialog";
import {
  matchMobilePhone,
  matchRegisterPassword
} from "../../VueAPI/Regex/regex";
import headwe4login from "../../components/Header/header4login.vue";
import { reqSendValidationCode, reResetPassword } from "../../api";

export default {
  data() {
    return {
      category: "forgetPassword",
      mobilephone: "",
      validationcode: "",
      password: "",
      isResetSuccess: false,
      timer: null,
      redirectTimer: null,
      isValidationCodeButtonDisabled: false, //发送验证码按钮的禁用状态
      validationCodeButtonContent: "发送验证码",
      disabledContent: "s后重新发送", // 按钮里显示的内容
      enableContent: "发送验证码", // 按钮里显示的内容
      countDountTime: "", //记录具体倒计时时间
      countDountTimeToLogin: "5", //记录具体倒计时时间
      innerRdirectContent: "s后自动跳转到登录页",
      rdirectContent: "5s后自动跳转到登录页"
    };
  },
  mounted: function() {
    var localUserInfo=JSON.parse(localStorage.getItem("userInfo"));
    if(localUserInfo.name){
      this.goTo('/');
    }
  },
  computed: {
    //判断手机号码
    isRightPhoneNumber: function() {
      return matchMobilePhone(this.mobilephone);
    }
  },
  methods: {
    goTo(path) {
      //this.$router.push({path});
      this.$router.replace(path);
    },
    async sendcode() {
      if (this.mobilephone == null || this.mobilephone == "") {
        warn("手机号不能为空", "");
        return;
      }

      if (!this.isRightPhoneNumber) {
        warn("手机号码格式错误", "");
        return;
      }

      const result = await reqSendValidationCode(
        this.mobilephone,
        this.category
      );

      if (result.code != 0) {
        warn(result.message, "");
        return;
      }

      this.countDown();
    },
    async resetPassword() {
      if (this.mobilephone == null || this.mobilephone == "") {
        warn("手机号不能为空", "");
        return;
      }

      if (!this.isRightPhoneNumber) {
        warn("手机号码格式错误", "");
        return;
      }

      if (this.validationcode == null || this.validationcode == "") {
        warn("验证码不能为空", "");
        return;
      }

      if (this.password == null || this.password == "") {
        warn("密码不能为空", "");
        return;
      }

      if (!matchRegisterPassword(this.password)) {
        warn("密码必须由6-12位数字和字母组成");
        return;
      }
      const result = await reResetPassword(
        this.mobilephone,
        this.validationcode,
        this.password
      );
      if (result.code != 0) {
        warn(result.message, "");
        return;
      }

      this.isResetSuccess = true;
      this.countDownToLogin();
    },
    countDown() {
      const totalTime = 3;
      this.countDountTime = totalTime;
      if (!this.timer) {
        this.timer = window.setInterval(() => {
          this.isValidationCodeButtonDisabled = true;
          if (this.countDountTime > 1) {
            this.countDountTime--;
            this.validationCodeButtonContent =
              this.countDountTime + this.disabledContent;
            return;
          }
          this.validationCodeButtonContent = this.enableContent;
          clearInterval(this.timer);
          this.timer = null;
          this.countDountTime = totalTime;
          this.isValidationCodeButtonDisabled = false;
        }, 1000);
      }
    },
    countDownToLogin() {
      this.redirectTimer = window.setInterval(() => {
        if (this.countDountTimeToLogin > 1) {
          this.countDountTimeToLogin--;
          this.rdirectContent =
            this.countDountTimeToLogin + this.innerRdirectContent;
          return;
        }
        clearInterval(this.redirectTimer);
        this.countDountTimeToLogin = 5;
        this.redirectTimer = null;
        this.goTo("/login");
      }, 1000);
    }
  },
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
