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
          <!-- <el-form-item label="会员详情">
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
                  @change="showRolePermission(roleItem.id,roleItem.description, roleItem.permissionList)"
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
          </el-form-item> -->
        </el-form>
      </div>
    </div>
    <footerGuide/>

    <el-dialog center title="升级会员" :visible.sync="dialogTableVisible" @closed="roleSelectClosed">
      <el-row>
        <el-col :span="10">
          <el-table :data="selectPermissionList">
            <el-table-column property="description" :label="selectRoleName" width="240"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="14">
          <el-form label-position="left" label-width="80px" size="mini">
            <el-form-item class="padding-top" label="会员类型" prop="delivery">
              <el-radio-group
                v-model="selectRolePayment.selectRolePaymentType"
                v-for="rolePayment in this.rolePaymentList"
                :key="rolePayment.id"
                @change="changeRolePayment"
              >
                <el-radio-button :label="rolePayment.id">{{rolePayment.description}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="padding-top" label="会员价格" prop="delivery">
              <span class="iconfont ai-iconfl-renminbi"></span>
              <el-button type="text">{{selectRolePayment.selectRolePrice}}</el-button>
            </el-form-item>

            <el-form-item class="padding-top" label="会员时间">
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker
                    readonly
                    disabled
                    type="date"
                    v-model="selectRolePayment.selectRoleStartDate"
                    placeholder="选择日期"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">至</el-col>
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker
                    readonly
                    disabled
                    type="date"
                    v-model="selectRolePayment.selectRoleEndDate"
                    placeholder="选择日期"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-radio-group v-model="selectRolePayment.selectPayType" @change="rolePayChange">
                <el-radio :label="1">
                  <img src="../../common/images/pay/wxpay.png">
                </el-radio>
                <el-radio :label="2">
                  <img src="../../common/images/pay/alipay.png">
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-dialog
        width="30%"
        title
        :visible.sync="innerVisible"
        append-to-body
        center
        @closed="rolePaySelectClosed"
      >
        <el-row>
          <el-col :span="24">
            扫一扫付款:
            <span class="pay_font">{{selectRolePayment.selectRolePrice}}</span>元
          </el-col>
        </el-row>
        <div class="padding-top"></div>
        <el-row>
          <el-col :span="12">
            <div class="padding-top"></div>
            <div class="grid-content bg-purple">
              <img src="../../common/images/pay/qr-ali.png">
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <img src="../../common/images/pay/ali-pay.png">
            </div>
          </el-col>
        </el-row>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import headerTop from "../../components/Header/header.vue";
import footerGuide from "../../components/Footer/footer.vue";
export default {
  mounted() {
    this.getCurrentLoginUserInfo();
    this.getrole(this.roleId);
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.currentLoginUser,
      roleId: state => state.user.currentLoginUser.role,
      role: state => state.user.role,
      rolePaymentList: state => state.user.rolePaymentList
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
      innerVisible: false,
      selectPermissionList: [],
      selectRoleName: null,
      selectRolePayment: {
        selectRolePaymentType: 0,
        selectRolePrice: 0,
        selectRoleDescription: "",
        selectRoleStartDate: "",
        selectRoleEndDate: "",
        selectPayType: 0
      }
    };
  },
  methods: {
    ...mapActions(["getrole", "getCurrentLoginUserInfo", "getrolepaymentlist","updateUserRoleRelationship"]),
    showRolePermission(id, roleName, permissionList) {
      this.getrolepaymentlist(id);
      this.selectRoleName = roleName + "权限";
      this.dialogTableVisible = true;
      this.selectPermissionList = permissionList;
    },
    rolePaySelectClosed() {
      this.selectRolePayment.selectPayType = -1;
    },
    roleSelectClosed() {
      this.updateRoleSelect = -1;
    },
    changeRolePayment(rolePaymentId) {
      if (this.rolePaymentList != null) {
        var rolePaymentItem = null;
        for (var index in this.rolePaymentList) {
          if (this.rolePaymentList[index].id == rolePaymentId) {
            rolePaymentItem = this.rolePaymentList[index];
            break;
          }
        }

        if (rolePaymentItem != null) {
          (this.selectRolePayment.selectRolePaymentType = rolePaymentItem.id),
            (this.selectRolePayment.selectRolePrice = rolePaymentItem.price),
            (this.selectRolePayment.selectRoleDescription =
              rolePaymentItem.description),
            (this.selectRolePayment.selectRoleStartDate =
              rolePaymentItem.startDate),
            (this.selectRolePayment.selectRoleEndDate =
              rolePaymentItem.endDate);
        }
      }
    },
    rolePayChange(type) {
      this.innerVisible = true;
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
.pay_font {
  font-family: "Helvetica Neue";
  font-size: 20px;
  color:crimson}
.padding-top {
  padding-top: 20px;
}
</style>
