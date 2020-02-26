import http from "../plugins/axios.js";
const { $axios } = http;

export const login = {
  post: params => $axios.post("/api/userLogin", params)
};
export const logout = {
  post: params => $axios.post("/api/userLogout", params)
};
export const getInfo = {
  post: params => $axios.post("/api/getUserInfo", params)
};
