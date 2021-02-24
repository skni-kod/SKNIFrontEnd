import Vue from 'vue';
import Vuex from 'vuex';

import snackbar from './modules/snackbar';
import user from './modules/user';
import comments from './modules/comments';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    navDrawer: false,
  },
  mutations: {
    setNavDrawerState(state, nav) {
      state.navDrawer = nav;
    },
  },
  actions: {
    setNavDrawerState({ commit }, nav) {
      commit('setNavDrawerState', nav);
    },
  },
  getters: {
    navDrawer: (state) => state.navDrawer,
  },
  modules: {
    snackbar,
    user,
    comments,
  },
});
