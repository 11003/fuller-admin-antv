import cTable from "./index.vue";
export const aCustomTable = {
  view: cTable,
  install(Vue) {
    Vue.component("a-custom-table", cTable);
  }
};
