<template>
    <div class="recognition">
        <el-main class="main">
            <div class="mainDiv" v-if='learnWordInfos'>
                <div class="wordDiv" @click="wordPlay">
                    <div v-show="learnType==='LISTEN'" class="wordLeft">
                        <img v-show="btnData.listenShow" src="@/assets/images/listen.gif" alt="">
                        <img v-show="btnData.listen1Show" src="@/assets/images/listen1.png" alt="">
                        <p v-show='btnData.answerShow' :class="'mainWord ' + colorWord">{{learnWordInfos.content1}}</p>
                        <p v-show='btnData.answerShow' class="mainP mainSoundmark">{{learnWordInfos.content2}}</p>
                        <p v-show='btnData.answerShow' class="mainP mainSentence" v-html="learnWordInfos.content3"></p>
                    </div>
                    <div v-show="learnType==='DEFAULT'" class="wordLeft">
                        <p :class="'mainWord ' + colorWord">{{learnWordInfos.content1}}</p>
                        <p class="mainP mainSoundmark">{{learnWordInfos.content2}}</p>
                        <p v-show='!btnData.answerShow' class="mainP mainSentence">{{learnWordInfos.content8}}</p>
                        <p v-show='btnData.answerShow' class="mainP mainSentence" v-html="learnWordInfos.content3"></p>
                    </div>
                    <div class="wordRight">
                        <img v-if="learnWordInfos.content5" v-show='imgShow' :src="imgPaths+learnWordInfos.content5" alt="">
                    </div>
                </div>
                <div class="answerBtn">
                    <el-button v-show="btnData.successaAnswerShow" type="success" @click="correct">
                        <i class="el-icon-success"></i>
                        正确/认识
                    </el-button>
                    <el-button v-show="btnData.wrongBtnShow" type="danger" @click="clickWrong">
                        <i class="el-icon-error"></i>
                        错误/不认识
                    </el-button>
                    <el-button v-show="btnData.nextBtnShow" type="danger" :plain="true" @click="getNextWord">
                        <i class="el-icon-error"></i>
                        下一个
                    </el-button>
                    <el-button v-show="btnData.answerBtnShow" type="primary" @click="getAnswer">
                        <i class="el-icon-question"></i>
                        答案
                    </el-button>
                </div>
                <div class="answerMain" v-show='btnData.answerShow'>
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
        </el-main>
    </div>
</template>
<script>
import { imgPath } from "@/service/urlConfig";
export default {
  props: {
    learnWordInfos: {
      type: Object
    },
    btnData: {
      type: Object
    },
    colorWord: {
      type: String
    },
    imgShow: {
      type: Boolean
    },
    learnType: {
      type: String
    }
  },
  components: {},
  watch: {},
  data() {
    return {
      imgPaths: imgPath,
      imgUrl: "@/assets/images/listen.gif"
    };
  },
  computed: {},
  methods: {
    wordPlay() {
      this.$parent.wordPlay();
      console.log("点击播放");
    },
    correct() {
      this.$parent.correct();
    },
    clickWrong() {
      this.$parent.clickWrong();
    },
    getNextWord() {
      this.$parent.getNextWord();
    },
    getAnswer() {
      this.$parent.getAnswer();
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.recognition {
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: hidden;
}
</style>
