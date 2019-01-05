<template>
  <div class="loginChildren">
    <div class="headContainer">
      <ul class="userImg-list" v-for="(item, index) in userInform" :key="index">
        <!-- <li class="userImg-item" @click="goLogin(item)"> -->
        <li class="userImg-item" @click="addUser(item)">
          <div class="user-img">
            <img :src="item.icon" alt="">
          </div>
          <p class="img-text">{{item.name}}</p>
        </li>
      </ul>
      <div class="addUser-content">
        <el-button icon="el-icon-plus" circle @click="addUser"></el-button>
        <p class="img-text">添加新用户</p>
      </div>
    </div>
  </div>
</template>

<script>
import dataService from "@/service/index";
import { iconPath } from "@/service/urlConfig";

export default {
  mounted() {
    //新用户头像
    this.icon = "static/userAvatar/default.png";

    //获取本地存储 用户信息
    this.userInform = JSON.parse(localStorage.getItem("userInform"));
    if (this.userInform) {
      this.userInform.forEach(e => {
        if (e.icon) {
          e.icon = this.iconPath + e.icon;
        } else {
          e.icon = "static/userAvatar/default.png";
        }
      });
    }
  },
  data() {
    return {
      icon: "",
      iconPath: iconPath,
      change: true,
      userInform: [],
      vipDay: 0
    };
  },
  methods: {
    addUser(item) {
      if (item) {
        this.$emit("passUserName", item.userName);
      }
      console.log("----------change");
      this.change = false;
      this.$emit("isChange", this.change);
      console.log("-------change2");
    },
    // 登陆
    goLogin(row) {
      console.log("-------所点击的用户", row);
      dataService.login(row.userName, row.pwd).then(
        res => {
          console.log("-----登陆--res", res);
          let code = res.data.code;
          if (code === 200) {
            // 计算vip 剩余时间
            let resultData = res.data.data;
            let token = resultData.token;
            localStorage.setItem("token", token); // 存储token
            let serverTime = resultData.serverTime;
            let vipDeadTime = resultData.vipDeadTime;
            let studentNo = resultData.studentNo;
            let date1 = new Date(serverTime);
            let date2 = new Date(vipDeadTime);
            let s1 = date1.getTime();
            let s2 = date2.getTime();
            if (s1 >= s2) {
              this.vipDay = 0;
            } else {
              let totalTime = (s2 - s1) / 1000;
              let day = parseInt(totalTime / (24 * 60 * 60)); // 计算整数天数
              let afterDay = totalTime - day * 24 * 60 * 60; // 取得算出天数后剩余的秒数
              if (afterDay > 0) {
                this.vipDay = day + 1;
              } else {
                this.vipDay = day;
              }
            }

            localStorage.setItem("icon", resultData.icon || "");
            localStorage.setItem("userName", row.userName);
            localStorage.setItem("nickName", resultData.name || row.userName);

            localStorage.setItem("vipDay", this.vipDay);
            localStorage.setItem("studentNo", studentNo);

            this.$router.replace({ name: "home" });
          } else if (code === 500) {
            this.message = res.data.msg;
            this.$message.error(res.data.msg);
          }
        },
        () => {
          this.btnLoading = false;
          // this.message = "网络连接超时！";
          // this.openErr();
        }
      );
    }
  }
};
</script>
<style lang="scss">
.loginChildren {
  margin-top: 210px;
  padding: 20px 0;
  background: rgba(247, 247, 247, 0.6);
  .headContainer {
    width: 900px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .userImg-list {
      list-style: none;
      margin: 15px 30px;
    }
    .userImg-item {
      color: #52adef;
      text-align: center;
      .user-img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        padding: 2px;
        background: #f7f7f7;
        box-shadow: #12121194 0px 0px 10px 2px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
    .addUser-content {
      margin: 0 15px;
      color: #f7f7f7;
      text-align: center;
      .el-button {
        font-size: 95px;
        color: #55bcff;
        border: 3px solid #55bcff;
      }
    }
    .img-text {
      color: #121211;
      margin-top: 10px;
      font-size: 17px;
      font-weight: bold;
    }
  }
}
</style>
