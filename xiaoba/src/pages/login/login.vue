<<template>
  <div class="container">
    <form class="form-signin">
      <img src="../../common/images/bus256.png" alt="..." class="img-circle">
      <br/>
    <div class="input-group">
      <input type="text" class="form-control"  placeholder="输入11位手机号码">
      <button type="button" class="btn btn-primary">获取验证码</button>
    </div>
    <br/>
    <div class="input-group">
      <input type="text" class="form-control"  placeholder="验证码">
    </div>
    <br/>
    <button type="button" class="btn btn-success btn-lg btn-block" onclick="window.location.href='index_login.html'">登    录</button>
    </form>
  </div>
</template>

<script>
export default {
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
