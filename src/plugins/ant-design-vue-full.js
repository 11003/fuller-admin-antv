import Vue from "vue";
import Antd from "ant-design-vue";
import "../antd-variables.less";
Vue.use(Antd);
Vue.prototype.$message.config({
  // maxCount: 1,
  // top: `50%`
});
Vue.prototype.$Msg = Vue.prototype.$message;
Vue.prototype.$Modal = {};
const types = ["info", "success", "error", "warning", "confirm"];
const dftOption = { centered: true };
types.forEach(fn => {
  Vue.prototype.$Modal[fn] = option => {
    return Vue.prototype[`$${fn}`]({ ...dftOption, ...option });
  };
});
