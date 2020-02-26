module.exports = {
  presets: ["@vue/app"],
  plugins: [
    /*局部引入的时候需要开启*/
    // [
    //   "import",
    //   {
    //     libraryName: "ant-design-vue",
    //     libraryDirectory: "es",
    //     style: true
    //   }
    // ],
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
};
