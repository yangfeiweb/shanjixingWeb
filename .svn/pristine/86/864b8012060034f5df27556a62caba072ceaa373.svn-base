import reqUrl from "../urlConfig";
import fetch from "@/utility/http";
// 查询课本栏目的信息
let getBookColumn = (size, learnType, bookNo) =>
    fetch(
        reqUrl.GET_BOOK_COLUMN, {
            size: size || "",
            learnType: learnType,
            bookNo: bookNo
        },
        "GET"
    );
// 查询课本需要复习的单词
let getBookReviewWords = (page, size, learnType, bookNo) =>
    fetch(
        reqUrl.GET_BOOK_REVIEW_WORDS, {
            page: page || "",
            size: size || "",
            learnType: learnType,
            bookNo: bookNo
        },
        "GET"
    );
// 查询栏目中需要复习的单词
let getBookColumnReviewWords = (page, size, learnType, columnNo) =>
    fetch(
        reqUrl.GET_BOOKCOLUMN_REVIEW_WORDS, {
            page: page || "",
            size: size || "",
            learnType: learnType,
            columnNo: columnNo
        },
        "GET"
    );
// 查询栏目中需要学习的单词
let getBookColumnLearnWords = (page, size, learnType, columnNo) =>
    fetch(
        reqUrl.GET_BOOKCOLUMN_LEARN_WORDS, {
            page: page || "",
            size: size || "",
            learnType: learnType,
            columnNo: columnNo
        },
        "GET"
    );
// 新增栏目中学会的单词
let addColumnLearnWords = data =>
    fetch(
        reqUrl.ADD_COLUMN_LEARN_WORDS, {
            data: data || ""
        },
        "POST"
    );
// 新增栏目中错误的单词
let addColumnWordsNotes = data =>
    fetch(
        reqUrl.ADD_COLUMN_WORDS_NOTES, {
            data: data || ""
        },
        "POST"
    );
// 清空本栏目学习记录
let clearLearn = (bookNo, columnNo) =>
    fetch(
        reqUrl.CLEARLEARN, {
            bookNo: bookNo,
            columnNo: columnNo
        },
        "POST"
    );
//   新增学习的信息
let syncAdd = (syncData, syncType) =>
    fetch(
        reqUrl.SYNCADD, {
            syncData: syncData,
            syncType: syncType
        },
        "POST", ["syncData"]
    );
//   查询栏目的全部单词
let columnAllWords = columnNo =>
    fetch(
        reqUrl.COLUMNALLWORDS, {
            columnNo: columnNo
        },
        "GET"
    );
//   新增课本学习记录
let addBookRecord = (learnType, bookNo) =>
    fetch(
        reqUrl.ADDBOOKRECORD, {
            learnType: learnType,
            bookNo: bookNo
        },
        "POST"
    );

// 获取资源列表
let getAssetsList = (page, size, type) =>
    fetch(reqUrl.ASSETS_LSIT, {
        page: page,
        size: size,
        assetType: type
    });
export default {
    getBookColumn,
    getBookReviewWords,
    getBookColumnReviewWords,
    getBookColumnLearnWords,
    addColumnLearnWords,
    addColumnWordsNotes,
    clearLearn,
    syncAdd,
    columnAllWords,
    addBookRecord,
    getAssetsList
};