import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./plugins/ant-design-vue-full";
import "@/permission"; // permission control
Vue.config.productionTip = false;
Vue.config.ignoredElements = [/^a-/];
Vue.prototype.$store = store;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
