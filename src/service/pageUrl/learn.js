export default function(apiRoot) {
  return {
    GET_BOOK_COLUMN: apiRoot + "bookColumn/list",
    GET_BOOK_REVIEW_WORDS: apiRoot + "book/reviewWords",
    GET_BOOKCOLUMN_REVIEW_WORDS: apiRoot + "bookColumn/reviewWords",
    GET_BOOKCOLUMN_LEARN_WORDS: apiRoot + "bookColumn/learnWords",
    ADD_COLUMN_LEARN_WORDS: apiRoot + "word/addColumnLearnWords",
    ADD_COLUMN_WORDS_NOTES: apiRoot + "word/addColumnWordNotes",
    CLEARLEARN: apiRoot + "clearColumn",
    SYNCADD: apiRoot + "sync/add",
    ASSETS_LSIT: apiRoot + "/asset/list", // 资源列表
    COLUMNALLWORDS: apiRoot + "bookColumn/allWords",
    ADDBOOKRECORD: apiRoot + "bookRecord/add"
  };
}
