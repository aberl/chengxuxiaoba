<template>
  <div>
    <headerTop/>
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow title_font">
        个人信息&nbsp;&nbsp;
        <img src="./images/driver64.png">

        <div style="margin: 20px;"></div>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item class="title_font" label="用户名">&#8195;&#8195;PMHWAX</el-form-item>
          <el-divider></el-divider>
          <el-form-item label="手机号">&#8195;&#8195;15001112627</el-form-item>
          <el-divider></el-divider>
          <el-form-item label="会员等级">
            &#8195;&#8195;当前身份&#8195;&#8195; <el-button type="success">游&#8195;客</el-button>
            <div class="padding-top"></div>
            &#8195;&#8195;升级身份&#8195;&#8195;
            <el-radio-group fill="red"  v-model="sizeForm.resource" size="medium">
              <el-radio border label="游 客"></el-radio>
              <el-radio border label="普通会员"></el-radio>
              <el-radio border label="VIP会员"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="当前特权">
              &#8195;&#8195;每日免费观看3段视频
            <div class="padding-top"></div>
              &#8195;&#8195;无限制观看视频
            <div class="padding-top"></div>
              &#8195;&#8195;无限制下载视频
            <div class="padding-top"></div>
              &#8195;&#8195;视频快进播放
            <div class="padding-top"></div>
              &#8195;&#8195;在线提交评论
            <div class="padding-top"></div>
              &#8195;&#8195;在线向老师提问
              </el-form-item>
        </el-form>
      </div>
    </div>
    <footerGuide/>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import headerTop from "../../components/Header/header.vue";
import footerGuide from "../../components/Footer/footer.vue";
export default {
  data() {
    return {
    radioSelectedColor:"#67C23A",
      labelPosition: "top",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      sizeForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {},
  components: {
    headerTop,
    footerGuide
  }
};
</script>

<style>
.title_font {
  font-family: "微软雅黑";
  font-size: 30px;
}
.padding-top {
  padding-top: 20px;
}
</style>
