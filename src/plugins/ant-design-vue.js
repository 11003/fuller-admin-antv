import { message, Modal } from "ant-design-vue";
const msgConfig = { maxCount: 1 };
const modalConfig = {
  centered: true,
  closable: false,
  maskClosable: false,
  keyboard: false
};
const modal = function() {
  this.fn = ["info", "success", "error", "warning", "confirm"];
  this.init();
};
modal.prototype = {
  init() {
    this.fn.forEach(fn => {
      this[fn] = function(obj) {
        return Modal[fn]({ ...modalConfig, ...obj });
      };
    });
  }
};
const $modal = new modal();
message.config(msgConfig);
export default {
  $Msg: message,
  $Modal: $modal,
  install(Vue) {
    Vue.prototype.$Msg = message;
    Vue.prototype.$Modal = $modal;
  }
};
