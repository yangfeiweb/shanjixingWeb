export default function(apiRoot) {
  return {
    CREATE_PARPER: apiRoot + "exam/create", // 创建试卷
    POST_PARPER: apiRoot + "exam/finish", // 提交试卷
    GET_PARPER_DETAIL: apiRoot + "exam/detail", // 获取试卷内容详情
    GET_PARPER_LIST: apiRoot + "exam/list", // 获取试卷列表
    DOWN_LOAD_PARPER: apiRoot + "exam/download" // 下载试卷
  };
}
