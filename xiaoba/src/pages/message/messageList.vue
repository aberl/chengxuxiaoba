<template>
  <div>
    <headerTop />
    <div class="container">
      <div class="my-3 p-3 bg-white rounded box-shadow title_font">
        消息列表&nbsp;&nbsp;
        <img src="./images/message64.png" />
        <div style="margin: 20px;"></div>

        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-button type="info" plain @click="removeSelectedMessage">删除</el-button>
              <el-button type="info" plain @click="clearUpAllMessage">清空消息</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple div-right">
              <el-button type="info" plain @click="filterMessageList(1)">只看已读</el-button>
              <el-button type="info" plain @click="filterMessageList(-1)">只看未读</el-button>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-table
          ref="multipleTable"
          :data="messageList"
          tooltip-effect="dark"
          style="width: 100%"
          @select="selectOne"
          @select-all="selectAll"
          @row-click="showMessageContent"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="类型" width="350">
            <template slot-scope="scope">{{ scope.row.categoryDesc }}</template>
          </el-table-column>
          <el-table-column prop="name" label="名称" width="350"></el-table-column>
          <el-table-column
            prop="createDateTime"
            label="创建时间"
            @cell-click="showMessageContent(message)"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="8">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pager.currentPageNum"
            :page-sizes="pager.pagesizes"
            :page-size="pager.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    {{selectedMessageItems}}
    <footerGuide />
    <el-dialog title="消息内容" :visible.sync="centerDialogVisible" width="30%" center>
      <span>{{messageContent}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import headerTop from "../../components/Header/header.vue";
import footerGuide from "../../components/Footer/footer.vue";

export default {
  mounted() {
    this.getMessageList();
  },
  data() {
    return {
      //选中到message的id集合
      selectedMessageItems: [],
      messageContent: "",
      centerDialogVisible: false,
      readMessageIdList: [],
      //-1:未读，1：已读，0:全部
      filteType: 0,
      pager: {
        currentPageNum: 1,
        pagesizes: [20, 40, 60, 80, 100],
        pageSize: 20
      }
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.currentLoginUser,
      userId: state => state.user.currentLoginUser.id,
      messageList: state => state.message.messageList.data,
      unReadMessageCount: state => state.message.unReadMessageCount,
      result: state => state.message.result,
      totalCount: state => {
        return state.message.messageList.totalCount;
      }
    })
  },
  inject: ["reload"],
  methods: {
    ...mapActions([
      "getAllMessageList",
      "getAllUnReadMessageList",
      "getAllReadMessageList",
      "readMessage",
      "deleteMessage"
    ]),
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    selectAll(selection) {
      if (!selection || selection.length == 0) {
        this.selectedMessageItems = [];
        return;
      }
      var item = null;
      var index = -1;
      for (var _index in selection) {
        item = selection[_index];
        index = this.selectedMessageItems.indexOf(item.id);
        if (index < 0) this.selectedMessageItems.push(item.id);
      }
    },
    selectOne(selection, row) {
      var selectMessageId = row.id;
      var index = this.selectedMessageItems.indexOf(selectMessageId);
      if (index < 0) {
        this.selectedMessageItems.push(selectMessageId);
      } else {
        this.selectedMessageItems.splice(index, 1);
      }
    },
    showMessageContent(row) {
      this.messageContent = row.content;
      this.centerDialogVisible = true;
      var index = this.readMessageIdList.indexOf(row.id);

      if (index >= 0) return;

      this.readMessageIdList.push(row.id);
      this.readMessage({
        messageIdList: this.readMessageIdList
      });
    },
    filterMessageList(filteType) {
      this.filteType = filteType;
      this.getMessageList();
    },
    removeSelectedMessage() {
      if (!this.selectedMessageItems || this.selectedMessageItems.length == 0) {
        this.$message.error("请选择需要删除的消息");
        return;
      }

      this.$confirm("您确定要删除选中的消息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteMessage({
            messageIdList: this.selectedMessageItems
          });
          this.$message({
            type: "success",
            message: "删除消息成功!"
          });
          this.reload();
        })
        .catch(() => {});
    },
    clearUpAllMessage() {
      this.$confirm("您确定要清空所有消息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteMessage({
            messageIdList: null
          });
          this.$message({
            type: "success",
            message: "清空消息成功!"
          });
          this.reload();
        })
        .catch(() => {});
    },
    getMessageList() {
      this.selectedMessageItems = [];
      if (this.filteType == 0) {
        this.getAllMessageList({
          pageNum: this.pager.currentPageNum,
          pagesize: this.pager.pageSize
        });
      }
      if (this.filteType == 1) {
        this.getAllReadMessageList({
          pageNum: this.pager.currentPageNum,
          pagesize: this.pager.pageSize
        });
      }
      if (this.filteType == -1) {
        this.getAllUnReadMessageList({
          pageNum: this.pager.currentPageNum,
          pagesize: this.pager.pageSize
        });
      }
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getMessageList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPageNum = val;
      this.getMessageList();
    },
    watchCourseVideo(id) {
      this.$router.replace("/coursevideo");
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
.title_message {
  text-align: center;
  font-family: "Helvetica Neue";
  font-size: 18px;
  color: 909399, blod;
}
.message {
  text-align: center;
  font-family: "Helvetica Neue";
  font-size: 16px;
  color: 909399, blod;
}
.div-right {
  float: right;
}
</style>
