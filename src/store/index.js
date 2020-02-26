import Vue from "vue";
import Vuex from "vuex";
import publicData from "./publicData";
import menu from "./menu";
import getters from "./getters";
import user from "./modules/user";
import settings from "./modules/settings";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings,
    publicData,
    menu,
    user
  },
  getters
});
