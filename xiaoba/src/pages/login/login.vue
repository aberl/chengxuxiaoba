<<template>
  <div class="container">
    <div style="margin: 200px 0;"></div>
    <form class="form-signin">
   <headwe4login/>
   xxx{{validatetionCode == null? false:(validatetionCode.code == 1)}}
   <warnningdialog v-bind:displayflag="validatetionCode == null? false:(validatetionCode.code == 1)"></warnningdialog>

  <el-tabs v-model="activeTab">
    <!--注册-->
   <el-tab-pane name="reg">
    <span slot="label"><i class="iconfont ai-iconzhuce"></i>注 册</span>
    <div style="margin-top: 15px;">
        <el-input placeholder="请输入手机号码" v-model="mobilephone4reg" clearable>
          <el-button slot="append" type="primary" @click="sendValidtionCode({'mobilePhoneNo':mobilephone4reg,'category':'register'})" class="input-with-select" v-bind:disabled="isValidationCodeButtonDisabled">{{validationCodeButtonContent}}</el-button>
        </el-input>
      </div>
    <br/>
    <div class="input-group">
      <el-input placeholder="请输入验证码" v-model="validationcode4reg" clearable>
   </el-input>
    </div>
    <br/>
    
    <div class="input-group">
      <el-input type="password"  placeholder="请输入密码" v-model="password4reg" clearable>
   </el-input>
   </div>
    <br/>
    <div class="input-group">
      <el-input type="password"  placeholder="请再次输入密码" v-model="confirmpassword4reg"  show-password>
   </el-input>
    <br/>
    </div>
    <br/>
    <button type="button" class="btn btn-success btn-lg btn-block" @click="goTo('/')">注    册</button>
    </el-tab-pane>
    
    <!--账号登录-->
   <el-tab-pane name="accountlogin">
    <span slot="label"><i class="iconfont ai-icongerenzhanghaoguanli"></i>账号登录</span>
    <div style="margin-top: 15px;">
        <el-input placeholder="手机号码" v-model="mobilephone4log" clearable>
        </el-input>
      </div>
    <br/>
    <div class="input-group">

   <el-input type="password" placeholder="密码" v-model="password4login" show-password></el-input>
    </div>
    <br/>
    <el-button type="text" @click="goTo('/forgetpwd')">忘记密码</el-button>
    <br/>
    <button type="button" class="btn btn-success btn-lg btn-block" @click="goTo('/')">登    录</button>
    </el-tab-pane>
    
    <!--微信登录-->
    <el-tab-pane class='text-center' name="wechatlogin">
      <strong>安全登录，防止被盗</strong>
    <span slot="label"><i class="iconfont ai-iconweixin"></i>微信登录</span>
     <div style="margin: 20px 0;"></div>
     <div><img src="./images/QRCode.png" width="100" height="100" class="img-circle"></div>
     <div style="margin: 20px 0;"></div>
     <div><strong>请使用微信扫描二维码登录</strong></div>
    </el-tab-pane>
  </el-tabs>


    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import headwe4login from "../../components/Header/header4login.vue";
import warnningdialog from "../../components/Dialog/warnning.vue";

export default {
  computed: mapState({
    validatetionCode: state => state.user.validatetionCode
  }),
  data() {
    return {
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
    ...mapActions(["sendValidtionCode"]),
    goTo(path) {
      //this.$router.push({path});
      this.$router.replace(path);
    },
    countDown() {
      const totalTime = 60;
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
    }
  },
  components: {
    headwe4login,
    warnningdialog
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
