import router from "./router";
import store from "@/store";
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";
const whiteList = ["/login"]; // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title);

  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      const hasGetUserInfo = store.getters.name;
      if (hasGetUserInfo) {
        next();
      } else {
        try {
          // get user info
          // 获得用户信息
          await store.dispatch("UserGetInfo");
          next();
        } catch (error) {
          // remove token and go to login page to re-login
          // 删除token，进入登录页面重新登录
          await store.dispatch("UserResetToken");
          next(`/login?redirect=${to.path}`);
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});
