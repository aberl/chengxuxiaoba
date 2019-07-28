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
              <el-select v-model="value" placeholder="请勾选">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-button type="info" plain>删除</el-button>
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
        <el-row class="border-gray title_message">
          <el-col :span="4">类型</el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple-light">名称</div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">创建时间</div>
          </el-col>
        </el-row>

        <el-row class="border-gray message" v-for="message in messageList" :key="message.id">
          <el-col :span="4" class="message">
            <el-checkbox v-bind="message.id" @change="selectedMessage"/>
            &nbsp;{{message.categoryDesc}}
          </el-col>
          <el-col :span="10">
            <el-link @click="showMessageContent(message)" target="_blank">{{message.name}}</el-link>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">{{message.createDateTime}}</div>
          </el-col>
        </el-row>
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
    <footerGuide />
    <el-dialog title="消息内容" :visible.sync="centerDialogVisible" width="30%" center>
      <span>{{messageContent}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    {{array}}
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
      array:[],
      messageContent: "",
      centerDialogVisible: false,
      readMessageIdList: [],
      //-1:未读，1：已读，0:全部
      filteType: 0,
      pager: {
        currentPageNum: 1,
        pagesizes: [20, 40, 60, 80, 100],
        pageSize: 20
      },
      options: [
        {
          value: "选项1",
          label: "全选"
        },
        {
          value: "选项2",
          label: "全不选"
        }
      ],
      value: ""
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
  methods: {
    ...mapActions([
      "getAllMessageList",
      "getAllUnReadMessageList",
      "getAllReadMessageList",
      "readMessage",
      "deleteMessage"
    ]),
    selectedMessage(val) {
      alert(val);
    },
    showMessageContent(message) {
      this.messageContent = message.content;
      this.centerDialogVisible = true;
      var index = this.readMessageIdList.indexOf(message.id);

      if (index >= 0) return;

      this.readMessageIdList.push(message.id);
      this.readMessage({
        userId: this.userId,
        messageIdList: this.readMessageIdList
      });
    },
    filterMessageList(filteType) {
      this.filteType = filteType;
      this.getMessageList();
    },
    clearUpAllMessage() {
      this.$confirm("您确定要清空所有消息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteMessage({
            userId: this.userId,
            messageIdList: null
          });
          this.$message({
            type: "success",
            message: "清空消息成功!"
          });
        })
        .catch(() => {});
    },
    getMessageList() {
      if (this.filteType == 0) {
        this.getAllMessageList({
          userId: this.userId,
          pageNum: this.pager.currentPageNum,
          pagesize: this.pager.pageSize
        });
      }
      if (this.filteType == 1) {
        this.getAllReadMessageList({
          userId: this.userId,
          pageNum: this.pager.currentPageNum,
          pagesize: this.pager.pageSize
        });
      }
      if (this.filteType == -1) {
        this.getAllUnReadMessageList({
          userId: this.userId,
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
