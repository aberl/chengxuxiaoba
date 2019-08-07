<template>
  <div>
    <el-table :data="attachment" style="width: 100%">
      <el-table-column prop="name" label="附件下载列表"></el-table-column>
      <el-table-column fixed="right" label="下载">
        <el-link
          type="primary"
          @click="download(url)"
          v-if="this.userInfo.permissions[this.PERMISSION.SUBMITISSUE]"
        >
          <i class="el-icon-download"></i>
        </el-link>
        <el-tooltip v-else class="item" effect="dark" :content="this.PROMPT.NOPERMISSIONTOOPERATION" placement="right">
          <el-link disabled>{{this.PROMPT.NOPERMISSION}}</el-link>
        </el-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {
    attachment: Array
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.currentLoginUser
    })
  },
  methods: {
    download(url) {
      window.open(url, "_blank");
    }
  }
};
</script>

<style>
</style>
