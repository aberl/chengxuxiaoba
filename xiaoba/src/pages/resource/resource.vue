<template>
  <div>
    <headerTop />
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow">
        资料下载&nbsp;&nbsp;
        <img src="./images/resource64.png" />
        <el-collapse v-model="activeNames" v-for="resource in resourceList" :key="resource.id">
          <el-collapse-item :title="resource.name" :name="resource.index">
            <div>描述：{{resource.description}}</div>
           <br> 
            DOWNLOAD：<el-link type="primary" @click="download(resource.file.downloadurl)">
              <i class="el-icon-download"></i>
            </el-link>
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
      activeNames: ["1"]
    };
  },
  computed: {
    ...mapState({
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
</style>
