<template>
  <div class="testResultDetail cnfont">
    <nav-header class="resultDetail-header">
      <span slot="title">测试详情</span>
    </nav-header>
    <div class="down-load" @click="downTest">
      <i class="iconfont icon-icon" style="font-size:22px"></i>
      <span style="font-size:18px">下载</span>
    </div>
    <div class="resultDetail-top">
      <p>测试时间：{{testData.createTime}}</p>
      <div class="answerNo">
        <p>
          <span>共 {{testData.total}} 题</span>
          <span>对 {{testData.corrects}} 题</span>
          <span>错 {{testData.incorrects}} 题</span>
        </p>
        <p>{{testData.name}}</p>
      </div>
      <p>{{testData.useTime}}</p>
      <p>姓名：
        <span class="userName">{{userName}}</span>
      </p>
      <p>分数：
        <span class="score">
          {{testData.score}}
        </span>
      </p>
    </div>
    <div class="resultContainer" v-if="!isSpell">
      <ul class="listContainer" v-for="(item,index) in dataList" :key="index">
        <li class="list-item">
          <p class="answerItem">
            <span class="number">{{index+1}}</span>
            <span :class="{errorColor:item.answerOk=='N'}"> [ {{item.answer}} ]</span>
          </p>
          <p class="wordName" :class="{errorColor:item.answerOk=='N'}">{{item.word}}</p>
          <p class="options" :class="{rightColor:item.correct=='A'}">A. {{item.a}}</p>
          <p class="options" :class="{rightColor:item.correct=='B'}">B. {{item.b}}</p>
          <p class="options" :class="{rightColor:item.correct=='C'}">C. {{item.c}}</p>
          <p class="options" :class="{rightColor:item.correct=='D'}">D. {{item.d}}</p>
        </li>
      </ul>
    </div>
    <spellDetail v-if="isSpell"></spellDetail>
  </div>
</template>
<script>
import navHeader from "@/components/navHeader";
import dataService from "@/service/index";
import spellDetail from "./children/spellDetail";
import { utility, getRequestSign } from "@/utility";

export default {
  components: {
    navHeader,
    spellDetail
  },
  data() {
    return {
      userName: "", // 用户名
      dataList: [],
      testData: {},
      token: "",
      isSpell: false
    };
  },
  mounted() {
    // 传递过来的参数
    this.testData = this.$route.params.data;
    console.log("---------传过来 参数", this.testData);
    let examType=this.testData.examType;
    if(examType=="BOOK_WORD_SPELL_AFTER"||examType=="BOOK_WORD_SPELL_BEFORE"||examType=="COLUMN_WORD_SPELL_AFTER"||examType=="COLUMN_WORD_SPELL_BEFORE"){
      this.isSpell=true;
    }
    // 获取用户名字
    this.userName = localStorage.getItem("nickName");

    // 获取数据
    this.getData();
  },
  methods: {
    // 获取数据
    getData() {
      dataService.getParperDetail(this.testData.id).then(
        res => {
          console.log("--------试卷详情--res", res);
          let code = res.data.code;
          if (code == 200) {
            this.dataList = res.data.data;

            // 判断用户是否有选择的答案
            this.dataList.forEach(e => {
              //  console.log("----------e.correct", e.correct);
              if (e.hasOwnProperty("answer")) {
                return;
              } else {
                e.answer = "_";
              }
            });
          }
        },
        err => {}
      );
    },
    //  下载试卷
    downTest() {
      dataService.downloadGroupList(this.testData.id,this.testData.name);
    }
  }
};
</script>

<style lang="scss">
.testResultDetail {
  width: 100%;
  .resultDetail-header {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .down-load {
    position: fixed;
    top: 18px;
    right: 50px;
    // font-size: 20px;
    color: #ffffff;
    z-index: 100;
    cursor: pointer;
  }
  .resultDetail-top {
    position: fixed;
    top: 56px;
    right: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 80px;
    font-size: 18px;
    background: #f7f7f7;
    .answerNo {
      text-align: center;
    }
    .userName {
      font-size: 32px;
    }
    .score {
      font-size: 46px;
      color: #ff0000;
    }
  }
  .resultContainer {
    margin-top: 135px;
    padding: 10px;
    font-size: 18px;
    .listContainer {
      width: 100%;
      .list-item {
        min-height: 100px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #eaeaea;
        .answerItem {
          width: 100px;
          .number {
            display: inline-block;
            width: 30px;
            margin-right: 5px;
          }
        }
        .wordName {
          width: 100px;
        }
        .options {
          width: 300px;
        }
      }
    }
  }
  .rightColor {
    color: #3cb63b;
  }
  .errorColor {
    color: #ff0000;
  }
}
</style>
