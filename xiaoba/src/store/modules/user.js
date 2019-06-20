/**
 * 用户模块
 */
import {
  reqGetUserList,
  reqGetUserInfo,
  reqGetRoleList,
  reqModifyUser,
  reqGetRole
} from "../../api";

import {
  REQUEST_RECEIVE_USERALLLIST,
  REQUEST_RECEIVE_USERINFO,
  REQUEST_CONSERVE_USERINFO,
  REQUEST_REMOVE_USERINFO,
  REQUEST_RECEIVE_ROLEALLLIST,
  REQUEST_UPDATE_USERINFO,
  REQUEST_RECEIVE_ROLE
} from "../mutation-types.js";

const state = {
  usercount: 0,
  userlist: { currentNum: 1, data: [], totalCount: 0 },
  userInfo: {}, //|| JSON.parse(localStorage.getItem("userInfo"))
  roles: [],
  result: {},
  role: {}
};

const actions = {
  async getrole({ commit}, id ) {
    const result = await reqGetRole(id);
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_ROLE, { role: result.data });
    }
  },
  async getrolelist({ commit }) {
    const result = await reqGetRoleList();
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_ROLEALLLIST, { roles: result.data });
    }
  },
  async getuserlist({ commit }, { pageNum, pagesize, query }) {
    const result = await reqGetUserList(pageNum, pagesize, "-id", query);
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_USERALLLIST, { userlist: result.data });
    }
  },
  async getuserinfo({ commit }, id) {
    const result = await reqGetUserInfo(id);
    if (result.code == 0) {
      result.data["status"] = String(result.data.status);
      console.log(result.data.status);
      commit(REQUEST_RECEIVE_USERINFO, { userInfo: result.data });
    }
  },
  async updateUserInfo({ commit }, userInfo) {
    const result = await reqModifyUser(userInfo);
    commit(REQUEST_UPDATE_USERINFO, { result });
  },
  receiveUserInfo({ commit }, userInfo) {
    commit(REQUEST_RECEIVE_USERINFO, { userInfo });
  },
  conserveUserInfo({ commit }, userInfo) {
    commit(REQUEST_CONSERVE_USERINFO, { userInfo });
  },
  getUserInfo({ commit }) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo == null) {
      return;
    }

    commit(REQUEST_RECEIVE_USERINFO, { userInfo });
  },
  removeUserInfo({ commit }) {
    commit(REQUEST_REMOVE_USERINFO);
  }
};

const mutations = {
  [REQUEST_RECEIVE_ROLE](state, { role }) {
    state.role = role;
    // for(var val in roles)
    // {
    //   state.roles.push({name:roles[val], value:val});
    // }
  },
  [REQUEST_RECEIVE_ROLEALLLIST](state, { roles }) {
    state.roles = roles;
    // for(var val in roles)
    // {
    //   state.roles.push({name:roles[val], value:val});
    // }
  },
  [REQUEST_UPDATE_USERINFO](state, { result }) {
    state.result = result;
  },
  [REQUEST_RECEIVE_USERALLLIST](state, { userlist }) {
    state.userlist.data = userlist.data;
    state.userlist.totalCount = userlist.totalCount;
    state.userlist.currentNum = userlist.currentNum;
  },
  [REQUEST_RECEIVE_USERINFO](state, { userInfo }) {

  },
  [REQUEST_CONSERVE_USERINFO](state, { userInfo }) {
    if(userInfo.vipEndDate != null)
    {
      userInfo.vipEndDate=userInfo.vipEndDate.substring(0,10);
    }
    state.userInfo = userInfo;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  },
  [REQUEST_REMOVE_USERINFO](state) {
    state.userInfo = {};
    localStorage.removeItem("userInfo");
  }
};

export default {
  state,
  actions,
  mutations
};
