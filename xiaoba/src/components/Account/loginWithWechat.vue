<template>
  <div>
          <div style="margin: 20px 0;"></div>
          <div>
            <img :src="wechatloginimgurl" width="100" height="100" class="img-circle">
          </div>
          <div style="margin: 20px 0;"></div>
          <div>
            <strong>请使用微信扫描二维码登录</strong>
          </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      wechatloginimgurl:this.PROMPT.WECHATLOGINIMGURL
      }
  },
  methods: {

  },
  components: {

  }
}
</script>

<style>

</style>
