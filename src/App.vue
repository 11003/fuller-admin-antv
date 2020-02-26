<template>
  <a-locale-provider :locale="zh_CN">
    <router-view></router-view>
  </a-locale-provider>
</template>

<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
// import Vue from "vue";
// import { LocaleProvider } from "ant-design-vue";
// Vue.component(LocaleProvider.name, LocaleProvider);
export default {
  name: "App",
  components: {},
  data() {
    return { zh_CN };
  }
};
</script>

<style lang="scss">
@import "./assets/css/reset.scss";
@import "./assets/css/common.scss";
</style>
