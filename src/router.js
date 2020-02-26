import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("./pages/Login/login"),
    hidden: true
  },
  {
    path: "/",
    name: "main",
    redirect: "/shop-home/ControlCenter"
  },
  {
    path: "/shop-home",
    name: "shop-home",
    redirect: "/shop-home/ControlCenter",
    component: () => import("@/layout/Home"),
    children: [
      {
        path: "/shop-home/ControlCenter",
        name: "ControlCenter",
        component: () => import("./pages/ShopHome/controller/controller.vue")
      },
      {
        path: "/shop-home/Man",
        name: "Man",
        component: () => import("./pages/ShopHome/ShoppingMall/Man/man")
      },
      {
        path: "/shop-home/WoMan",
        name: "WoMan",
        component: () => import("./pages/ShopHome/ShoppingMall/WoMan/woman")
      },
      {
        path: "/shop-home/BaoBiao",
        name: "BaoBiao",
        component: () => import("./pages/ShopHome/report/report.vue")
      },
      {
        path: "/shop-home/SheZhi",
        name: "SheZhi",
        component: () => import("./pages/ShopHome/setting/setting.vue")
      }
    ]
  },
  {
    path: "/basic-home",
    name: "basic-home",
    props: { menuHome: "basicHome" },
    meta: { menuHome: "list_basic_home" },
    redirect: "/basic-home/XiaoQu",
    component: () => import("@/layout/Home"),
    children: [
      {
        path: "/basic-home/XiaoQu",
        name: "XiaoQu",
        component: () => import("./pages/BasicData/community/community.vue")
      },
      {
        path: "/basic-home/DingDan",
        name: "DingDan",
        component: () => import("./pages/BasicData/order/order.vue")
      },
      {
        path: "/basic-home/ShuiYu",
        name: "ShuiYu",
        component: () => import("./pages/BasicData/water/water.vue")
      }
    ]
  }
];

const createRouter = () =>
  new Router({
    mode: "history",
    routes: constantRoutes
  });

const router = createRouter();

//重置路由；目前主要功能是退出
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
