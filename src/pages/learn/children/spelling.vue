<template>
    <div class="spelling">
        <div class="main">
            <div class="wordMain">
                <div class="wordLeft">
                    <p class="chineseP" @click="getPlay">{{chineseWord}}</p>
                    <div class="spellingDiv">
                        <div class="wordExhibition">
                            <ul v-show="!letterShow" class="wordExhibitionUl">
                                <li class="wordExhibitionLi" v-for="(items,indexs) in letterArr" :key="indexs" @click="checkResult">
                                    <b v-show="items[0].status==='selected'" class="wordB1">{{items[0].val}}</b>
                                    <b v-show="items[1].status==='selected'" class="wordB2">{{items[1].val}}</b>
                                </li>
                            </ul>
                            <ul v-show="letterShow" class="wordExhibitionUl">
                                <li class="wordExhibitionLi" v-for="(item,index) in resultArr" :key="index" @click="checkResult">
                                    <b class="wordB1" :style="{'color':item.status==='error'?'#56BDFF':item.status==='checked'?'orange':'#ff0000'}">{{item.val}}</b>
                                </li>
                            </ul>
                        </div>
                        <div v-show="learnWordInfos" class="wordOption">
                            <ul :style="{'borderColor':borderColor===''?'red':borderColor}" class="wordOptionUl">
                                <li class="wordOptionLi" v-for="(item,index) in letterArr" :key="index">
                                    <b :style="{'borderColor':borderColor===''?'red':borderColor}" :id="item[0].status==='selected'?bgB:(item[0].status==='error')?'bgErr':''" class="wordB1" @click="clickLetter(index,0)">{{item[0].val}}</b>
                                    <b :style="{'borderColor':borderColor===''?'red':borderColor}" :id="item[1].status==='selected'?bgB:(item[1].status==='error')?'bgErr':''" class="wordB2" @click="clickLetter(index,1)">{{item[1].val}}</b>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div v-if="imgDivShow" class="wordRight">
                    <img v-show='imgShow' :src="imgPaths+learnWordInfos.content5" alt="">
                </div>
            </div>
            <div class="nextbtnDiv">
                <el-button v-show="spllingNextBtnShow" :type="nextColor" :plain="plain" @click="getNextWord">
                    <i class="el-icon-back"></i>
                    下一个
                </el-button>
            </div>
            <div  v-if="imgDivShow" class="answerMain" v-show='answerShow'>
                <div class='listenDiv'>
                    <p class="listen" v-html="learnWordInfos.content4">
                    </p>
                </div>
                <div class='listenDiv borderBotttom'>
                    <p class='listen' v-html="learnWordInfos.content6">
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { imgPath } from "@/service/urlConfig";
import { utility } from "../../../utility";
export default {
  props: {
    learnWordInfos: {
      type: Object
    },
    colorWord: {
      type: String
    },
    testType: {
      type: String
    }
  },
  components: {},
  watch: {
    learnWordInfos(val) {
      this.letterArr = [];
      this.resultArr = [];
      this.selectedArr = [];
      this.errArr = [];
      this.wordCharArr = [];
      this.answerShow = false;
      this.spllingNextBtnShow = false;
      this.borderColor = "red";
      this.imgShow = false;
      this.imgDivShow = false;
      console.log(val);
      this.word = val.content1;
      if (this.testType === "SPELL") {
        this.chineseWord =
          "【中】" + val.content3.split("【中】")[1].split("<br />")[0];
      } else {
        this.chineseWord = val.content3;
      }
      this.letterShow = false;
      if (val.colors === undefined) {
        this.setWord(this.word, (this.errorStatus = 10));
      } else {
        this.borderColor = this.colors[
          parseFloat(val.colors.split("color")[1]) - 1
        ];
        this.setWord(this.word, (this.errorStatus = 10));
      }
    },
    testType(val) {
      if (val !== "SPELL") {
        this.imgShow = false;
        this.answerShow = false;
        this.spllingNextBtnShow = false;
        this.imgDivShow = false;
      }
    }
  },
  data() {
    return {
      imgDivShow: false,
      spllingNextBtnShow: false,
      answerShow: false,
      bgB: "bgB",
      chineseWord: "",
      letterShow: false,
      word: "",
      imgPaths: imgPath,
      letterArr: [],
      selectedArr: [],
      wordCharArr: [],
      errArr: [],
      optStatus: 0,
      borderColor: "",
      colors: [
        "#946E02",
        "#008B2D",
        "#0076AA",
        "#660066",
        "#081189",
        "#000000",
        "#FF0000"
      ],
      imgShow: false,
      nextColor: "danger",
      plain: true,
      wordCorrect: "Y",
      wordResult: "",
      errorStatus: 0,
      clickWordArr: [],
      resultArr: [],
      testResult: {
        wordCorrect: "Y",
        words: ""
      }
    };
  },
  computed: {},
  methods: {
    getPlay() {
      this.$parent.playAudio();
    },
    setWord(word, errorStatus = 10) {
      this.letterArr = [];
      this.wordCorrect = "Y";
      this.wordResult = "";
      let wordStr = word.replace(/[.]+/g, "^");
      for (let i = 0; i < wordStr.length; i++) {
        let charItem = wordStr.charAt(i).toLowerCase();
        let errorItem = utility.randomLetter(charItem);
        if (charItem === "^") {
          charItem = "...";
        }
        let charArr = [
          { val: charItem, status: "" },
          { val: errorItem, status: "" }
        ];
        this.letterArr.push(utility.shuffle(charArr));
        this.wordCharArr.push(charItem);
        this.selectedArr.push(-1);
      }
      this.optStatus = 0;
      this.errorStatus = errorStatus;
      this.errArr = [];
    },
    examOver() {
      this.optStatus = 1;
      this.checkResult();
    },
    getNextWord() {
      this.$parent.getNextWord();
    },
    clickLetter(groupIdx, letterIdx) {
      let letterArr = this.letterArr;
      let groupData = letterArr[groupIdx];
      let letterItem = groupData[letterIdx];
      //   console.log("点击的当前字母", groupData, letterItem);
      console.log(this.optStatus, "单词状态----------------------");
      if (this.optStatus === 0) {
        let selectedArr = this.selectedArr;
        if (groupIdx > 0) {
          if (selectedArr[groupIdx - 1] !== -1) {
            selectedArr[groupIdx] = letterIdx;
          }
        } else {
          selectedArr[groupIdx] = letterIdx;
        }
        this.selectedArr = selectedArr;
        // 更新wordStatus
        if (selectedArr[groupIdx] !== -1) {
          groupData[0].status = "";
          groupData[1].status = "";
          letterItem.status = "selected";
          this.letterArr = letterArr;
        }
        if (selectedArr[selectedArr.length - 1] !== -1) {
          this.optStatus = 1;
          this.checkResult();
          if (this.testType === "SPELL") {
            this.$parent.getAnswer();
            this.$parent.playAudio();
            this.imgShow = true;
            this.imgDivShow = true;
            this.answerShow = true;
            if (this.wordCorrect === "N") {
              this.$parent.clickWrong();
            } else {
              this.$parent.correct();
              this.spllingNextBtnShow = true;
            }
          }
        }
      } else if (this.optStatus === 1) {
        return;
      } else if (this.optStatus === 2) {
        // 纠正错误
        if (letterItem.status === "error") {
          let errArr = this.errArr;
          //   console.log("纠正错误的indexs", errArr[0], groupIdx);
          if (errArr[0] === groupIdx) {
            // console.log(this.letterArr, this.resultArr, "纠错之后的数组");
            letterItem.status = "checked";
            this.resultArr[groupIdx].status = "checked";
            errArr.splice(0, 1);
            if (errArr.length === 0) {
              this.optStatus = 3;
              this.spllingNextBtnShow = true;
              this.$parent.playAudio();
            }
            this.letterArr = letterArr;
            // console.log(this.letterArr, this.resultArr, "纠错之后的数组");
            this.errArr = errArr;
          }
        }
      }
    },
    checkResult() {
      let errArr = this.errArr;
      let selectedArr = this.selectedArr;
      let wordCharArr = this.wordCharArr;
      let letterArr = this.letterArr;
      let resultArr = [];
      console.log(this.letterArr);
      selectedArr.forEach((selectIdx, idx) => {
        let wordItem = wordCharArr[idx];
        let groupItem = letterArr[idx];
        if (selectIdx !== -1) {
          let selectItem = groupItem[selectIdx];
          selectItem["status"] = "";
          resultArr.push(selectItem.val);
          if (selectItem.val !== wordItem) {
            let rightItem = groupItem[0];
            if (selectIdx === 0) {
              rightItem = groupItem[1];
            }
            // 更新wordStatus
            rightItem["status"] = "error";
            errArr.push(idx);
          }
        } else {
          if (groupItem[0].val === wordItem) {
            groupItem[0]["status"] = "error";
          } else {
            groupItem[1]["status"] = "error";
          }
          errArr.push(idx);
        }
      });
      this.errArr = errArr;
      console.log(this.errArr, "错误数组集合");
      this.letterArr = letterArr;
      this.wordCorrect = errArr.length > 0 ? "N" : "Y";
      this.wordResult = resultArr.join("");
      this.renderResult();
      if (this.testType === "SPELL") {
        if (this.wordCorrect === "N") {
          this.timer = setTimeout(() => {
            this.optStatus = 2;
          }, 1000);
        }
      }
      if (this.wordCorrect === "Y") {
        this.nextColor = "success";
        this.plain = false;
      } else {
        this.nextColor = "danger";
        this.plain = true;
      }
    },
    renderResult() {
      let resultArr = [];
      let selectedArr = this.selectedArr;
      console.log(this.letterArr);
      selectedArr.forEach((selectIdx, idx) => {
        let group = this.letterArr[idx];
        let letter = group[selectIdx];
        if (letter) {
          let val = letter.val;
          let status = "";
          if (group[0].status) {
            status = group[0].status;
            val = group[0].val;
          } else if (group[1].status) {
            status = group[1].status;
            val = group[1].val;
          }
          let item = {
            val: val,
            status: status
          };
          resultArr.push(item);
        } else if (this.optStatus === 1) {
          // exam over
          let val = "";
          if (group[0].status === "error") {
            val = group[0].val;
          } else {
            val = group[1].val;
          }
          let item = {
            val: val,
            status: "error"
          };
          resultArr.push(item);

          // console.log(resultArr);
        }
        // console.log(resultArr);
        this.resultArr = resultArr;
        this.letterShow = true;
      });
      this.testResult.wordCorrect = this.wordCorrect;
      this.testResult.words = this.wordResult;
      this.$emit("getResult", this.testResult);
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.spelling {
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: hidden;
  .main {
    .wordMain {
      background-color: #fff;
      border-radius: 15px;
      position: relative;
      cursor: pointer;
      .wordLeft {
        width: 70%;
        min-height: 200px;
        padding: 5px;
        display: inline-block;
        .chineseP {
          text-align: center;
          height: 40px;
          line-height: 40px;
          font-size: 18px;
        }
        .spellingDiv {
          .wordExhibition {
            width: 100%;
            text-align: center;
            margin-bottom: 10px;
            .wordExhibitionUl {
              list-style: none;
              height: 60px;
              line-height: 60px;
              .wordExhibitionLi {
                display: inline-block;
                b {
                  font-size: 40px;
                  font-weight: normal;
                  height: 60px;
                  line-height: 60px;
                }
              }
            }
          }
          .wordOption {
            width: 100%;
            text-align: center;
            margin-bottom: 10px;
            .wordOptionUl {
              list-style: none;
              height: 124px;
              border: 1px solid;
              display: inline-block;
              .wordOptionLi {
                width: 60px;
                display: inline-block;
                height: 120px;
                line-height: 60px;
                b {
                  display: block;
                  height: 60px;
                  border: 1px solid;
                  text-align: center;
                  line-height: 60px;
                  cursor: pointer;
                  font-size: 40px;
                  font-weight: normal;
                  color: #000000;
                }
                #bgB {
                  background-color: lightgrey;
                }
                #bgErr {
                  background-color: orange;
                }
              }
            }
          }
        }
      }
      .wordRight {
        width: 200px;
        height: 200px;
        border-radius: 10px;
        display: inline-block;
        position: absolute;
        right: 5px;
        top: 30px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .nextbtnDiv {
    width: 70%;
    text-align: center;
    margin: 20px 0px;
    .el-button {
      padding: 10px 30px;
      font-size: 24px;
      border-radius: 12px;
      .el-icon-back {
        transform: rotate(180deg);
        font-weight: bold;
      }
    }
  }
  .answerMain {
    min-height: 250px;
    background-color: #fff;
    border-radius: 25px;
    padding: 20px 20px;
    color: #7d7d7d;
    font-size: 16px;
    .listenDiv {
      border-bottom: 1px solid #d3d3d3;
      .listen {
        line-height: 35px;
      }
    }
    .borderBotttom {
      border-bottom: none;
    }
  }
}
</style>
