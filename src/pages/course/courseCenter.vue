<template>
  <div class="course-center cnfont">
    <nav-header :showBack="false">
      <div slot="title">课程中心</div>
    </nav-header>
    <el-tabs v-loading="loading" element-loading-text="拼命加载中" v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane :label="item.name" v-for="item in list" :key="item.key" :name="item.key">
        <ul >
          <div class="clearfix linn-ling">
            <div v-for="item in item.groups" :key="item.key" class="book-over clearfix">
              <div class="course-booklist clearfix">
                {{item.name}}
              </div>
              <li v-for="book in item.books" :key="book.value" @click="courseDialog(book)" class="book-img clearfix">
                <img :src='url+book.coverImgUrl' class="bookImg">
                <div>{{book.name}}</div>
              </li>
            </div>
          </div>
        </ul>
      </el-tab-pane>
    </el-tabs>
    <course-dialog :show.sync="courseDialogShow" :bookInfo="bookInformantion"></course-dialog>
  </div>
</template>

<script>
import navHeader from "@/components/navHeader";
import dataService from "@/service/index";
import { ResourcePath } from "../../service/urlConfig";
import courseDialog from "./courseDialog";
import { BOOK_CATEGORY, BOOK_COLUMN_TYPE } from "../../utility/dict";
export default {
  components: {
    navHeader,
    courseDialog
  },
  data() {
    return {
      loading: false,
      bookInformantion: {},
      courseDialogShow: false,
      url: ResourcePath,
      page: 0,
      activeName: "FREE",
      bookList: [],
      bookSort: "",
      bookType: "",
      list: []
    };
  },
  mounted() {
    this.getList();
    let categoryObj = {};
    for (let key in BOOK_CATEGORY) {
      let val = BOOK_CATEGORY[key];
      categoryObj[key] = {
        key: key,
        name: val,
        books: []
      };
    }
  },
  methods: {
    courseDialog(val) {
      console.log("index", val);
      this.bookInformantion = val;
      this.courseDialogShow = true;
    },
    showDialog() {},
    handleClick(tab, event, activeName) {
      this.bookType = this.activeName;
    },
    getList() {
      this.loading = true;
      let categoryObj = {};
      for (let key in BOOK_CATEGORY) {
        let val = BOOK_CATEGORY[key];
        categoryObj[key] = {
          key: key,
          name: val,
          books: []
        };
      }
      this.list = [];
      dataService.getBookList(0, 1000, "", this.bookType).then(
        res => {
          let result = res.data;
          let code = result.code;
          let data = result.data;
          if (code === 200) {
            this.loading = false;
            data.content.forEach(item => {
              let key = item.bookType;
              let categoryItem = categoryObj[key];
              if (categoryItem) {
                categoryItem.books.push(item);
              }
            });
            let categories = [];
            for (let key in categoryObj) {
              let val = categoryObj[key];
              let books = val.books;
              // 课本分组
              let groups = [];
              books.forEach(item => {
                let type = item.bookSort;
                let groupItem = groups.find(group => {
                  return group.key === type;
                });
                if (!groupItem) {
                  groupItem = {
                    key: type,
                    name: BOOK_COLUMN_TYPE[type] || "",
                    books: []
                  };
                  groups.push(groupItem);
                }
                groupItem.books.push(item);
              });

              categories.push({
                key: key,
                name: BOOK_CATEGORY[key] || "",
                groups: groups
              });
              this.list = categories;
              console.log(this.list, "------------- this.list");
            }
          }
        },
        () => {
          this.$message.error("请求错误");
          this.loading = false;
        }
      );
    }
  }
};
</script>

<style lang="scss" >
.course-center {
  width: 100%;
  height: 100%;
  position: relative;
  .clearfix:after {
    content: "";
    display: table;
    clear: both;
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    color: #fff;
    background: #409eff;
    border-right-color: #dcdfe6;
    border-left-color: #dcdfe6;
  }
  .el-tab-pane div {
    color: #409eff;
    font-size: 14px;
  }
  .bookImg {
    width: 120px;
    height: 120px;
    img {
      width: 100%;
    }
  }
  .bookTop {
    position: static;
    left: 0;
    box-sizing: border-box;
    width: 100%;
  }
  .el-tabs--border-card > .el-tabs__content {
    padding: 0;
  }
  ul {
    list-style: none;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .linn-ling {
      position: fixed;
      top: 97px;
      right: 0;
      left: 0;
      bottom: 59px;
      overflow: auto;
      .book-over {
        padding-left: 30px;
        min-width: 1000px;
        .course-booklist {
          width: 100%;
          height: 40px;
          line-height: 40px;
          margin-top: 10px;
          background: linear-gradient(to right, #f7f7f7, #fff);
          border-left: 5px solid #409eff;
          padding-left: 10px;
          box-sizing: border-box;
        }
      }
      .book-img {
        float: left;
        width: 120px;
        height: 180px;
        margin: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
