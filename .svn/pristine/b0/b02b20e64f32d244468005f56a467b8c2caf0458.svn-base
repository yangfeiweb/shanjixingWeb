<template>
  <div class="wordDetail-box">
    <el-dialog :fullscreen="true" @open="dialogOpen" :visible.sync="dialogShow" @close="dialogHide" center>
      <div class="unKnowDetail clear">
        <div class="header">
          <nav-header>
            <div slot="title">
              <span>{{title}}</span>
            </div>
          </nav-header>
        </div>
        <div class="book-container" v-if="wordListShow">
          <ul class="book-list" v-loading="wordLoading" element-loading-text="拼命加载中">
            <li class="list-item" v-for="(item,index) in dataList" :key='index' @click="playAudio(item)">
              <p class="word">
                <span class="word-name">{{item.content1}}</span>
                <span>{{item.content2}}</span>
              </p>
              <div>
                <p>{{item.means[0].chinese}}</p>
                <p>{{item.means[1].english}}</p>
              </div>
              <ul v-for="(dish,idx) in item.examples" :key="idx" style="listStyle:none">
                <li class="case-item">{{dish.case}}</li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="noWord" v-if="!wordListShow">暂无生词</div>
        <audio ref="wordAudio" :src="url">
        </audio>
        <el-pagination background @current-change="pageChange" :current-page.sync="pageIdx" :page-size="pageSize" layout="total, prev, pager, next" :total="totalNumber">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import navHeader from "@/components/navHeader";
import _ from "lodash";
import dataService from "@/service/index";
import { audioPath } from "@/service/urlConfig";
import { LEARN_TYPE } from "@/utility/dict";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    bookInfo: {
      type: Object,
      default: function() {
        return {}
      }
    },
    learnType: {
      type: String,
      default: LEARN_TYPE.DEFAULT
    }
  },
  watch: {
    show: function(val) {
      this.dialogShow = val;
    }
  },
  data() {
    return {
      wordListShow: false,
      dialogShow: false,
      wordNoteNums: 0,
      dataList2: [],
      url: "",
      pageIdx: 1,
      pageSize: 10,
      totalNumber: 0,
      wordLoading: false
    };
  },
  computed: {
    dataList: function() {
      let words = _.cloneDeep(this.dataList2 || []);
      words.forEach(e => {
        let mean = e.content3.split("<br />");
        let example = e.content4.split("<br />");
        e.means = [{ chinese: mean[1] }, { english: mean[2] }];
        e.examples = [];
        for (let i = 0; i < example.length; i++) {
          e.examples.push({ case: example[i] });
        }
      })
      return words;
    },
    title() {
      let title = "";
      if (this.learnType === LEARN_TYPE.DEFAULT) {
        title = this.bookInfo.name + " 认读 共(" + this.wordNoteNums + ")个生词"
      } else if (this.learnType === LEARN_TYPE.LISTEN) {
        title = this.bookInfo.name + " 辨音 共(" + this.wordNoteNums + ")个生词"
      } else {
        title = this.bookInfo.name + " 拼写 共(" + this.wordNoteNums + ")个生词"
      }
      return title
    }
  },
  methods: {
    pageChange(val) {
      this.getWordList();
    },
    playAudio(val) {
      this.url = audioPath + val.content7;
      this.$nextTick(() => {
        let playAudio = this.$refs.wordAudio;
        if (!playAudio.paused) {
          playAudio.pause();
        }
        playAudio.currentTime = 0;
        playAudio.play();
      });
    },
    getWordList() {
      this.dataList2 = [];
      this.wordLoading = true;
      let pageIdx = this.pageIdx - 1;
      dataService
        .unKnownWord(pageIdx, this.pageSize, this.bookInfo.bookNo, this.learnType)
        .then(
          res => {
            let result = res.data;
            let data = result.data;
            let code = result.code;
            // if (Array.isArray(data.content) && data.content.length === 0) {
            //   this.wordListShow = false;
            // } else {
            //   this.wordListShow = true;
            // }
            if (code === 200) {
              this.dataList2 = data.content;
              this.totalNumber = data.totalRecords;
              this.wordLoading = false;
            }
          },
          () => {
            this.$message.error("请求错误");
            this.wordLoading = false;
          }
        );
    },
    dialogOpen() {
      if (this.learnType === LEARN_TYPE.DEFAULT) {
        this.wordNoteNums = this.bookInfo.totalWordNotes;
      } else if (this.learnType === LEARN_TYPE.LISTEN) {
        this.wordNoteNums = this.bookInfo.totalListenWordNotes
      } else {
        this.wordNoteNums = this.bookInfo.totalSpellWordNotes
      }
      if (this.wordNoteNums > 0) {
        this.getWordList()
        this.wordListShow = true
      } else {
        this.wordListShow = false
      }
    },
    dialogHide: function() {
      this.$emit("update:show", false);
    }
  },
  components: {
    navHeader
  }
}
</script>
<style lang="scss">
.wordDetail-box {
  user-select: none;
  .nav-header {
    position: relative;
    top: -58px;
    // width: 98%;
  }
  .el-dialog--center .el-dialog__body {
    text-align: initial;
    padding: 29px 0px !important;
  }
  .nav-header .nav-header-left {
    display: none;
  }
  .unKnowDetail {
    width: 100%;
    height: 100%;
    .book-container {
      // position: fixed;
      // top: 56px;
      // left: 0;
      // right: 0;
      // bottom: 30px;
      padding: 10px;
      background-color: #f7f7f7;
      overflow: auto;
      .book-list {
        width: 100%;
        list-style: none;
        .list-item {
          width: 98%;
          min-height: 200px;
          color: #767676;
          border: 1px solid #ddd;
          padding: 10px;
          box-sizing: border-box;
          margin-bottom: 10px;
          border-radius: 5px;
          background-color: #ffffff;
          box-shadow: #c2c1c6 2px 1px 7px 0px;
          .word {
            margin: 10px;
            .word-name {
              font-size: 24px;
              color: #22aefe;
              margin-right: 10px;
            }
          }
          .case-item {
            line-height: 24px;
          }
        }
      }
    }
    .el-pagination {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #ffff;
  }
  .el-dialog__headerbtn {
    font-size: 30px;
    top: 14px;
    z-index: 99999;
  }
  .noWord {
    text-align: center;
    font-size: 50px;
    letter-spacing: 28px;
    height: 300px;
    line-height: 300px;
    color: lightgray;
  }
}
</style>
