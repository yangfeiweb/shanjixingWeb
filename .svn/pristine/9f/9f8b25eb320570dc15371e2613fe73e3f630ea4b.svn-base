// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import VCharts from "v-charts";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/stackElement.css";
import "./assets/iconfont/iconfont.css";
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.config.productionTip = false;
if (process.env.NODE_ENV === "production") {
  window.onkeydown = window.onkeyup = window.onkeypress = function(e) {
    if (e.code === "F12" || (e.code === "KeyJ" && e.shiftKey && e.ctrlKey)) {
      window.event.returnValue = false;
      return false;
    }
  };
  document.oncontextmenu = function(e) {
    return false;
  };
}

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
