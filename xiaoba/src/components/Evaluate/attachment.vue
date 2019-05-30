<template>
  <div>
    <el-table :data="attachment" style="width: 100%">
      <el-table-column prop="name" label="附件下载列表"></el-table-column>
      <el-table-column fixed="right" label="下载">
        <el-link type="primary" @click="download(url)">
          <i class="el-icon-download"></i>
        </el-link>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    attachment: Array
  },
  methods: {
    download(url) {
      window.open('http://localhost:7080/chengxuxiaoba/VIDEO_ATTACHMENTS/08836f45-b53e-47e4-b613-62e30a3dc061.txt', "_blank");
    }
  }
};
</script>

<style>
</style>
