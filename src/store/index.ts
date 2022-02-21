import Vue from 'vue';
import Vuex from 'vuex';

import snackbars from './modules/snackbars';
import user from './modules/user';
import comments from './modules/comments';
import articles from './modules/articles';
import projects from './modules/projects';
import createMultiTabState from 'vuex-multi-tab-state';

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
    snackbars,
    user,
    comments,
    articles,
    projects,
  },
  plugins: [createMultiTabState({ statesPaths: ['user'] })],
});
