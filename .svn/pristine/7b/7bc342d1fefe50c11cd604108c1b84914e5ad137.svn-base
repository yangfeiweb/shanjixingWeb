<template>
  <div class="spellDetailContainer">
    <div class="spellDetail-top">
      <p class="item-idx">序号</p>
      <p class="item-chinese">词义</p>
      <p class="my-spell">我的拼写</p>
      <p class="right-spell">正确拼写</p>
    </div>
    <ul class="listContainer" v-for="(item,index) in dataList" :key="index">
      <li class="list-item">
        <p class="answerItem">{{index+1}}</p>
        <p class="chinese">{{item.chinese}}</p>
        <p class="word-spell" :class="{errorColor:item.answerOk=='N'}">{{item.answer}}</p>
        <p class="word-spell">{{item.word}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import navHeader from "@/components/navHeader";
import dataService from "@/service/index";

export default {
  components: {
    navHeader
  },
  data() {
    return {
      userName: "", //用户名
      dataList: [],
      testData: {}
    };
  },
  mounted() {
    //传递过来的参数
    this.testData = this.$route.params.data;
    console.log("---------传过来 参数", this.testData);
    //获取用户名字
    this.userName = localStorage.getItem("userName");
    //获取数据
    this.getData();
  },
  methods: {
    //获取数据
    getData() {
      dataService.getParperDetail(this.testData.id).then(
        res => {
          console.log("--------试卷详情--res", res);
          let code = res.data.code;
          if (code == 200) {
            this.dataList = res.data.data;
            //判断用户是否有选择的答案
            this.dataList.forEach(e => {
              // console.log("----------e.correct", e.correct);
              if (e.hasOwnProperty("answer")) {
                return;
              } else {
                e.answer="_";
              }
            });
          }
        },
        err => {}
      );
    }
  }
};
</script>

<style lang="scss">
.spellDetailContainer {
  margin-top: 150px;
  padding: 10px;
  font-size: 18px;
  .spellDetail-top {
    display: flex;
    justify-content: space-around;
    text-align: center;
    .item-idx {
      width: 100px;
    }
    .item-chinese {
      width: 500px;
    }
    .my-spell {
      width: 300px;
    }
    .right-spell {
      width: 300px;
    }
  }
  .listContainer {
    width: 100%;
    .list-item {
      min-height: 100px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      border-bottom: 1px solid #eaeaea;
      .answerItem {
        width: 100px;
      }
      .chinese {
        width: 500px;
      }
      .word-spell {
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
</style>
