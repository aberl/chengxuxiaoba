<template>
  <div>
    <headerTop />
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow title_font">
        资料下载&nbsp;&nbsp;
        <img src="./images/resource64.png" />
        <div style="margin: 20px 0;"></div>
        <el-collapse v-model="activeNames" v-for="resource in resourceList" :key="resource.id">
          <el-collapse-item :title="resource.name" :name="resource.index">
            <div>描述：{{resource.description}}</div>
            <br />DOWNLOAD：
            <el-link
              v-if="hasDownLoadPermission"
              type="primary"
              @click="download(resource.file.downloadurl)"
            >
              <i class="el-icon-download"></i>
            </el-link>
             <el-tooltip v-else class="item" effect="dark" :content="nopermissiontooperation" placement="right">
          <el-link disabled>{{nopermission}}</el-link>
        </el-tooltip>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <footerGuide />
  </div>
</template>

<script>
import headerTop from "../../components/Header/header.vue";
import footerGuide from "../../components/Footer/footer.vue";

import { mapState, mapActions } from "vuex";

export default {
  mounted() {
    this.getMaterialEffectiveList();
  },
  data() {
    return {
      nopermissiontooperation:this.PROMPT.NOPERMISSIONTOOPERATION,
      nopermission:this.PROMPT.NOPERMISSION,
      activeNames: ["1"]
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.currentLoginUser,
      hasDownLoadPermission:state =>state.user.currentLoginUser.permissions["DOWNLOADINGNOLIMITED"]?true:false,
      resourceList: state => state.material.materialList
    })
  },
  methods: {
    ...mapActions(["getMaterialEffectiveList"]),
    download(url) {
      window.open(url, "_blank");
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
</style>
