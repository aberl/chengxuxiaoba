import ajax from "./ajax";

const BASE_URL = "/api";

/**
 * 发生验证码
 * @param {*} mobilePhoneNo
 * @param {*} category
 */
export const reqSendValidationCode = (mobilePhoneNo, category) =>
  ajax(BASE_URL + "/validation/code", { mobilePhoneNo, category }, "POST");

/**
 * 注册
 * @param {*} mobilePhoneNo
 * @param {*} validationCode
 * @param {*} password
 */
export const reqRegisterAccount = (mobilePhoneNo, validationCode, password) =>
  ajax(
    BASE_URL + "/users/account",
    { mobilePhoneNo, validationCode, password },
    "POST"
  );

/**
 * 根据用户手机号获取用户信息
 * @param {*} mobilePhoneNo
 */
export const reqGetUserInfoByMobilePhone = mobilePhoneNo =>
  ajax(BASE_URL + "/users/mobilephoneno/" + mobilePhoneNo);

/**
 * 用户登录
 * @param {*} mobilePhoneNo
 * @param {*} password
 */
export const reqLogin = (mobilePhoneNo, password) =>
  ajax(BASE_URL + "/users/token", { mobilePhoneNo, password }, "POST");

/**
 * 修改密碼
 * @param {*} mobilePhoneNo
 * @param {*} validationCode
 * @param {*} password
 */
export const reResetPassword = (mobilePhoneNo, validationCode, password) =>
  ajax(
    BASE_URL + "/users/password",
    { mobilePhoneNo, validationCode, password },
    "PUT"
  );

/**
 * 上传文件
 * @param {*} purpose 
 * @param {*} uploadFile 
 */
export const reqUploadFile = (form,config) =>
ajax(
  BASE_URL + "/uploadfile/file",
  form,
  "POST",
  config
);

/**
 * 删除文件
 * @param {*} filename 
 */
export const reqRemoveUploadFile = (filename) =>
ajax(
  BASE_URL + "/uploadfile/"+filename,null,
  "DELETE"
);

/**
 * 添加课程
 * @param {*} name 
 * @param {*} description 
 * @param {*} images 
 * @param {*} status 
 */
export const reqAddCourse = (name,description,images,status) =>
ajax(
  BASE_URL + "/courses",
  {name,description,images,status},
  "POST"
);

/**
 * 获取所有课程列表
 */
export const reqGetAllCourseList = ()=>
  ajax(BASE_URL + "/courses");

  /**
 * 获取课程详情
 */
export const reqGetCourseDetails = (courseId)=>
ajax(BASE_URL + "/courses/"+courseId);

/**
 * 更新课程
 * @param {*} name 
 * @param {*} description 
 * @param {*} images 
 * @param {*} status 
 */
export const reqModifyCourse = (id,name,description,images,status) =>
ajax(
  BASE_URL + "/courses",
  {id,name,description,images,status},
  "PUT"
);