const TerserPlugin = require("terser-webpack-plugin");
const port = process.env.port || process.env.npm_config_port || 9528; // dev port
module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  runtimeCompiler: true,
  productionSourceMap: false,
  pluginOptions: {
    moment: {
      locales: ["zh-cn", "en"]
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimize = true;
      config.optimization.providedExports = true;
      config.optimization.usedExports = true;
      config.optimization.sideEffects = true;
      config.optimization.concatenateModules = true;
      config.optimization.noEmitOnErrors = true;
      config.optimization.splitChunks = {
        // maxAsyncRequests: 1,                     // 最大异步请求数， 默认1
        // maxInitialRequests: 1,                   // 最大初始化请求数，默认1
        cacheGroups: {
          // 抽离第三方插件
          commons: {
            // test: path.resolve(__dirname, '../node_modules'),
            chunks: "all",
            minChunks: 2,
            maxInitialRequests: 5, // The default limit is too small to showcase the effect
            minSize: 0, // This is example is too small to create commons chunks
            name: "common"
          }
        }
      };
      config.optimization.minimizer = [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: false,
          terserOptions: {
            ie8: false,
            safari10: false,
            warnings: false,
            compress: {
              drop_console: true //丢掉console
            },
            output: {
              comments: false //不带上注释
            }
          }
        })
      ];
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
  devServer: {
    https: false,
    open: true, // 自动打开页面
    port: port,
    proxy: {
      "/api": {
        target: process.env.VUE_APP_ApiURL, // 需要请求的地址
        changeOrigin: true, // 是否跨域
        ws: true,
        pathRewrite: {
          "^/api/": "/"
        }
      }
    }
  }
};
