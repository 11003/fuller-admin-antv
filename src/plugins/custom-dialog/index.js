import Vue from "vue";
import dialogModal from "./index.vue";
/*
 * props: 传给弹窗内打开的vue组件的props
 * option: 配置弹窗的props
 * */
const dialog = function({ content, contentProps, dialogProps }) {
  contentProps = contentProps || {};
  dialogProps = dialogProps || {};
  const ctx = this;
  let props = Object.assign(dialogProps, {
    context: ctx,
    vueModule: content,
    vueModuleProps: contentProps
  });
  let div = document.createElement("div");
  document.body.appendChild(div);
  let dialog = new Vue({
    name: "CustomDialog",
    render: createElement => {
      return createElement(dialogModal, { props: props });
    }
  }).$mount(div);
  ctx.$root.$children.push(dialog);
  ctx.$root._dialog_uid = dialog._uid;
  return dialog;
};
export const customDialog = {
  install(Vue) {
    Vue.prototype.$Dialog = dialog;
    Vue.component("custom-dialog", dialogModal);
  }
};
