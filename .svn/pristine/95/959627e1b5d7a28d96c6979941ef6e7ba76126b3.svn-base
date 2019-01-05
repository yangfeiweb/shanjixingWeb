<template>
  <div class="exam-base-container">
    <div class="test-top">
      <p class="test-lv">等级：{{examData.columnTitle || ""}}
        <span>(共{{wordList.length}}题)</span>
      </p>
      <el-progress v-if="!isOver" :percentage="progressMain" status="exception"></el-progress>
      <div class="test-res">
        <p class="test-right">正确：{{rightN}}</p>
        <p class="test-err">错误：{{errorN}}</p>
      </div>
    </div>
    <!-- 测试内容 -->
    <div class="test-main" v-show="!isOver">
      <div class="word-content" v-show="wordList&&wordList.length!==0">
        <!-- <p class="test-word">{{nowWord}}</p> -->
        <el-progress class="progress" :percentage="progress" status="exception"></el-progress>
      </div>
      <div class="content-container" v-loading="loading" element-loading-text="生成试卷中...">
        <spelling ref="spelling" :testType="examData.examType" :learnWordInfos="wordList[this.curr]" @getResult="getResult"></spelling>
      </div>
    </div>
    <el-button type="primary" class="pauseBtn" v-show="currError" @click="pause">{{btnText}}</el-button>
  </div>
</template>

<script>
import navHeader from "./navHeader";
import { Base64 } from "js-base64";
import dataService from "@/service/index";
import { utility } from "@/utility";
import spelling from "@/pages/learn/children/spelling";

const EXAM_SIZE = 20; // 测试的题目数
export default {
  props: {
    grande: {
      type: String,
      default: ""
    },
    examData: {
      type: Object,
      default: function() {
        return {
          examType: "",
          bookNo: "",
          columnNo: "",
        };
      }
    }
  },
  data() {
    return {
      loading: true,
      rightN: 0, // 正确数量
      errorN: 0, // 错误数量
      time: 10, // 倒计时
      progress: 100, // 进度条
      progressMain: 0, // 测试总进度条
      curr: 0,
      chooseIdx: -1,
      rightIdx: -1,
      currError: false,
      currError2: false, // 标记 选错时 正确选项的样式
      isOver: false, // 是否显示测试结果
      timer: null, // 单词定时器
      oneTimer: null, // 选错之后的一次性定时器
      nextTimer: null, // next中的一次性定时器
      btnText: "暂停",
      wordList: [],
      nowWord: "", // 当前单词
      testResult: {
        examId: "",
        score: "",
        startTime: "",
        finishTime: "",
        records:[],
        spellRecords: [],
      },
      answerOk: "", //回答是否正确
      answer: "" //所选答案
    };
  },
  mounted() {
    this.getData();
  },
  
  methods: {
    // 获取数据
    getData: function() {
      dataService
        .createParper(
          this.examData.examType,
          EXAM_SIZE,
          this.examData.bookNo,
          this.examData.columnNo,
          this.grande
        )
        .then(
          res => {
            console.log("------------生成试卷-res", res);
            let code = res.data.code;
            let msg = res.data.msg;
            if (code === 200) {
              let examId = res.data.data.id;
              let startTime = res.data.data.createTime;
              startTime = startTime
                .replace(/-/g, "")
                .replace(/:/g, "")
                .replace(/ /g, "");
              this.testResult.examId = examId + "";
              this.testResult.startTime = startTime;
              dataService.getParperDetail(examId).then(
                res => {
                  console.log("--------------生成试卷详情--", res);
                  this.loading = false;
                  let code = res.data.code;
                  if (code === 200) {
                    this.wordList = res.data.data;
                    this.wordList.forEach(e => {
                      e.content3 = e.chinese;
                      e.content1 = e.word;
                    });
                    console.log("--------------this.wordList--", this.wordList);                  
                    this.nowWord = this.wordList[this.curr].word;
                    this.time=2*this.nowWord.length;
                    // 处理正确答案选项
                   console.log("----------this.time",this.time);
                    let id = this.wordList[this.curr].id + "";
             
                    // 答题倒计时
                    this.timer = setInterval(() => {
                      this.progress -= (100/this.time)*0.01;
                      if (this.progress <= 0.5) {
                        this.currError = true;
                        this.chooseIdx = 100;
                        clearInterval(this.timer);
                        this.$refs.spelling.examOver();
                      }
                    }, 10);
                  } else {
                    this.loading = false;
                  }
                  if (code === 500) {
                    this.$message.error(msg);
                    this.$emit("testEnd", true);
                  }
                },
                err => {
                  this.loading = false;
                  this.$emit("testEnd", true);
                  console.log("--------------err", err);
                }
              );
            } else {
              this.loading = false;
            }
            if (code === 500) {
              this.$message.error(msg);
              this.$emit("testEnd", true);
            }
          },
          err => {
            this.$emit("testEnd", true);
            this.loading = false;
            console.log("--------------err", err);
          }
        );
    },
    // 下一个
    next: function() {
      this.nextTimer = setTimeout(() => {
        this.progress = 100;
        this.progressMain += 100 / this.wordList.length;
        this.chooseIdx = -1;
        this.currError = false;
        if (this.curr + 1 >= this.wordList.length) {
          this.testResult.score = Math.floor(
            this.rightN / this.wordList.length * 100
          );

          this.isOver = true;

          this.testResult.finishTime = utility.getTs();
          // 提交测试成绩
          console.log("---------------------result", this.testResult);
          let testResult = JSON.stringify(this.testResult);
          testResult = Base64.encode(testResult);
          let loading = this.$loading({
            background: "rgba(0,0,0,.1)"
          });
          dataService.postParper(testResult).then(
            res => {
              let data = res.data;
              let code = data.code;
              let msg = data.msg;
              if (code === 200) {
                this.dialogVisible = false;
                this.$emit("testEnd");
                return;
              }
              if (code === 500) {
                this.$message.error(msg);
              }
              this.$emit("testEnd", true);
              loading.close();
            },
            err => {
              loading.close();
              this.$emit("testEnd", true);
            }
          );
        } else {
          this.curr++;
          let id = this.wordList[this.curr].id + "";
            this.nowWord = this.wordList[this.curr].word;
            this.time=2*this.nowWord.length;
            console.log("----------this.time",this.time);
            // 答题倒计时
            this.timer = setInterval(() => {
              this.progress -= (100/this.time)*0.01;
              // this.time -= 10;
              if (this.progress <= 0.5) {
                // this.time--;
                this.currError = true;
                this.chooseIdx = 100;
                clearInterval(this.timer);
                this.$refs.spelling.examOver();
              }
            }, 10);
          

        }
      }, 1000);
    },
    // 暂停
    pause: function() {
      if (this.btnText === "暂停") {
        console.log("---------暂停");
        this.btnText = "继续测试";
        if (this.oneTimer) {
          clearTimeout(this.oneTimer);
        }
        if (this.nextTimer) {
          clearTimeout(this.nextTimer);
        }
      } else {
        console.log("---------继续测试");
        this.btnText = "暂停";
        this.next();
      }
    },
    //子组件传过来的值
    getResult: function(val) {
      console.log("---------------子组件传-------", val);
      this.answerOk = val.wordCorrect;
      this.answer = val.words;
      console.log("---------------this.curr",this.curr);
      let id=this.wordList[this.curr].id;
      if(this.timer){
        clearInterval(this.timer);
        this.testResult.spellRecords.push({
          id: id,
          answer: this.answer,
          answerOk: this.answerOk
        });
        if(this.answerOk=="Y"){
          this.rightN++;
          this.next();
        }else if(this.answerOk=="N"){
          this.currError = true;
          this.errorN++;
          this.oneTimer = setTimeout(() => {
            clearTimeout(this.oneTimer);
            this.oneTimer = null;
            this.next();
          }, 1500);
        }
      }
      
    }
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
    this.oneTimer && clearTimeout(this.oneTimer);
  },
  components: {
    navHeader,
    spelling
  }
};
</script>

<style lang="scss" >
.exam-base-container {
  width: 100%;
  min-width: 1000px;
  .test-top {
    height: 80px;
    line-height: 80px;
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
    .test-lv {
      font-size: 18px;
    }
    .el-progress {
      width: 600px;
      line-height: inherit;
      .el-progress__text {
        display: none;
      }
      .el-progress-bar {
        padding-right: 0;
      }
      .el-progress-bar__inner {
        background-color: #0fe573;
      }
    }
    .test-res {
      width: 205px;
      p {
        display: inline-block;
        margin: 0 10px;
      }
      .test-right {
        color: #56bdff;
      }
      .test-err {
        color: #ff7676;
      }
    }
    .test-again {
      height: 40px;
      margin: auto 0;
    }
  }
  .test-main {
    width: 700px;
    margin: 0 auto;
    .word-content {
      width: 100%;
      text-align: center;
      margin: 0 auto;
      .test-word {
        margin-bottom: 25px;
        font-size: 60px;
        color: #55bdfd;
      }
      .progress {
        width: 70%;
        margin: 5px auto;
      }
    }
    .content-container {
      position: relative;
      margin-top: 30px;
      min-height: 360px;
      .word-list {
        position: absolute;
        list-style: none;
        width: 100%;
        padding: 10px 30px;
        box-sizing: border-box;
        .item-container {
          height: 55px;
          padding: 10px 0;
          margin-bottom: 10px;
          cursor: pointer;
          position: relative; //配合 对错号 做定位
          .word-item {
            height: 100%;
            text-align: center;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border: 2px #ddd solid;
            border-radius: 10px;
            padding: 0 50px;
            p {
              margin-left: 20px;
            }
          }
          img {
            position: absolute;
            right: -30px;
            top: 25px;
            width: 25px;
          }
        }
      }
    }
  }
  .test-score {
    width: 700px;
    margin: 20px auto;
    text-align: center;
    .test-score-title {
      font-size: 25px;
      color: #60baf1;
      margin: 20px 0;
    }
    .test-score-face {
      width: 180px;
      margin: 30px 0;
    }
    .test-score-text {
      font-size: 20px;
      font-weight: bold;
      margin: 20px 0;
    }
  }
  .pauseBtn {
    width: 100px;
    float: right;
    margin-right: 100px;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .fade-enter {
    transform: translateX(680px);
  }
  .fade-leave-active {
    transform: translateX(-680px);
  }
  .right-active {
    background: #0fe573;
    color: #f7f7f7;
  }
  .error-active {
    background: #ff7676;
    color: #f7f7f7;
  }
  .right-active-two {
    background: #fff;
    color: #000;
    border: 2px solid #0fe573 !important;
  }
  .right-active-three {
    background: #f7f7f7;
    color: #000;
    border: 2px solid #0fe573 !important;
  }
}
</style>
