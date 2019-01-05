import reqUrl from "../urlConfig";
import fetch from "@/utility/http";
let changePass = (oldPassword, password) =>
  fetch(
    reqUrl.UPDATE_PASSWORD,
    { oldPassword: oldPassword, password: password },
    "POST"
  );
let getUserInfo = () => fetch(reqUrl.GET_USER_INFO, {});
let upDateUserInfo = (name, gender, birthDate, grade, districtCode) =>
  fetch(
    reqUrl.UPDATE_USER_INFO,
    {
      name: name || "",
      gender: gender || "",
      birthDate: birthDate || "",
      grade: grade || "",
      districtCode: districtCode || ""
    },
    "POST"
  );
let changeIcon = file =>
  fetch(
    reqUrl.CHANGE_ICON,
    {
      file: file
    },
    "POST"
  );
let searchDivision = (divisionType, parentCode) =>
  fetch(reqUrl.SEARCH_DIVISION, {
    divisionType: divisionType,
    parentCode: parentCode || ""
  });
let pay = (productNo, payType, tradeType) =>
  fetch(
    reqUrl.PAY_DATA,
    {
      productNo: productNo,
      payType: payType,
      tradeType: tradeType
    },
    "POST"
  );

// 统计学会的单词
let getStatisticsWords = (studentNo, statisticsType, start, end) =>
  fetch(
    reqUrl.GETSTATISTICSWORDS,
    {
      studentNo: studentNo,
      statisticsType: statisticsType,
      start: start,
      end: end
    },
    "GET"
  );
// 统计错词
let getStatisticsWrongWords = (studentNo, statisticsType, start, end) =>
  fetch(
    reqUrl.GETSTATISTICSWRONGWORDS,
    {
      studentNo: studentNo,
      statisticsType: statisticsType,
      start: start,
      end: end
    },
    "GET"
  );
export default {
  changePass,
  getUserInfo,
  upDateUserInfo,
  changeIcon,
  searchDivision,
  pay,
  getStatisticsWords,
  getStatisticsWrongWords
};
