import reqUrl from "../urlConfig";
import fetch from "@/utility/http";
let getBookList = (page, size, bookSort, bookType) =>
  fetch(reqUrl.GET_BOOK_LIST, {
    page: page,
    size: size || "",
    bookSort: bookSort || "",
    bookType: bookType || ""
  });
let unKnownWord = (page, size, bookNo, learnType) =>
  fetch(reqUrl.GET_UNKNOWN_WORD, {
    page: page || "",
    size: size || "",
    bookNo: bookNo,
    learnType: learnType || ""
  });
let downBook = (bookNo, status) =>
  fetch(
    reqUrl.DOWN_BOOK,
    {
      bookNo: bookNo,
      status: status
    },
    "POST"
  );
let getDownBookList = (page, size) =>
  fetch(reqUrl.GET_DOWNBOOK_LIST, {
    page: page,
    size: size
  });
export default { getBookList, unKnownWord, downBook, getDownBookList };
