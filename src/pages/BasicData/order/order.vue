<template>
  <div class="Order">
    <a-tabs
      size="large"
      class="tabs-background"
      :activeKey="activeTab"
      :tabBarStyle="{ margin: '0' }"
      @change="onChange"
    >
      <a-tab-pane v-for="item in tabPane" :key="item.key">
        <span slot="tab">
          {{ item.name }}
        </span>
        <async-components
          v-if="item.key === activeTab"
          :type="activeTab"
          :component="tabComponents[activeTab]"
          @RefreshTab="RefreshTabList(item.key)"
        ></async-components>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import { asyncComponent } from "@/plugins/async-components";
import { getQueryString } from "@/utils/common.js";
import { forceUpdate } from "@/utils/vueTools";
Vue.use(asyncComponent);
export default {
  name: "Order",
  data() {
    return {
      activeTab: 1,
      tabComponents: {
        1: () => import("@/pages/BasicData/order/12345/One.vue"),
        2: () => import("@/pages/BasicData/order/96810/Two.vue"),
        3: () => import("@/pages/BasicData/order/12315/Three.vue")
      },
      tabPane: [
        { key: 1, name: "12345" },
        { key: 2, name: "96810" },
        { key: 3, name: "12315" }
      ]
    };
  },
  methods: {
    // 通过子组件的onInit刷新
    RefreshTabList(key) {
      this.show(key);
    },
    show(key) {
      let active = getQueryString("active");
      this.activeTab = key
        ? key
        : active
        ? parseInt(active)
        : this.tabPane[0].key;
      forceUpdate(this);
    },
    onChange(key) {
      this.activeTab = key;
    }
  },
  created() {
    this.show();
  }
};
</script>

<style scoped></style>
