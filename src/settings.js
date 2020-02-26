module.exports = {
  title: "FullerAntv Admin",

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * 父级栏目
   */
  assignment: {
    "shop-home": { nav: "list_shop_home" },
    "basic-home": { nav: "list_basic_home" }
  },
  /**
   * 左侧栏目
   */
  navList: {
    list_shop_home: [
      {
        name: "管理中心",
        path: "/shop-home/ControlCenter",
        url: "/shop-home/ControlCenter",
        icon: "dashboard"
      },
      {
        name: "商城列表",
        child_list: [
          {
            name: "男装",
            url: "/shop-home/Man",
            path: "stop-car-by-where",
            icon: "man"
          },
          {
            name: "女装",
            url: "/shop-home/WoMan",
            path: "device",
            icon: "woman"
          }
        ],
        icon: "shopping"
      },
      {
        name: "报表中心",
        key: "4",
        url: "/shop-home/BaoBiao",
        icon: "area-chart"
      },
      { name: "系统设置", key: "4", url: "/shop-home/SheZhi", icon: "setting" }
    ],
    list_basic_home: [
      {
        name: "小区管理",
        path: "/basic-home/XiaoQu",
        url: "/basic-home/XiaoQu",
        icon: "shopping-cart"
      },
      {
        name: "工单记录",
        path: "/basic-home/DingDan",
        url: "/basic-home/DingDan",
        icon: "shopping-cart"
      },
      {
        name: "水域管理",
        path: "/basic-home/ShuiYu",
        url: "/basic-home/ShuiYu",
        icon: "shopping-cart"
      }
    ]
  }
};
