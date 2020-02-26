<template>
  <el-dialog
    :title="title"
    :class="customClass"
    :top="top"
    :center="center"
    :fullscreen="fullScreen"
    :lock-scroll="lockScroll"
    :show-close="showClose"
    :modal="modal"
    :modal-append-to-body="modalAppendToBody"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :append-to-body="appendToBody"
    :visible.sync="dialogVisible"
    :before-close="beforeClose"
    :destroy-on-close="destroyOnClose"
  >
    <async-components
      v-if="!!vueModule"
      v-on="$listeners"
      v-bind="vueModuleProps"
      @confirmDialog="okHandle"
      @closeDialog="cancelHandel"
      ref="asyncComponent"
      :is="vueModule"
    ></async-components>
  </el-dialog>
</template>

<script>
const dialogSize = {
  small: "600px",
  medium: "800px",
  large: "1000px"
};
import Vue from "vue";
import { asyncComponent } from "../async-components";
import { Dialog, Button } from "element-ui";

Vue.use(Dialog);
Vue.use(Button);
Vue.use(asyncComponent);
export default {
  name: "CustomElementDialog",
  props: {
    context: { type: Object, default: undefined },
    vueModule: { type: Function, default: undefined },
    vueModuleProps: { type: Object, default: () => ({}) },
    size: {
      default: "medium",
      validator: str => {
        return Object.keys(dialogSize).indexOf(str) >= 0;
      }
    },
    width: { type: String, default: undefined },
    title: { type: String, default: "弹窗" },
    customClass: { type: String, default: "CustomElementDialog" },
    top: { type: String, default: "15vh" },
    center: { type: Boolean, default: false },
    showClose: { type: Boolean, default: true },
    beforeClose: { type: Function, default: undefined },
    modal: { type: Boolean, default: true },
    modalAppendToBody: { type: Boolean, default: true },
    closeOnClickModal: { type: Boolean, default: false },
    closeOnPressEscape: { type: Boolean, default: false },
    appendToBody: { type: Boolean, default: false },
    fullScreen: { type: Boolean, default: false },
    lockScroll: { type: Boolean, default: true },
    destroyOnClose: { type: Boolean, default: true }
  },
  computed: {
    dialogWidth: function() {
      return this.width === undefined ? dialogSize[this.size] : this.width;
    }
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  mounted() {
    this.dialogVisible = true;
  }
};
</script>

<style scoped></style>
