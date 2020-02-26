<template>
  <div class="Site">
    <a-tabs
      size="large"
      class="tabs-background"
      :active-key="activeTab"
      :tab-bar-style="{ margin: '0' }"
      @change="onTabChange"
    >
      <a-tab-pane v-for="item in tabPane" :key="item.key">
        <span slot="tab" v-if="item.num > 0">
          <a-badge :count="item.num" :offset="[20]">
            {{ item.name }}
          </a-badge>
        </span>
        <span slot="tab" v-else>
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
import { getQueryString, forceUpdate } from "@/utils/common";
import { asyncComponent } from "@/plugins/async-components";
Vue.use(asyncComponent);
export default {
  name: "ShoppingMall",
  data() {
    return {
      activeTab: "",
      tabPane: [],
      tabComponents: {
        1: () => import("./Man/man"),
        2: () => import("./WoMan/WoMan")
      }
    };
  },
  methods: {
    // 通过子组件的onInit刷新
    RefreshTabList(key) {
      this.show(key);
    },
    onTabChange(key) {
      this.activeTab = key;
    },
    show(key) {
      let active = getQueryString("active");
      const list = [{ key: 1, name: "男装" }, { key: 2, name: "女装" }];
      this.tabPane = list;
      this.activeTab = key ? key : active ? parseInt(active) : list[0].key;
      forceUpdate(this);
    }
  },
  created() {
    this.show();
  }
};
</script>

<style scoped></style>
