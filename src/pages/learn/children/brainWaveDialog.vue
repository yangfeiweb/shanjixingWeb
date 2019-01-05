<template>
  <div class="brainWaveDialog">
    <el-dialog title="α脑波记忆" :visible.sync="brainWaveShow" width="30%" @close='dialogHide' :show-close='false' center>
      <p>开启α脑波记忆,进入右脑状态</p>
      <p>让大脑清醒且轻松,注意力更集中!</p>
      <p class='controlsContent'>

        <i @click="goPrevious" class="iconfont icon-music-prev"></i>
        <i @click='playAudio' :class="pauseIcon"></i>
        <i @click="goNext" class="iconfont icon-next-6"></i>
      </p>
      <p class='volumeContent'>
        <i :class="volumeIcon"></i>
        <el-slider v-model="volumeVal" class='sliderDiv' :show-tooltip="false"></el-slider>
      </p>
      <audio ref="audio" loop></audio>
    </el-dialog>
  </div>
</template>
<script>
import { ResourcePath } from "@/service/urlConfig";

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  watch: {
    show(val, oldShow) {
      this.brainWaveShow = val;
    },
    volumeVal(val) {
      let audio = this.$refs.audio;
      audio.volume = val / 100;
      if (val === 0) {
        this.volumeIcon = "iconfont icon-yinliang001";
      }
      if (val > 0) {
        this.volumeIcon = "iconfont icon-yinliang101";
      }
      if (val > 60) {
        this.volumeIcon = "iconfont icon-yinliang201";
      }
      if (val === 100) {
        this.volumeIcon = "iconfont icon-yinliang301";
      }
    }
  },
  data() {
    return {
      brainWaveShow: false,
      // audioArr: [
      //   "../../../static/audio/alpha1.mp3",
      //   "../../../static/audio/alpha2.mp3",
      //   "../../../static/audio/alpha3.mp3",
      //   "../../../static/audio/alpha4.mp3",
      //   "../../../static/audio/alpha5.mp3"
      // ],
      // audioUrl: "/static/audio/1.mp3",
      pauseIcon: "iconfont icon-zanting1",
      volumeVal: 30,
      volumeIcon: "iconfont icon-yinliang101",
      playIdx: 0
    };
  },
  computed: {
    audioArr() {
      let list = localStorage.getItem("musicList");
      if (list) {
        list = JSON.parse(list);
        list &&
          list.forEach(item => {
            item.assetUrl = ResourcePath + item.assetUrl;
          });
        return list;
      }

      return [];
    }
  },
  methods: {
    dialogHide() {
      this.$emit("update:show", false);
    },
    // 上一首
    goPrevious() {
      this.$refs.audio.pause();
      this.playIdx--;
      if (this.playIdx < 0) {
        this.playIdx = this.audioArr.length - 1;
      }
      this.$refs.audio.src = this.audioArr[this.playIdx].assetUrl || "";
      this.$refs.audio.play();
    },
    // 下一首
    goNext() {
      this.$refs.audio.pause();
      this.playIdx++;
      if (this.playIdx === this.audioArr.length) {
        this.playIdx = 0;
      }
      this.$refs.audio.src = this.audioArr[this.playIdx].assetUrl || "";
      this.$refs.audio.play();
    },
    //   点击脑波暂停/播放
    playAudio() {
      let audio = this.$refs.audio;
      audio.volume = this.volumeVal / 100;
      audio.src = this.audioArr[this.playIdx].assetUrl || "";
      if (this.pauseIcon === "iconfont icon-zanting1") {
        this.pauseIcon = "iconfont icon-zanting";
        audio.play();
        this.$emit("onPlay", true);
      } else {
        this.pauseIcon = "iconfont icon-zanting1";
        audio.pause();
        this.$emit("onPlay", false);
      }
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.brainWaveDialog {
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .elDialog {
    .el-dialog {
      margin-top: 5vh !important;
    }
  }
  .el-dialog--center .el-dialog__body {
    margin: 10px 0px;
    padding: 0px;
  }
  .el-dialog__body {
    padding-bottom: 20px;
    p {
      height: 30px;
      line-height: 30px;
    }
    .volumeContent {
      padding-bottom: 15px;
      .iconfont {
        margin-right: 30px;
        font-size: 24px;
        color: #000;
      }
      .sliderDiv {
        display: inline-block;
        width: 150px;
        .el-slider__runway {
          margin: 2px 0px;
        }
      }
    }
    .controlsContent {
      padding: 20px;
      .iconfont {
        font-size: 25px;
      }
      i {
        margin: 0px 30px;
        cursor: pointer;
      }
      .icon-zanting1 {
        color: red;
      }
    }
  }
}
</style>
