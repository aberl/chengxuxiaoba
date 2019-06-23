<template>
  <div>
    <headerTop/>
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow title_font">
        个人信息&nbsp;&nbsp;
        <img src="./images/driver64.png">
        <div style="margin: 20px;"></div>
        <el-form :label-position="labelPosition" label-width="80px">
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
              <el-radio-group v-model="updateRoleSelect" fill="red" size="medium">
                <el-radio
                  v-for="roleItem in this.role.upgradeRoleList"
                  :key="roleItem.id"
                  border
                  :label="roleItem.id"
                  @change="showRolePermission(roleItem.description, roleItem.permissionList)"
                >{{roleItem.description}}</el-radio>
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

    <el-dialog center title="升级会员" :visible.sync="dialogTableVisible" @closed="roleSelectClosed">
      <el-row>
        <el-col :span="12">
          <el-table :data="selectPermissionList">
            <el-table-column property="description" :label="selectRoleName" width="340"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-radio-group v-model="roleTypeSelect">
            <el-radio-button label="1">月会员</el-radio-button>
            <el-radio-button label="2">季会员</el-radio-button>
            <el-radio-button label="3">年会员</el-radio-button>
          </el-radio-group>
          <br>
          <el-form label-position="left" label-width="80px" size="mini">
            <el-form-item class="padding-top" label="价格" prop="delivery">
              <span class="iconfont ai-iconfl-renminbi"></span>
              <el-button type="text">39</el-button>
            </el-form-item>

            <el-form-item class="padding-top" label="会员时间">
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="date2">
                  <el-time-picker placeholder="选择时间" style="width: 100%;"></el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-checkbox-group>
                <el-checkbox label="微信" name="type"></el-checkbox>
                <img src="../../common/images/pay/wxpay.png"/>
                <div class="padding-top"></div>
                <el-checkbox label="支付宝" name="type"></el-checkbox>
                <img src="../../common/images/pay/alipay.png"/>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import headerTop from "../../components/Header/header.vue";
import footerGuide from "../../components/Footer/footer.vue";
export default {
  mounted() {
    this.getUserInfo();
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
      QRSRC:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      updateRoleSelect: -1,
      roleTypeSelect: 1,
      labelPosition: "top",
      dialogTableVisible: false,
      selectPermissionList: [],
      selectRoleName: null
    };
  },
  methods: {
    ...mapActions(["getrole", "getUserInfo"]),
    showRolePermission(roleName, permissionList) {
      this.selectRoleName = roleName + "权限";
      this.dialogTableVisible = true;
      this.selectPermissionList = permissionList;
    },
    roleSelectClosed() {
      this.updateRoleSelect = -1;
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
