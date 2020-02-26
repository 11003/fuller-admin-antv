/*
import Vue from "vue";
import { Button } from "element-ui";

Vue.use(Button);
*/

import { Loading } from "element-ui";
const loadingOption = {
  target: document.body,
  fullscreen: true,
  lock: true,
  text: "正在努力加载中...",
  customClass: "custom-loading",
  background: "rgba(255,255,255,0)"
};
const $loading = option => {
  return Loading.service({ ...loadingOption, ...option });
};
export default {
  $loading: $loading,
  install(Vue) {
    Vue.prototype.$loading = $loading;
  }
};
