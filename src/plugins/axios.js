"use strict";

// import Vue from "vue";
import axios from "axios";
import Qs from "qs";
import ant from "../plugins/ant-design-vue.js";
import element from "../plugins/element.js";
const isDevelopment = process.env.NODE_ENV === "development";
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
let config = {
  baseURL: isDevelopment ? "/api" : process.env.VUE_APP_apiUrl,
  timeout: 10 * 1000, // Timeout
  withCredentials: true // Check cross-site Access-Control
};
let extra = isDevelopment ? { test: "admin" } : {};
let loading = null;
const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    let param = config.data || config.params || {};
    if (param && "noloading" in param) {
      delete param["noloading"];
    } else {
      loading = element.$loading();
    }
    if (config.method === "post") {
      config.data = { ...extra, ...config.data };
      config.data = Qs.stringify(config.data);
    } else {
      config.params = { ...extra, ...config.params };
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    if (loading) {
      loading.close();
      loading = null;
    }
    const res = response.data;
    // if (!res) {
    //   ant.$Msg.error((res && res.error) || "数据获取失败!");
    // } else {
    //   ant.$Msg.success("数据获取成功！此消息来自【src/plugins/axios.js/61】");
    // }
    return res;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

// Vue.use(Plugin);

export default {
  $axios: _axios,
  install(Vue) {
    Vue.$axios = _axios;
    Object.defineProperties(Vue.prototype, {
      $axios: {
        get() {
          return _axios;
        }
      }
    });
  }
};
