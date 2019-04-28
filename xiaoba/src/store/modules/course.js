/**
 * 课程模块
 */
import {REQUEST_RECEIVE_COURSEALLLIST,
    REQUEST_RECEIVE_COURSEDETAILS,
    REQUEST_MODIFY_COURSEDETAILS,
    REQUEST_ADD_COURSEDETAILS} from "../mutation-types.js";

import { reqGetAllCourseList,reqGetCourseDetails } from "../../api";

const state = {
    courseDetails:{name:"",desc:"",status:0,images:[]},
    courseList:[]
}

const actions={
    async addCourse({commit}, course){
        const result = await reqAddCourse(course.name,course.desc,course.images,course.status);
        if(result.code == 0)
        {
            commit(REQUEST_ADD_COURSEDETAILS,{courseList: result.data});
        }
    },
    async getAllCourseList({commit}){
        const result = await reqGetAllCourseList();
        if(result.code == 0)
        {
            commit(REQUEST_RECEIVE_COURSEALLLIST,{courseList: result.data});
        }
    },
    
    async getCourseDetails({commit},courseId){
        const result = await reqGetCourseDetails(courseId);
        if(result.code == 0)
        {
            commit(REQUEST_RECEIVE_COURSEDETAILS,{course: result.data});
        }
    },

    async modifyCourseDetails({commit}, courseDetails)
    {
        console.log(courseDetails)
    }
}

const mutations={
    [REQUEST_RECEIVE_COURSEALLLIST](state,{courseList}){
        state.courseList=courseList;
    },
    
    [REQUEST_RECEIVE_COURSEDETAILS](state,{course}){
        if(course == null)
        return;

        let _id=course.id;
        let _name = course.name;
        let _desc = course.description;
        let _status = course.status;
        let _images =  JSON.parse(course.images);
        let _imageDetail=[];
        if(_images != null &&  _images.length >0)
        {
            let nameIndex=-1;
            for(var index in _images)
            {
                nameIndex= _images[index].lastIndexOf("/");
                _imageDetail.push({name:_images[index].substr(nameIndex+1), url:_images[index], isNew:true});
            }
        }

        state.courseDetails={
            name: _name,
            desc: _desc,
            status: String(_status),
            images: _imageDetail
          }
    }
}

export default {
    state,
    actions,
    mutations
  };