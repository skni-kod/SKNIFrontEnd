import { Module } from 'vuex';
import beAxios from '../../axios';
import router from '../../router';

const userModule: Module<any, any> = {
  state: {
    token: null,
    refreshToken: null,
    user: { id: 0 },
    profile: undefined,
    timeout: null,
  },

  mutations: {
    authUser(state, auth) {
      state.token = auth.token;
      state.refreshToken = auth.refreshToken;
    },
    storeUser(state, user) {
      state.user = user;
    },
    storeProfile(state, profile) {
      state.profile = profile;
    },
    clearAuthData(state) {
      state.token = null;
      state.refreshToken = null;
      state.user = { id: 0 };
      state.profile = {};
    },
    setTimeout(state, data) {
      state.timeout = data;
    },
  },

  actions: {
    setRefreshTimer({ commit, dispatch }) {
      const to = setTimeout(() => {
        dispatch('refreshToken');
      }, 3300000);
      commit('setTimeout', to);
    },
    login({ commit, dispatch }, authData) {
      beAxios
        .post('obtain-token/', {
          username: authData.login,
          password: authData.password,
        })
        .then((res) => {
          commit('authUser', {
            token: res.data.access,
            refreshToken: res.data.refresh,
          });
          dispatch('setRefreshTimer');
          dispatch('fetchUserData');
          router.replace('/');
        })
        .catch(() => {
          dispatch('setSnackbarState', {
            state: true,
            msg: 'Nieprawidłowy login lub hasło!',
            color: 'error',
            timeout: 7500,
          });
        });
    },
    logout({ dispatch, commit, state }) {
      commit('clearAuthData');
      if (router.currentRoute.name !== 'home') {
        router.replace('/');
      }
      dispatch('setSnackbarState', {
        state: true,
        msg: 'Wylogowano',
        color: 'info',
        timeout: 5000,
      });
      clearTimeout(state.timeout);
      commit('setTimeout', null);
    },
    refreshToken({ dispatch, commit, state }) {
      beAxios
        .post('refresh-token/', {
          refresh: state.refreshToken,
        })
        .then((res) => {
          commit('authUser', {
            token: res.data.access,
            refreshToken: res.data.refresh,
          });
          dispatch('setRefreshTimer');
        });
    },
    fetchUserData({ dispatch, commit, state }) {
      if (!state.token) {
        dispatch('logout');
      } else {
        beAxios
          .get('rest-auth/user/', {
            headers: {
              Authorization: 'Bearer ' + state.token,
            },
          })
          .then((res) => {
            commit('storeUser', res.data);
            dispatch('fetchUserProfile');
          })
          .catch(() => {
            dispatch('logout');
          });
      }
    },
    fetchUserProfile({ dispatch, commit, state }) {
      if (!state.token) {
        dispatch('logout');
      } else {
        beAxios
          .get('api/profiles/' + state.user.profile + '/', {})
          .then((res) => {
            commit('storeProfile', res.data);
          })
          .catch(() => {
            dispatch('logout');
          });
      }
    },
    register({ dispatch }, data) {
      beAxios
        .post('rest-auth/registration/', data)
        .then((res) => {
          dispatch('setSnackbarState', {
            state: true,
            msg:
              'Rejestracja przebiegła pomyslnie. Teraz możesz się zalogować.',
            color: 'success',
            timeout: 7500,
          });
          router.replace('/login');
        })
        .catch((error) => {
          if (error.response.data.hasOwnProperty('username')) {
            dispatch('setSnackbarState', {
              state: true,
              msg: 'Użytkownik o takim loginie już istnieje!',
              color: 'error',
              timeout: 7500,
            });
          } else if (error.response.data.hasOwnProperty('email')) {
            dispatch('setSnackbarState', {
              state: true,
              msg: 'Użytkownik o takim adresie e-mail już istnieje!',
              color: 'error',
              timeout: 7500,
            });
          } else {
            dispatch('setSnackbarState', {
              state: true,
              msg:
                'Wystąpił nieznany błąd podczas rejestracji. Skontaktuj się z administratorem lub spróbuj ponownie później.',
              color: 'error',
              timeout: 7500,
            });
          }
        });
    },
    changeUserPassword({ dispatch, getters }, auth) {
      beAxios
        .post(
          '/rest-auth/password/change/',
          {
            new_password1: auth.password1,
            new_password2: auth.password2,
          },
          {
            headers: {
              Authorization: 'Bearer ' + getters.token,
            },
          },
        )
        .then((res) => {
          dispatch('logout');
          router.replace('/login');
          dispatch('setSnackbarState', {
            state: true,
            msg: 'Hasło zostało zmienione. Zaloguj się ponownie.',
            color: 'success',
            timeout: 7500,
          });
        })
        .catch((error) => {
          dispatch('setSnackbarState', {
            state: true,
            msg: 'Wystąpił problem ze zmiana hasła!',
            color: 'error',
            timeout: 7500,
          });
        });
    },
  },

  getters: {
    token: (state) => state.token,
    isAuthenticated: (state) => state.token !== null,
    isAdministrator: (state) => state.user.is_admin_user,
    user: (state) => state.user,
    profile: (state) => state.profile,
  },
};

export default userModule;
