<template>
  <div @click="goTo('/')" style="cursor:pointer">
    <el-row>
      <el-col :span="8">
          <img src="../../common/images/bus64.png" alt="..." class="img-circle">
          <h5>程序小巴</h5>
      </el-col>
      <el-col :span="16">
        <div style="margin: 40px 0;"></div>
        <div class="grid-content bg-purple-light">最/纯/粹/的/技/术/梦/工/厂</div>
      </el-col>
    </el-row>
    <div style="margin: 20px 0;"></div>
  </div>
</template>

<script>
export default {
  methods: {
    goTo(path) {
      //this.$router.push({path});
      this.$router.replace(path);
    }
  },
  components: {}
};
</script>

<style>
</style>
