<<template>
  <div class="container">
    <form class="form-signin">
    <el-row>
      <el-col :span="8"><img src="../../common/images/bus64.png" alt="..." class="img-circle"><h5>程序小巴</h5></el-col>
      <el-col :span="16"> <div style="margin: 40px 0;"></div>
      <div class="grid-content bg-purple-light">最/纯/粹/的/技/术/梦/工/厂</div></el-col>
    </el-row>
      
  <el-tabs v-model="activeName" @tab-click="handleClick">
   <el-tab-pane>
    <span slot="label"><i class="iconfont ai-iconduanxinyanzheng"></i>短信登录</span>
    <div style="margin-top: 15px;">
        <el-input placeholder="请输入手机号码" v-model="mobilephone" clearable>
          <el-button slot="append" type="primary" class="input-with-select">获取验证码</el-button>
        </el-input>
      </div>
    <br/>
    <div class="input-group">
      <el-input placeholder="请输入验证码" v-model="validationcode" clearable>
   </el-input>
    </div>
    <br/>
    <button type="button" class="btn btn-success btn-lg btn-block" onclick="window.location.href='index_login.html'">登    录</button>
    </el-tab-pane>

    <el-tab-pane class='text-center'>
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
export default {
  data() {
    return {
      mobilephone: "",
      validationcode: ""
    };
  },
  methods: {},
  components: {}
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
