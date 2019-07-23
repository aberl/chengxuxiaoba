<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="材料名称"></el-table-column>
      <el-table-column prop="createdatetime" label="上传时间"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="goToDetail('/op/modifymaterial', tableData[scope.$index].id)"
            type="text"
            size="small"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    {{tableData}}
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  mounted() {
    this.getMaterialAllList();
  },
  computed: {
    ...mapState({
      tableData: state => {
        var _data = [];
        for (var index in state.material.materialList) {
          _data.push({
            id:state.material.materialList[index].id,
            name: state.material.materialList[index].name,
            createdatetime: state.material.materialList[index].createDateTime,
            status: state.material.materialList[index].statusDesc
          });
        }
        return _data;
      }
    })
  },
  methods: {
    ...mapActions(["getMaterialAllList"]),
    goToDetail(path, id) {
      console.log(id)
      this.$router.replace({ path: path, query: { id: id } });
    }
  }
};
</script>

<style>
.el-main {
  text-align: center;
}

.el-table {
  height: 100%;
}

.el-table-column {
  width: 25%;
}
</style>
