export default function(apiRoot) {
  return {
    UPDATE_PASSWORD: apiRoot + "changePassword",
    GET_USER_INFO: apiRoot + "info",
    UPDATE_USER_INFO: apiRoot + "changeInfo",
    CHANGE_ICON: apiRoot + "changeIcon",
    SEARCH_DIVISION: apiRoot + "division/query",
    PAY_DATA: apiRoot + "order/create",
    GETSTATISTICSWORDS: apiRoot + "statistics/studentLearnWords",
    GETSTATISTICSWRONGWORDS: apiRoot + "statistics/studentWrongWords"
  };
}
