<template>
  <a-layout id="components-layout-demo-custom-trigger" class="cases-home">
    <a-layout-sider
      width="256px"
      :trigger="null"
      collapsible
      v-model="collapsed"
    >
      <div class="logo">
        <img src="../assets/logo.png" width="32" />
        <h1>{{ title }}</h1>
      </div>
      <a-menu
        :open-keys.sync="currentOpenMenu"
        v-model="currentMenu"
        theme="dark"
        mode="inline"
        @click="menuSelect"
      >
        <template v-for="menu of menus">
          <a-sub-menu v-if="menu.child_list" :key="menu.url">
            <span slot="title">
              <a-icon :type="menu.icon" />
              <span>{{ menu.name }}</span>
            </span>
            <a-menu-item
              v-for="item of menu.child_list"
              :key="item.url"
              :menu-item="menu"
            >
              <a-icon :type="item.icon" />
              {{ item.name }}
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else :key="menu.url" :menu-item="menu">
            <a-icon :type="menu.icon" />
            <span>{{ menu.name }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="global-header-right">
          <a-dropdown
            style="display: inline-block; height: 100%; vertical-align: initial"
          >
            <span style="cursor: pointer">
              <a-avatar
                class="avatar"
                size="small"
                shape="circle"
                :src="avatar"
              />
              <span>{{ name }}</span>
            </span>
            <a-menu style="width: 150px" slot="overlay">
              <a-menu-item>
                <a-icon type="github" />
                <span>
                  <a
                    target="_blank"
                    href="https://gitee.com/liuhaier/fuller-admin-antv"
                    >Github
                  </a></span
                >
              </a-menu-item>
              <a-menu-item @click="logout">
                <a-icon type="poweroff" />
                <span>退出登录</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>

      <a-layout-content class="cases-home-content">
        <keep-alive>
          <router-view v-if="!!$route.meta.keepAlive" :key="$route.fullPath">
            <!-- 这里是会被缓存的视图组件 -->
          </router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath">
          <!-- 这里是不被缓存的视图组件 -->
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import { title, assignment, navList as list } from "@/settings";
let totalMenus;
export default {
  name: "Home",
  props: {},
  data() {
    return {
      title: title || "Vue Admin Template",
      menus: [],
      collapsed: false,
      currentMenu: [],
      currentOpenMenu: []
    };
  },
  watch: {},
  mounted() {
    //导航栏展示
    this.getTabTotalMenus();
    this.$nextTick(() => {
      this.$emit("onMounted");
    });
  },
  computed: {
    ...mapGetters(["name", "avatar"])
  },
  created() {
    this.$nextTick(() => {
      this.$emit("onCreated");
    });
  },
  beforeDestroy() {
    this.$nextTick(() => {
      this.$emit("onBeforeDestroy");
    });
  },
  destroyed() {
    this.$nextTick(() => {
      this.$emit("onDestroyed");
    });
  },
  methods: {
    async logout() {
      await this.$store.dispatch("UserLogout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    getTabTotalMenus() {
      let str = this.$route.fullPath.split("?");
      str = str[0];
      let menu = str.replace(/^\//, "").split("/")[0];
      let param = assignment[menu].nav;
      totalMenus = list[param];
      if (totalMenus && totalMenus.length) {
        this.menus = totalMenus; // 数据渲染
        let defaultMenu = ""; // 默认值
        defaultMenu =
          this.$route.path != "/" ? this.$route.path : this.menus[0].path;
        let o = this.parseNavMenu(totalMenus, defaultMenu); // 导航栏进行高亮
        if (o) {
          this.currentMenu = o.currentMenu;
          this.currentOpenMenu = o.currentOpenMenu;
        }
        // 有没有带参数
        let q = this.$route.query;
        if (q) {
          this.$router.push({
            path: defaultMenu,
            query: q
          });
        } else {
          this.$router.replace(defaultMenu);
        }
      }
    },
    parseNavMenu(menus, activeMenu, parentMenu) {
      let result = { currentMenu: [], currentOpenMenu: [] };
      for (let item of menus) {
        if (item.url == activeMenu) {
          result.currentMenu = [activeMenu]; //如果报错"selectedKeys"就要改为数组
          if (parentMenu) result.currentOpenMenu = [parentMenu]; //如果报错"selectedKeys"就要改为数组
          return result;
        }
        if (item.child_list && item.child_list.length) {
          let found = this.parseNavMenu(item.child_list, activeMenu, item.url);
          if (found) return found;
        }
      }
    },
    menuSelect(menu) {
      let { key, item } = menu;
      let menuItem = item.$attrs["menu-item"];
      if (key.indexOf("&") !== -1) {
        key = key.split("&")[0];
      }
      this.$router.push({ path: key, query: menuItem.params });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/var.scss";
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 64px;
  line-height: 58px;
  padding: 0 12px 0 24px;
  vertical-align: top;
  display: inline-block;
  cursor: pointer;
  font-size: 20px;
  width: 100%;
  overflow: hidden;
  img {
    display: inline-block;
    vertical-align: middle;
  }
  h1 {
    color: #fff;
    font-size: 20px;
    margin: 0 0 0 12px;
    font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
    font-weight: 600;
    display: inline-block;
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
  }
  &.dark h1 {
    color: #fff;
  }
}
.global-header-right {
  float: right;
  margin-right: 30px;
  a {
    text-decoration: none;
  }
  .ant-avatar-sm {
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 50%;
  }
  .avatar {
    margin: 20px 4px 20px 0;
    color: #1890ff;
    background: rgba(255, 255, 255, 0.85);
    vertical-align: middle;
  }
}
.cases-home {
  margin: auto;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .cases-home-side,
  .cases-home-content {
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    &::-webkit-scrollbar-thumb {
      background: #1890ff;
    }
  }
  .cases-home-side {
    padding: $layoutSpace 0;
    margin: 0;
  }
  .cases-home-content {
    padding: $layoutSpace;
  }
  .cases-content-side {
    max-width: 370px !important;
    min-width: 370px !important;
    width: 370px !important;
    margin: $layoutSpace;
    background: none;
  }
}
</style>
