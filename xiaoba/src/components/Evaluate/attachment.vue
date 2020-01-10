<template>
  <div>
    <el-table :data="attachment" style="width: 100%">
      <el-table-column prop="name" label="附件下载列表"></el-table-column>
      <el-table-column fixed="right" label="下载">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="download('/resource/'+scope.row.newname)"
            v-if="userInfo.permissions && userInfo.permissions[PERMISSION.DOWNLOADINGNOLIMITED]"
          >
            <i class="el-icon-download"></i>
          </el-link>
          <el-tooltip
            v-else
            class="item"
            effect="dark"
            :content="PROMPT.NOPERMISSIONTOOPERATION"
            placement="right"
          >
            <el-link disabled>{{PROMPT.NOPERMISSION}}</el-link>
          </el-tooltip>
        </template>
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
    ...mapActions(["downFile"]),
    download(url) {
      url = url + "?AuthorizationToken=" + this.userInfo.token;
      window.open(url, "_blank");
    }
  }
};
</script>

<style>
</style>
