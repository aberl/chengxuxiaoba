<template>
  <div>
    <headerTop/>

    <el-container>
      <el-aside width="200px">
        <leftNavi/>
      </el-aside>
      <el-main>欢迎来到管理员页面</el-main>
    </el-container>

    <footerGuide/>
  </div>
</template>

<script>
import headerTop from "../../components/Admin/Header/adminHeader.vue";
import footerGuide from "../../components/Footer/footer.vue";
import leftNavi from "../../components/Admin/Navi/adminLeftNavi.vue";

export default {
  methods: {},
  components: {
    headerTop,
    footerGuide,
    leftNavi
  }
};
</script>

<style>
.el-main{
  /* text-align: center; */
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center
}
.sans：{
  font-size: 30px
}
</style>
