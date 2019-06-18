<template>
  <div>
    <headerTop/>
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow title_font">
        个人信息&nbsp;&nbsp;
        <img src="./images/driver64.png">
        {{userInfo}}
        ............
        {{role}}
        <div style="margin: 20px;"></div>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item class="title_font" label="用户名">&#8195;&#8195;{{this.userInfo.name}}</el-form-item>
          <el-divider></el-divider>
          <el-form-item label="手机号">&#8195;&#8195;{{this.userInfo.mobilePhoneNo}}</el-form-item>
          <el-divider></el-divider>
          <el-form-item label="会员详情">
            &#8195;&#8195;当前等级&#8195;&#8195;
            <el-tag type="success">{{role.description}}</el-tag>
            <div class="padding-top"></div>
            <div v-if="this.userInfo.vipEndDate">
              &#8195;&#8195;会员到期时间&#8195;&#8195;
              <el-tag type="success">{{this.userInfo.vipEndDate}}</el-tag>
            </div>
            <div class="padding-top"></div>&#8195;&#8195;升级会员&#8195;&#8195;
            <el-radio-group fill="red" v-model="sizeForm.resource" size="medium">
              <el-radio border label="游 客"></el-radio>
              <el-radio border label="普通会员"></el-radio>
              <el-radio border label="VIP会员"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="当前特权">
            &#8195;&#8195;每日免费观看3段视频
            <div class="padding-top"></div>&#8195;&#8195;无限制观看视频
            <div class="padding-top"></div>&#8195;&#8195;无限制下载视频
            <div class="padding-top"></div>&#8195;&#8195;视频快进播放
            <div class="padding-top"></div>&#8195;&#8195;在线提交评论
            <div class="padding-top"></div>&#8195;&#8195;在线向老师提问
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
  mounted() {
    this.getrole(this.roleId);
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      roleId: state => {
        var _roleId = -1;
        if (
          state.user.userInfo.roles != null &&
          state.user.userInfo.roles.length > 0
        ) {
          _roleId = state.user.userInfo.roles[0];
        }
        return _roleId;
      },
      role: state => state.user.role
    })
  },
  data() {
    return {
      radioSelectedColor: "#67C23A",
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
  methods: {
    ...mapActions(["getrole", "getuserinfo"])
  },
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
