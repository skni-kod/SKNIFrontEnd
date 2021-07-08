import { Module } from 'vuex';

const snackbarModule: Module<any, any> = {
  state: {
    snackbars: [],
  },

  mutations: {
    addSnackbar(state, payload) {
      state.snackbars.push(payload);
    },
    setSnackbarObjects(state, payload) {
      state.snackbars = payload;
    },
  },

  actions: {
    successMessage({ commit }, message) {
      commit('addSnackbar', {
        message,
        color: 'success',
      });
    },
    errorMessage({ commit }, message) {
      commit('addSnackbar', {
        message,
        color: 'error',
      });
    },
    infoMessage({ commit }, message) {
      commit('addSnackbar', {
        message,
        color: 'info',
      });
    },
    warningMessage({ commit }, message) {
      commit('addSnackbar', {
        message,
        color: 'warning',
      });
    },
    customSnackbar({ commit }, payload) {
      commit('addSnackbar', payload);
    },
    setSnackbars({ commit }, payload) {
      commit('setSnackbarObjects', payload);
    },
  },

  getters: {
    snackbars: (state) => state.snackbars,
  },
};

export default snackbarModule;
