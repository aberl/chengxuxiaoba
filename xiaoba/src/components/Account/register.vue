<template>
  <div>
    <Captcha @success="SetToken"></Captcha>
    <div style="margin-top: 15px;">
      <el-input placeholder="手机号码" v-model="mobilephone4reg" clearable>
        <el-button
          slot="append"
          type="primary"
          @click="sendcode"
          class="input-with-select"
          v-bind:disabled="isValidationCodeButtonDisabled"
        >{{validationCodeButtonContent}}</el-button>
      </el-input>
    </div>
    <br />
    <div class="input-group">
      <el-input placeholder="验证码" v-model="validationcode4reg" clearable></el-input>
    </div>
    <br />

    <div class="input-group">
      <el-input type="password" placeholder="密码由6-12位数字或字母组成" v-model="password4reg" show-password></el-input>
    </div>
    <br />
    <button type="button" class="btn btn-success btn-lg btn-block" @click="register">注 册</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { warn } from "../../VueAPI/Dialog/dialog";

import Captcha from "../Captcha/captcha.vue";

import {
  matchMobilePhone,
  matchRegisterPassword
} from "../../VueAPI/Regex/regex";
import {
  reqSendValidationCode,
  reqRegisterAccount,
  reqGetUserInfoByMobilePhone
} from "../../api";

export default {
  data() {
    return {
      category: "register",
      mobilephone4reg: "",
      validationcode4reg: "",
      password4reg: "",
      timer: null,
      isValidationCodeButtonDisabled: false, //发送验证码按钮的禁用状态
      validationCodeButtonContent: "发送验证码",
      disabledContent: "s后重新发送", // 按钮里显示的内容
      enableContent: "发送验证码", // 按钮里显示的内容
      countDountTime: "", //记录具体倒计时时间
      form: {
        token: ""
      },
      submit: false
    };
  },
  computed: {
    //判断手机号码
    isRightPhoneNumber: function() {
      return matchMobilePhone(this.mobilephone4reg);
    }
  },
  methods: {
    ...mapActions(["receiveUserInfo", "conserveCurrentUserInfo"]),
    async sendcode() {
       if (!this.submit) {
          warn("请先进行验证", "");
        return;
      }

      if (this.mobilephone4reg == null || this.mobilephone4reg == "") {
        warn("手机号不能为空", "");
        return;
      }

      if (!this.isRightPhoneNumber) {
        warn("手机号码格式错误", "");
        return;
      }

      const result = await reqSendValidationCode(
        this.form.token,
        this.mobilephone4reg,
        this.category
      );

      if (result.code != 0) {
        warn(result.message, "");
        return;
      }

      this.countDown();
    },

    async register() {
      if (this.mobilephone4reg == null || this.mobilephone4reg == "") {
        warn("手机号不能为空", "");
        return;
      }

      if (!this.isRightPhoneNumber) {
        warn("手机号码格式错误", "");
        return;
      }

      if (this.validationcode4reg == null || this.validationcode4reg == "") {
        warn("验证码不能为空", "");
        return;
      }

      if (this.password4reg == null || this.password4reg == "") {
        warn("密码不能为空", "");
        return;
      }

      if (!matchRegisterPassword(this.password4reg)) {
        warn("密码必须由6-12位数字和字母组成");
        return;
      }

      const result = await reqRegisterAccount(
        this.mobilephone4reg,
        this.validationcode4reg,
        this.password4reg
      );

      if (result.code != 0) {
        warn(result.message, "");
        return;
      }

      this.conserveCurrentUserInfo(result.data);
      //去首页
      this.$router.replace("/");
    },

    countDown() {
      const totalTime = 120;
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
    ncVerify() {
      if (!this.form.token) {
        this.ResetValidate();
        return false;
      }
      return true;
    },
    ResetValidate() {
      this.form.token = "";
      // eslint-disable-next-line
      LUOCAPTCHA && LUOCAPTCHA.reset();
    },
    SetToken(resp) {
      this.submit = true;
      this.form.token = resp;
    }
  },
  components: {
    Captcha
  }
};
</script>

<style>
</style>
