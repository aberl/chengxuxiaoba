/**
 * 课程模块
 */
import {REQUEST_RECEIVE_COURSEALLLIST} from "../mutation-types.js";

import { reqGetAllCourseList } from "../../api";

const state = {
    courseList:[]
}

const actions={
    async getAllCourseList({commit}){
        const result = await reqGetAllCourseList();
        if(result.code == 0)
        {
            commit(REQUEST_RECEIVE_COURSEALLLIST,{courseList: result.data});
        }
    }
}

const mutations={
    [REQUEST_RECEIVE_COURSEALLLIST](state,{courseList}){
        state.courseList=courseList;
    }
}

export default {
    state,
    actions,
    mutations
  };