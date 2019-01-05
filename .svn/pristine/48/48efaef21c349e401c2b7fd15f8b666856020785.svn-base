import Vue from "vue";
import Router from "vue-router";
// 登录
import login from "@/pages/auth/login.vue";
// 注册
import registry from "@/pages/auth/registry.vue";
// 忘记密码
import forgetPwd from "@/pages/auth/forgetPwd.vue";
// 词汇测试
import wordExam from "@/pages/exam/wordExam.vue";
// Home页
import home from "@/pages/Home.vue";
// 课程中心、
import courseCenter from "@/pages/course/courseCenter.vue";
// 学习中心
import learnCenter from "@/pages/learn/learnCenter.vue";
// 生词本
import wordNote from "@/pages/user/wordNote.vue";
// 学习首页
import learning from "@/pages/learn/learning.vue";
// 学习统计
import learnStatistics from "@/pages/user/learnStatistics.vue";
// 个人中心
import person from "@/pages/user/personCenter.vue";
// 测试成绩
import examRecords from "@/pages/exam/examRecords.vue";
// 测试详情
import examDetails from "@/pages/exam/examDetails.vue";
// 测试入口
import examEntry from "@/pages/exam/examEntry.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/registry",
      name: "registry",
      component: registry
    },
    {
      path: "/forgetPwd",
      name: "forgetPwd",
      component: forgetPwd
    },
    {
      path: "/home",
      name: "home",
      redirect: "/learnCenter",
      component: home,
      children: [
        {
          path: "/learnCenter",
          name: "learnCenter",
          component: learnCenter
        },
        {
          path: "/courseCenter",
          name: "courseCenter",
          component: courseCenter
        },
        {
          path: "/personCenter",
          name: "personCenter",
          component: person
        },
        {
          path: "/wordNote",
          name: "wordNote",
          component: wordNote
        },
        {
          path: "/examEntry",
          name: "examEntry",
          component: examEntry
        }
      ]
    },
    {
      path: "/examRecords",
      name: "examRecords",
      component: examRecords
    },
    {
      path: "/examDetails",
      name: "examDetails",
      component: examDetails
    },
    {
      path: "/wordExam",
      name: "wordExam",
      component: wordExam
    },
    {
      path: "/learning",
      name: "learning",
      component: learning
    },
    {
      path: "/learnStatistics",
      name: "learnStatistics",
      component: learnStatistics
    }
  ]
});
