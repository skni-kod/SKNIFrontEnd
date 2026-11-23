import { createStore } from 'vuex';

import snackbars from './modules/snackbars';
import user from './modules/user';
import comments from './modules/comments';
import articles from './modules/articles';
import projects from './modules/projects';
import createMultiTabState from 'vuex-multi-tab-state';

export default createStore({
  state: {
    navDrawer: false,
  },
  mutations: {
    setNavDrawerState(state: any, nav: boolean) {
      state.navDrawer = nav;
    },
  },
  actions: {
    setNavDrawerState({ commit }, nav) {
      commit('setNavDrawerState', nav);
    },
  },
  getters: {
    navDrawer: (state: any) => state.navDrawer,
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
