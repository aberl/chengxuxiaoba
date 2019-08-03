/**
 * 消息模块
 */
import {
  REQUEST_RECEIVE_ALLMESSAGELIST,
  REQUEST_RECEIVE_UNREADMESSAGELIST,
  REQUEST_RECEIVE_READMESSAGELIST,
  REQUEST_RECEIVE_UNREADMESSAGECOUNT,
  REQUEST_READ_MESSAGE,
  REQUEST_DELETE_MESSAGE
} from "../mutation-types.js";

import {
  reqGetAllMessageList,
  reqReadMessage,
  reqDeleteMessage,
  reqGetUnReadMessageCount
} from "../../api";

const state = {
  message: {},
  messageList: { currentNum: 1, data: [], totalCount: 0 },
  unReadMessageCount:0,
  result: {}
};

const actions = {
  async getAllMessageList({ commit }, {pageNum, pagesize }) {
    const result = await reqGetAllMessageList(
      "",
      pageNum,
      pagesize,
      "id"
    );
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_ALLMESSAGELIST, { messageList: result.data });
    }
  },
  async getAllUnReadMessageList({ commit }, {pageNum, pagesize }) {
    const result = await reqGetAllMessageList(
      0,
      pageNum,
      pagesize,
      "id"
    );
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_UNREADMESSAGELIST, { messageList: result.data });
    }
  },
  async getAllReadMessageList({ commit }, {pageNum, pagesize }) {
    const result = await reqGetAllMessageList(
      1,
      pageNum,
      pagesize,
      "id"
    );
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_READMESSAGELIST, { messageList: result.data });
    }
  },
  async getUnReadMessageCount({ commit }) {
    const result = await reqGetUnReadMessageCount();
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_UNREADMESSAGECOUNT, { unReadMessageCount: result.data });
    }
  },
  async readMessage({ commit }, {messageIdList}) {
    const result = await reqReadMessage(
        messageIdList
    );
    commit(REQUEST_READ_MESSAGE, { result: result });
  },
  async deleteMessage({ commit }, {messageIdList}) {
    const result = await reqDeleteMessage(
        messageIdList
    );
    commit(REQUEST_DELETE_MESSAGE, { result: result });
  },
};

const mutations = {
  [REQUEST_RECEIVE_ALLMESSAGELIST](state, { messageList }) {
    var _data=generateNewMessageList(messageList);
    state.messageList.data = _data;
    state.messageList.totalCount = messageList.totalCount;
    state.messageList.currentNum = messageList.currentNum;
  },
  [REQUEST_RECEIVE_UNREADMESSAGELIST](state, { messageList }) {
    var _data=generateNewMessageList(messageList);
    state.messageList.data = _data;
    state.messageList.totalCount = messageList.totalCount;
    state.messageList.currentNum = messageList.currentNum;
  },
  [REQUEST_RECEIVE_READMESSAGELIST](state, { messageList }) {
    var _data=generateNewMessageList(messageList);
    state.messageList.data = _data;
    state.messageList.totalCount = messageList.totalCount;
    state.messageList.currentNum = messageList.currentNum;
  },
  [REQUEST_RECEIVE_UNREADMESSAGECOUNT](state, { unReadMessageCount }) {
    state.unReadMessageCount = unReadMessageCount;
  },
  [REQUEST_READ_MESSAGE](state, { result }) {
    state.result = result;
  },
  [REQUEST_DELETE_MESSAGE](state, { result }) {
    state.result = result;
  },
};

function generateNewMessageList(messageList){
    var _date = [];
    if (messageList.data != null && messageList.data.length > 0) {
        for (var index in messageList.data) {
            var _item = messageList.data[index];
            _date.push({
                index: Number(index) + 1,
                id: _item.id,
                name: _item.name,
                content: _item.content,
                status: _item.status,
                category: _item.category,
                categoryDesc: _item.categoryDesc,
                createDateTime: _item.createDateTime
            });
          }
    }
    return _date;
}

export default {
  state,
  actions,
  mutations
};
