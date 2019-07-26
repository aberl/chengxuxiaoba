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
      window.open(url, "_blank");
    }
  }
};
</script>

<style>
</style>
