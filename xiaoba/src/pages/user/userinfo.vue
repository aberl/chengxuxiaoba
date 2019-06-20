<template>
  <div>
    <headerTop/>
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow title_font">
        个人信息&nbsp;&nbsp;
        {{this.role}}
        <img src="./images/driver64.png">
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
            <div v-if="this.userInfo.isOverDue">
              &#8195;&#8195;到期时间&#8195;&#8195;
              <el-tag type="success">{{this.userInfo.vipEndDate}}</el-tag>
            </div>
            <div v-if="this.role.needUpgrade">
              <div class="padding-top"></div>&#8195;&#8195;升级会员&#8195;&#8195;
              <el-radio-group fill="red" v-model="sizeForm.resource" size="medium">
                <el-radio
                  v-for="roleItem in this.role.upgradeRoleList"
                  :key="roleItem.id"
                  border
                  :label="roleItem.description"
                  @change="showRolePermission(roleItem.permissionList)"
                ></el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="当前特权">
            <div v-for="permission in this.role.permissionList" :key="permission.id">
              <div class="padding-top"></div>
              &#8195;&#8195;{{permission.description}}
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <footerGuide/>

<el-dialog title="升级会员" :visible.sync="this.dialogTableVisible">
  <el-table :data="selectPermissionList">
    <el-table-column property="description" label="权限" width="150"></el-table-column>
  </el-table>
</el-dialog>
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
      dialogTableVisible: false,
      innerVisible: false,
      selectPermissionList:[],
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
    ...mapActions(["getrole", "getuserinfo"]),
    showRolePermission(permissionList) {
        this.dialogTableVisible=true;
        this.selectPermissionList=permissionList;
    }
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
