import reqUrl from "../urlConfig";
import fetch from "@/utility/http";
import { utility, getRequestSign } from "../../utility";
import download from 'downloadjs'

// this.token = localStorage.getItem("token");
// let file = this.$refs.avatarInput.files[0];
// params.append("file", file);
// params.append("token", this.token);
// params.append("ts", utility.getTs());
// params.append("version", "1.0.0");
// params.append("sign", getRequestSign(params));

// 创建试卷
let createParper = (examType, size, bookNo, columnNo, grade) =>
  fetch(
    reqUrl.CREATE_PARPER,
    {
      examType: examType,
      size: size,
      bookNo: bookNo,
      columnNo: columnNo,
      grade: grade
    },
    "POST"
  );

// 提交试卷
let postParper = data =>
  fetch(
    reqUrl.POST_PARPER,
    {
      data: data
    },
    "POST"
  );

// 获取试卷内容详情
let getParperDetail = examId =>
  fetch(
    reqUrl.GET_PARPER_DETAIL,
    {
      examId: examId
    },
    "GET"
  );

// 获取试卷列表
let getParperList = (page, size, examType) =>
  fetch(
    reqUrl.GET_PARPER_LIST,
    {
      page: page,
      size: size,
      examType: examType
    },
    "GET"
  );

// 下载试卷
let downloadGroupList = (examId, fileName) => {
  let params = {
    examId: examId,
    token: localStorage.getItem("token") || "",
    ts: utility.getTs(),
    version: "1.0.0"
  };
  params["sign"] = getRequestSign(params);







  let url = reqUrl.DOWN_LOAD_PARPER

  let paramArr = [];
  for (let key in params) {
    let val = params[key];
    if (val !== undefined && val !== null && val !== "") {
      paramArr.push(`${key}=${val}`);
    }
  }
  let paramStr = paramArr.join("&");
  let fileUlr = url + "?" + paramStr;





  // let fileUlr = url + `?examId=${examId}`
  //   download(fileUlr)
  //   window.open(fileUlr)

  var x = new XMLHttpRequest()
  x.open('GET', fileUlr, true)
  x.responseType = 'blob'
  x.onload = function (e) {
    download(e.target.response, fileName, 'application/msword')
  }
  x.send()
}









// let downloadGroupList = examId => {
//   let params = {
//     examId: examId,
//     token: localStorage.getItem("token") || "",
//     ts: utility.getTs(),
//     version: "1.0.0"
//   };
//   params["sign"] = getRequestSign(params);
//   let url = reqUrl.DOWN_LOAD_PARPER;
//   let paramArr = [];
//   for (let key in params) {
//     let val = params[key];
//     if (val !== undefined && val !== null && val !== "") {
//       paramArr.push(`${key}=${val}`);
//     }
//   }
//   let paramStr = paramArr.join("&");
//   let fileUlr = url + "?" + paramStr;
//   window.open(fileUlr);

// let fileUlr =
//   url +
//   `?examId=${examId}&` +
//   (token ? `token=${token}&` : "") +
//   (version ? `version=${version}&` : "") +
//   (ts ? `ts=${ts}&` : "") +
//   (sign ? `sign=${sign}&` : "");
// window.open(fileUlr);
// };

export default {
  createParper,
  postParper,
  getParperDetail,
  getParperList,
  downloadGroupList
};