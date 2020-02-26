<template>
  <a-locale-provider :locale="zh_CN">
    <a-modal
      class="custom-dialog"
      v-model="visible"
      :title="title"
      :width="dialogWidth"
      :class="modalClassName"
      :style="{ ...dftModalStyle, ...modalStyle }"
      :body-style="bodyStyles"
      :wrap-class-name="wrapClassName"
      :centered="centered"
      :z-index="zIndex"
      :mask-style="maskStyle"
      :mask="showMask"
      :mask-closable="maskClosable"
      :closable="closable"
      :footer="showFooter"
      :ok-text="okText"
      :ok-button-props="okButtonProps"
      :cancel-text="cancelText"
      :cancel-button-props="cancelButtonProps"
      :keyboard="keyboard"
      :get-container="getContainer"
      :confirm-loading="confirmLoading"
      :destroy-on-close="destroyOnClose"
      :after-close="afterClose"
      @ok="onOkHandle"
      @cancel="cancelHandel"
    >
      <async-components
        v-if="!!vueModule"
        v-bind="vueModuleProps"
        v-on="vueModuleEvents"
        @conformDialog="okHandle"
        @closeDialog="cancelHandel"
        ref="asyncComponent"
        :is="vueModule"
      ></async-components>
      <template v-else>
        <slot ref="asyncComponent"></slot>
      </template>
      <template slot="footer">
        <slot name="dialog-footer"></slot>
      </template>
      <input type="hidden" :value="value" title="v-modal" />
    </a-modal>
  </a-locale-provider>
</template>

<script>
import Vue from "vue";
import { Modal } from "ant-design-vue";
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";

Vue.use(Modal);
const size = {
  small: "600px",
  medium: "800px",
  large: "1000px"
};
export default {
  name: "CustomDialog",
  props: {
    value: { type: Boolean, default: undefined },
    vueModule: { type: Function, default: undefined },
    vueModuleProps: { type: Object, default: () => ({}) },
    vueModuleEvents: { type: Object, default: () => ({}) },
    context: { type: Object, default: undefined },
    width: { type: [String, Number], default: undefined },
    size: { type: String, default: "medium" },
    title: { type: String, default: "弹窗" },
    okText: { type: String, default: "确定" },
    cancelText: { type: String, default: "取消" },
    okButtonProps: { type: Object, default: () => ({}) },
    cancelButtonProps: { type: Object, default: () => ({}) },
    zIndex: { type: Number, default: 1000 },
    footer: { type: [String, Boolean], default: undefined },
    centered: { type: Boolean, default: true },
    closable: { type: Boolean, default: true },
    destroyOnClose: { type: Boolean, default: true },
    wrapClassName: { type: String, default: undefined },
    mask: { type: Boolean, default: undefined },
    maskClosable: { type: Boolean, default: false },
    maskStyle: { type: Object, default: () => ({}) },
    keyboard: { type: Boolean, default: false },
    getContainer: { type: Function, default: undefined },
    confirmLoading: { type: Boolean, default: false },
    modalStyle: { type: Object, default: () => ({}) },
    contentStyle: { type: Object, default: () => ({}) },
    afterClose: { type: Function, default: () => {} },
    onConfirm: { type: Function, default: () => {} },
    onCancel: { type: Function, default: () => {} },
    bodyStyle: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      zh_CN,
      visible: false,
      dftModalStyle: {
        padding: 0
      }
    };
  },
  computed: {
    dialogWidth: function() {
      return this.width !== undefined ? this.width : size[this.size];
    },
    showMask: function() {
      return this.mask !== undefined ? this.mask : this.isShowMask();
    },
    showFooter: function() {
      return this.footer !== undefined && !this.footer ? null : this.footer;
    },
    modalClassName: function() {
      if (this.title === null && this.footer === null)
        return "custom-dialog-only-body";
      if (this.title === null) return "custom-dialog-no-title";
      if (this.footer === null) return "custom-dialog-no-footer";
      return "";
    },
    bodyStyles: function() {
      return { padding: 0, ...this.bodyStyle };
    },
    onOkHandle: function() {
      return this.value !== undefined ? this.okHandle : this.okHandleForServe;
    }
  },
  watch: {
    value: function(val) {
      if (val !== undefined) {
        this.visible = val;
      }
    }
  },
  created() {
    if (this.value === undefined) this.visible = true;
  },
  mounted() {},
  beforeDestroy() {
    if (this.context !== undefined) {
      try {
        let { $root } = this.context;
        let { $children } = $root;
        for (let i = 0, len = $children.length; i < len; i++) {
          if ($children[i]._uid == $root._dialog_uid) {
            this.context.$root.$children.splice(i, 1);
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }
  },
  methods: {
    okHandle(e) {
      console.log("okHandle");
      let done = this.onConfirm(e);
      if (done === false) return false;
      if (done instanceof Promise) {
        done.then(res => {
          if (res !== false) this.closeDialog();
        });
      } else {
        this.closeDialog();
      }
    },
    okHandleForServe() {
      let done,
        callback = ["submit", "confirm"],
        asyncComponent = this.$refs["asyncComponent"];
      try {
        for (let cb of callback) {
          if (typeof asyncComponent[cb] === "function") {
            done = asyncComponent[cb]();
            break;
          }
        }
      } catch (err) {
        console.error(err);
      }
      if (done === false) return false;
      if (done instanceof Promise) {
        done.then(res => {
          if (res !== false && this.onConfirm(res) !== false) {
            this.closeDialog();
          }
        });
      } else {
        if (this.onConfirm(done) !== false) this.closeDialog();
      }
    },
    cancelHandel(e) {
      if (typeof this.onCancel === "function") {
        let done = this.onCancel(e);
        if (done === false) return false;
        if (done instanceof Promise) {
          done.then(res => {
            console.log(res);
            if (res !== false) {
              this.closeDialog();
            }
          });
        } else {
          this.closeDialog();
        }
      } else {
        this.closeDialog();
      }
    },
    closeDialog() {
      this.$emit("input", false);
      /*当以服务方式调用时销毁该弹窗组件*/
      if (this.value === undefined) {
        this.$destroy();
      }
      // console.log("closeDialog");
    },
    isShowMask(className = "ant-modal-mask") {
      let mask = document.getElementsByClassName(className);
      for (let el of mask) {
        let display = el.style.display;
        if (!display || display != "none") {
          return false;
        }
      }
      return true;
    }
  }
};
</script>
<style lang="scss">
@import "index.scss";
</style>
