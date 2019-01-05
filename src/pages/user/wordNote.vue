<template>
  <div class="unKnowWord clear">
    <div class="header">
      <nav-header :showBack='false'>
        <div slot="title" class="shopping-title">
          <div class='areas'>
            <span class="area-item">生词本</span>
          </div>
        </div>
      </nav-header>
    </div>
    <div class="book-container" v-if="listShow">
      <ul class="book-list" v-loading="newwordLoading" element-loading-text="拼命加载中">
        <li class="list-item clearfix" v-for="(item,index) in dataList" :key='index'>
          <div class="book-img">
            <img :src='url+item.coverImgUrl'>
          </div>
          <div class="info-box" :title="item.name">
            <div class="book-intro">
              <p>{{item.name}}</p>
              <p>共有
                <span style="color:red">{{item.totalWordNotes+item.totalListenWordNotes+item.totalSpellWordNotes}}</span>个生词</p>
            </div>
            <div class="arrow">
              <div @click="goDetail(item,'DEFAULT')" title="认读">
                认读({{item.totalWordNotes}})
              </div>
              <div v-if="item.bookSort==='ENGLISH_WORD'" @click="goDetail(item,'LISTEN')" title="辨音">
                辨音({{item.totalListenWordNotes}})
              </div>
              <div v-if="item.bookSort==='ENGLISH_WORD'&& item.canExam==='Y'" @click="goDetail(item,'SPELL')" title="拼写">
                拼写({{item.totalSpellWordNotes || 0}})
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div style="text-align:center" v-else class="list-word">您还没有正在学习的课程哦！</div>
    <wordNoteDetail-dialog :show.sync="wordDialogShow" :learnType="learnType" :bookInfo="bookInfo"></wordNoteDetail-dialog>
  </div>
</template>
<script>
import { ResourcePath } from "../../service/urlConfig";
import navHeader from "@/components/navHeader";
import dataService from "@/service/index";
import wordNoteDetailDialog from "./children/wordNoteDetailDialog";
export default {
  data() {
    return {
      loading: false,
      dataList: [],
      listShow: true,
      url: ResourcePath,
      wordDialogShow: false,
      bookInfo: {},
      newwordLoading: false,
      learnType: ""
    };
  },
  mounted() {
    this.getDownBooklist();
  },
  methods: {
    goDetail(item, learnType) {
      this.learnType = learnType;
      this.bookInfo = item;
      this.wordDialogShow = true;
    },
    getDownBooklist() {
      this.dataList = [];
      this.newwordLoading = true;
      this.loading = true;
      dataService.getDownBookList(0, 200).then(
        res => {
          let result = res.data;
          let code = result.code;
          let data = result.data;
          if (Array.isArray(data.content) && data.content.length === 0) {
            this.listShow = false;
          } else {
            this.listShow = true;
          }
          if (code === 200) {
            console.log(data);
            this.dataList = data.content;

            this.newwordLoading = false;
          }
        },
        () => {
          this.$message.error("请求错误");
          this.newwordLoading = false;
        }
      );
    }
  },
  components: {
    navHeader,
    wordNoteDetailDialog
  }
};
</script>
<style lang="scss">
.clearfix::after {
  content: '';
  display: table;
  clear: both;
  overflow: hidden;
}
.unKnowWord {
  width: 100%;
  height: 100%;
  user-select: none;
  .book-container {
    position: fixed;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 60px;
    padding: 10px;
    // background: #f7f7f7;
    overflow: auto;
    .book-list {
      width: 100%;
      height: 100%;
      min-width: 1000px;
      list-style: none;
      // padding: 0 30px;
      // display: flex;
      // -ms-flex-wrap: wrap;
      // flex-wrap: wrap;
      .list-item {
        display: inline-block;
        min-width: 360px;
        height: 120px;
        border: 1px solid #ddd;
        padding: 10px;
        margin: 5px;
        border-radius: 5px;
        background-color: #ffffff;
        box-shadow: #c2c1c6 2px 1px 7px 0px;
        box-sizing: border-box;
        .book-img {
          float: left;
          width: 100px;
          height: 100%;
          img {
            width: 100px;
          }
        }
        .info-box {
          float: left;
          height: 100%;
          padding: 5px;
          box-sizing: border-box;
          .book-intro {
            display: block;
            width: 240px;
            p {
              width: 100%;
              height: 20px;
              overflow-wrap: break-word;
              word-break: normal;
              overflow: hidden;
            }
          }
          .arrow {
            display: block;
            height: 60px;
            line-height: 60px;
            div {
              display: inline-block;
              width: 70px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              background-color: #ddd;
              border-radius: 10px;
              cursor: pointer;
            }
            // background-color: #000;
          }
        }
      }
    }
  }
  .list-word {
    text-align: center;
    font-size: 50px;
    letter-spacing: 28px;
    height: 300px;
    line-height: 300px;
    color: lightgray;
  }
}
</style>
