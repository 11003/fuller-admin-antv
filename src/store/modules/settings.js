import defaultSettings from "@/settings";

const { sidebarLogo } = defaultSettings;

const state = {
  sidebarLogo: sidebarLogo
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  }
};

const actions = {
  changeSetting({ commit }, data) {
    commit("CHANGE_SETTING", data);
  }
};

export default {
  state,
  mutations,
  actions
};
