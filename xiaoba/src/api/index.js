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
 *  获取用户列表
 * @param {*} pageNum
 * @param {*} pageSize
 * @param {*} sort
 */
export const reqGetUserList = (pageNum, pageSize, sort, query) =>
  ajax(
    BASE_URL +
      "/users/?query=" +
      query +
      "&pagenum=" +
      pageNum +
      "&sort=" +
      sort +
      "&pagesize=" +
      pageSize
  );

/**
 * 根据用户手机号获取用户信息
 * @param {*} mobilePhoneNo
 */
export const reqGetUserInfoByMobilePhone = mobilePhoneNo =>
  ajax(BASE_URL + "/users/mobilephoneno/" + mobilePhoneNo);

/**
 * 根据id获取用户信息
 * @param {*} id
 */
export const reqGetUserInfo = id => ajax(BASE_URL + "/users/" + id);

export const reqModifyUser = user =>
  ajax(BASE_URL + "/users/account", user, "PUT");

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
 *  更新用户角色
 * @param {*} userId 
 * @param {*} roleIdArray 
 */
export const reqUpdateUserRoleRelationship = (userId, roleId) =>
ajax(
  BASE_URL + "/users/updaterole",
  { "id":userId,"role":roleId },
  "PUT"
);

/**
 * 获取角色集合
 */
export const reqGetRoleList = () => ajax(BASE_URL + "/role/roles");

/**
 * 获取角色
 */
export const reqGetRole = (id) => ajax(BASE_URL + "/role/"+id);

/**
 * 获取角色支付列表
 */
export const reqGetRolePaymentList = (id) => ajax(BASE_URL + "/role/"+id+"/rolepaymentlist");

/**
 * 上传文件
 * @param {*} purpose
 * @param {*} uploadFile
 */
export const reqUploadFile = (form, config) =>
  ajax(BASE_URL + "/uploadfile/file", form, "POST", config);

/**
 * 删除文件
 * @param {*} filename
 */
export const reqRemoveUploadFile = filename =>
  ajax(BASE_URL + "/uploadfile/" + filename, null, "DELETE");

/**
 * 添加课程
 * @param {*} name
 * @param {*} description
 * @param {*} images
 * @param {*} status
 */
export const reqAddCourse = (name, description, images, status) =>
  ajax(BASE_URL + "/courses", { name, description, images, status }, "POST");

/**
 * 获取所有课程列表
 */
export const reqGetAllCourseList = () => ajax(BASE_URL + "/courses");

/**
 * 获取所有有效课程列表
 */
export const reqGetAllEffectiveCourseList = () =>
  ajax(BASE_URL + "/courses/effective");
/**
 * 获取课程详情
 */
export const reqGetCourseDetails = courseId =>
  ajax(BASE_URL + "/courses/" + courseId);

/**
 * 更新课程
 * @param {*} name
 * @param {*} description
 * @param {*} images
 * @param {*} status
 */
export const reqModifyCourse = (id, name, description, images, status) =>
  ajax(BASE_URL + "/courses", { id, name, description, images, status }, "PUT");

/**
 * 添加课程模块
 * @param {*} courseId
 * @param {*} name
 * @param {*} description
 * @param {*} images
 * @param {*} status
 */
export const reqAddCourseModule = (
  courseId,
  courseName,
  name,
  description,
  images,
  status
) =>
  ajax(
    BASE_URL + "/courses/module",
    { courseId, courseName, name, description, images, status },
    "POST"
  );

/**
 * 更新课程
 * @param {*} name
 * @param {*} description
 * @param {*} images
 * @param {*} status
 */
export const reqModifyCourseModule = (
  id,
  courseId,
  courseName,
  name,
  description,
  images,
  status
) =>
  ajax(
    BASE_URL + "/courses/module",
    { id, courseId, courseName, name, description, images, status },
    "PUT"
  );

/**
 * 获取所有课程模块列表
 */
export const reqGetAllCourseModuleList = courseId =>
  ajax(BASE_URL + "/courses/" + courseId + "/coursemodule/all");

/**
 * 获取所有有效课程模块列表
 */
export const reqGetAllEffectiveCourseModuleList = courseId =>
  ajax(BASE_URL + "/courses/" + courseId + "/coursemodule/effective");
/**
 * 获取课程模块详情
 */
export const reqGetCourseModuleDetails = courseModuleId =>
  ajax(BASE_URL + "/courses/coursemodule/" + courseModuleId);

/**
 * 添加视频
 * @param {*} courseModuleId
 * @param {*} file
 * @param {*} name
 * @param {*} attachments
 * @param {*} duration
 * @param {*} description
 */
export const reqAddVideo = (
  courseModuleId,
  file,
  name,
  attachments,
  duration,
  description,
  status
) =>
  ajax(
    BASE_URL + "/videos",
    { courseModuleId, file, name, attachments, duration, description, status },
    "POST"
  );

/**
 * 增加视频观看记录
 * @param {*} videoId
 */
export const reqIncreaseVideoWatchRecord = (videoId, watchAccountId) =>
  ajax(
    BASE_URL + "/videos/record",
    { id: videoId, watchAccountId: watchAccountId },
    "POST"
  );

/**
 * 获取视频列表
 * @param {*} courseModuleId
 * @param {*} pageNum
 * @param {*} pageSize
 * @param {*} sort
 */
export const reqGetAllVideoList = (courseModuleId, pageNum, pageSize, sort) =>
  ajax(
    BASE_URL +
      "/courses/" +
      courseModuleId +
      "/videos?pagenum=" +
      pageNum +
      "&sort=" +
      sort +
      "&pagesize=" +
      pageSize
  );

/**
 * 获取视频
 */
export const reqGetVideo = videoId => ajax(BASE_URL + "/videos/" + videoId);

/**
 * 修改视频
 * @param {*} id
 * @param {*} file
 * @param {*} name
 * @param {*} attachments
 * @param {*} duration
 * @param {*} description
 * @param {*} status
 * @param {*} viewCount
 * @param {*} praiseCount
 */
export const reqModifyVideo = (
  id,
  file,
  name,
  attachments,
  duration,
  description,
  status,
  viewCount,
  praiseCount
) =>
  ajax(
    BASE_URL + "/videos",
    {
      id,
      file,
      name,
      attachments,
      duration,
      description,
      status,
      viewCount,
      praiseCount
    },
    "PUT"
  );

/**
 * 添加评论
 * @param {*} videoId
 * @param {*} content
 * @param {*} stars
 * @param {*} accountId
 */
export const reqAddEvaluate = (videoId, content, stars, accountId) =>
  ajax(
    BASE_URL + "/videos/evaluates",
    { videoId, content, stars, accountId },
    "POST"
  );
  
/**
 * 删除评论
 * @param {*} filename
 */
export const reqRemoveEvaluate = evaluateId =>
ajax(BASE_URL + "/videos/evaluate/" + evaluateId, null, "DELETE");

/**
 * 获取评论列表
 * @param {*} videoId
 * @param {*} pageNum
 * @param {*} pageSize
 * @param {*} sort
 */
export const reqGetAllEvaluatesList = (videoId, pageNum, pageSize, sort) =>
  ajax(
    BASE_URL +
      "/videos/" +
      videoId +
      "/evaluates?pagenum=" +
      pageNum +
      "&sort=" +
      sort +
      "&pagesize=" +
      pageSize
  );

/**
 * 获取指定用户评论列表
 * @param {*} userId
 * @param {*} pageNum
 * @param {*} pageSize
 * @param {*} sort
 */
export const reqGetUserAllEvaluatesList = (userId, pageNum, pageSize, sort) =>
  ajax(
    BASE_URL +
      "/users/" +
      userId +
      "/evaluates?pagenum=" +
      pageNum +
      "&sort=" +
      sort +
      "&pagesize=" +
      pageSize
  );

  /**
 * 获取有效的评论列表
 * @param {*} videoId
 * @param {*} pageNum
 * @param {*} pageSize
 * @param {*} sort
 */
export const reqGetEffectiveEvaluatesList = (videoId, pageNum, pageSize, sort) =>
ajax(
  BASE_URL +
    "/videos/" +
    videoId +
    "/evaluates/effective?pagenum=" +
    pageNum +
    "&sort=" +
    sort +
    "&pagesize=" +
    pageSize
);


/**
 * 创建问题
 * @param {*} videoId
 * @param {*} name
 * @param {*} content
 * @param {*} questionerId
 */
export const reqAddIssues = (videoId, name, content, questionerId) =>
  ajax(
    BASE_URL + "/videos/issues",
    { videoId, name, content, questionerId },
    "POST"
  );

/**
 * 根据视频获取问题列表
 * @param {*} videoId
 * @param {*} pageNum
 * @param {*} pageSize
 * @param {*} sort
 */
export const reqGetAllIssueList = (videoId, pageNum, pageSize, sort) =>
  ajax(
    BASE_URL +
      "/videos/" +
      videoId +
      "/issues?pagenum=" +
      pageNum +
      "&sort=" +
      sort +
      "&pagesize=" +
      pageSize
  );

/**
 *  获取指定用户问题列表
 * @param {*} userId
 * @param {*} pageNum
 * @param {*} pageSize
 * @param {*} sort
 */
export const reqGetUserAllIssueList = (userId, pageNum, pageSize, sort) =>
  ajax(
    BASE_URL +
      "/users/" +
      userId +
      "/issues?pagenum=" +
      pageNum +
      "&sort=" +
      sort +
      "&pagesize=" +
      pageSize
  );

/**
 * 回答问题
 * @param {*} issueId
 * @param {*} content
 * @param {*} answererId
 */
export const reqAnswerIssue = (issueId, content, answererId) =>
  ajax(BASE_URL + "/answer", { issueId, content, answererId }, "POST");

  /**
   * 获取问题回答列表
   * @param {*} issueId 
   */
export const reqGetAllAnswerList = issueId =>
  ajax(BASE_URL + "/issues/" + issueId + "/answers");


  
/**
 * 获取问题
 */
export const reqGetIssue = issueId => ajax(BASE_URL + "/video/issues/" + issueId);


/**
 * 获取视频观看统计
 */
export const reqVideoWatchingRecordStatistic = accountId => ajax(BASE_URL + "/videos/recordstatistic/" + accountId);

/**
 * 获取视频观看列表
 */
export const reqVideoRecordList = 
(accountId, courseModuleId) => ajax(BASE_URL + "/videos/record/" + accountId+"/"+courseModuleId);