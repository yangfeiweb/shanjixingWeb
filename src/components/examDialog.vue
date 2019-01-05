<template>
  <div class="exam-dialog">
    <el-dialog :visible.sync="dialogVisible" title="单词测试" @open="openDialog" @close="closeDialog" :center=true :fullscreen=true top="0px" :close-on-click-modal=false>
      <navHeader slot="title" :title="title" @click="dialogBack" :needBack=false></navHeader>
      <exambase v-if="index===1&&!isSpell&&!isListen" :examData="examData" @testEnd="testEnd"></exambase>
      <examRecordsBase v-if="index===2" @checkDetail="checkDetail"></examRecordsBase>
      <examDetailsBase :data="testData" v-if="index===3"></examDetailsBase>
      <spellbase v-if="index===1&&isSpell" :examData="examData" @testEnd="testEnd"></spellbase>
      <listenbase v-if="index===1&&isListen" :examData="examData" @testEnd="testEnd"></listenbase>
    </el-dialog>
  </div>

</template>

<script>
import navHeader from "./navHeader";
import exambase from "./exambase";
import examRecordsBase from "./examRecordsBase";
import examDetailsBase from "./examDetailsBase";
import spellbase from "./spellbase";
import listenbase from "./listenbase";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    examData: Object
  },
  data() {
    return {
      dialogVisible: false,
      title: "单词测试",
      index: 0,
      testData: {},
      isSpell: false,
      isListen:false,
    };
  },
  watch: {
    show(val) {
      this.dialogVisible = val;
    },
    examData(val) {
      console.log("----------examData-----", val);
      if (val.learnType == "SPELL") {
        this.isSpell = true;
        this.isListen=false;
      }else if(val.learnType == "LISTEN"){
          this.isListen=true;
          this.isSpell = false;
      }else if(val.learnType == "DEFAULT"){
          this.isListen=false;
          this.isSpell = false;
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit("update:show", false);
    },
    openDialog() {
      this.index = 1;
    },
    dialogBack() {
      // 返回按钮
      if (this.index === 3) {
        this.testEnd();
      } else {
        this.dialogVisible = false;
      }
    },
    testEnd(val) {
      // 测试结束后显示记录页面
      if (!val) {
        this.index = 2;
        this.title = "测试记录";
      } else {
        this.dialogVisible = false;
      }
    },
    checkDetail(data) {
      // 查看某个记录的数据
      this.testData = data;
      this.index = 3;
      this.title = "测试详情";
    }
  },
  components: {
    navHeader,
    exambase,
    examRecordsBase,
    examDetailsBase,
    spellbase,
    listenbase
  }
};
</script>

<style lang="scss" >
.exam-dialog {
  position: absolute;
  .el-dialog__wrapper {
    overflow: inherit;
    .el-dialog {
      margin-top: 0 !important;
    }
    .el-dialog__header {
      padding: 0;
      min-width: 1000px;
    }
    .is-fullscreen {
      overflow: inherit;
    }
    .el-dialog__body {
      padding: 0;
      height: 100%;
      overflow: scroll;
      min-width: 1000px;
    }
  }
}
</style>
