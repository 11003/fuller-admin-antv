import Vue from "vue";

import GlobalTable from "@/components/Table";
import acceptSearch from "@/components/Search";
import { customDialog } from "@/plugins/custom-dialog";

Vue.use(customDialog);
export default {
  components: {
    acceptSearch,
    GlobalTable
  },
  data() {
    return {
      acceptContent: {} //选择内容
    };
  },
  methods: {
    funcClick(func_name, data) {
      eval("this." + func_name + "(data)");
    },
    onInit() {}
  },
  created() {
    this.onInit();
  }
};
