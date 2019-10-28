<template>
  <div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入账户名称，手机号码或状态(激活或者失效)..." v-model="searchcontent">
        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
      </el-input>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="mobilePhoneNo" label="手机号码"></el-table-column>
      <el-table-column fixed prop="name" label="账号名称"></el-table-column>
      <el-table-column prop="statusDesc" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="goToDetail('/op/user', tableData[scope.$index].id)"
            type="text"
            size="small"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
        <el-row :gutter="20">
      <el-col :span="12" :offset="6">
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPageNum"
        :page-sizes="pagesizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  mounted() {
    this.getUserList();
  },
  methods: {
    ...mapActions(["getuserlist"]),
    search(){
      this.currentPageNum=1;
        this.getUserList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.currentPageNum = val;
      this.getUserList();
    },
    getUserList() {
      this.getuserlist({
        pageNum: this.currentPageNum,
        pagesize: this.pageSize,
        query: this.searchcontent
      });
    },
    goToDetail(path,id) {
      this.$router.replace({path:path, query:{id:id}});
    }
  },
  computed: {
    ...mapState({
      tableData: state => {
        return state.user.userlist.data;
      },
      totalCount: state => {
        return state.user.userlist.totalCount;
      }
    })
  },
  data() {
    return {
      currentPageNum: 1,
      pagesizes: [20, 40, 60, 80,100],
      pageSize: 20,
      searchcontent: ""
    };
  },
  components: {}
};
</script>

<style>
.el-select .el-input {
  width: 110px;
}
</style>
