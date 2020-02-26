import Vue from "vue";
import dialogModal from "./index.vue";
/*
 * props: 传给弹窗内打开的vue组件的props
 * option: 配置弹窗的props
 * */
const dialog = function({
  content,
  contentProps = {},
  dialogProps = {},
  context = undefined
}) {
  let ctx = context;
  if (!ctx) {
    ctx = this !== undefined && this !== window ? this : null;
  }
  let options = Object.assign(dialogProps, {
    context: ctx,
    vueModule: content,
    vueModuleProps: contentProps
  });
  let div = document.createElement("div");
  document.body.appendChild(div);
  let dialog = new Vue({
    name: "CustomDialog",
    render: createElement => {
      return createElement(dialogModal, { props: options });
    }
  }).$mount(div);
  if (ctx) {
    ctx.$root.$children.push(dialog);
    ctx.$root._dialog_uid = dialog._uid;
  }
  return dialog;
};
export const $ElementDialog = dialog;
export const customElemDialog = {
  install(Vue) {
    Vue.component("custom-dialog", dialogModal);
  }
};
