/**
 * 用户模块
 */
import { reqGetUserList,reqGetUserInfo } from "../../api";

import {
  REQUEST_RECEIVE_USERALLLIST,
  REQUEST_RECEIVE_USERINFO,
  REQUEST_CONSERVE_USERINFO,
  REQUEST_REMOVE_USERINFO
} from "../mutation-types.js";

const state = {
  usercount:0,
  userlist:{currentNum:1,data:[],totalCount:0},
  userInfo: {} //|| JSON.parse(localStorage.getItem("userInfo"))
};

const actions = {
  async getuserlist({commit},{pageNum,pagesize,query}){
    const result = await reqGetUserList(pageNum, pagesize, "-id",query);
    if (result.code == 0) {
      commit(REQUEST_RECEIVE_USERALLLIST, { userlist: result.data });
    }
  },
  async getuserinfo({commit},id){
    const result = await reqGetUserInfo(id);
    if (result.code == 0) {
    
      result.data["status"] = String(result.data.status);
      console.log(result.data.status)
      commit(REQUEST_RECEIVE_USERINFO, { userInfo:result.data });
    }
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
  [REQUEST_RECEIVE_USERALLLIST](state,{userlist}){
    state.userlist.data=userlist.data
    state.userlist.totalCount=userlist.totalCount
    state.userlist.currentNum=userlist.currentNum
  },
  [REQUEST_RECEIVE_USERINFO](state, { userInfo }) {
    state.userInfo =userInfo;
    // state.userInfo = {
    //   name:userInfo.name,
    //   headerImg:userInfo.headerImg,
    //   mobilePhoneNo:userInfo.mobilePhoneNo,
    //   wechatAccount:userInfo.wechatAccount,
    //   wechatHeaderImg:userInfo.wechatHeaderImg,
    //   status:userInfo.status,
    //   statusDesc:userInfo.statusDesc,
    //   createDateTime:userInfo.createDateTime
    // }
  },
  [REQUEST_CONSERVE_USERINFO](state, { userInfo }) {
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
