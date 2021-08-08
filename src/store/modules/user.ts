import { Module } from 'vuex';
import beAxios from '@/axios';
import router from '../../router';

import jwtDecode from 'jwt-decode';

const userModule: Module<any, any> = {
  state: {
    token: null,
    refreshToken: null,
    user: undefined,
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
      state.user = undefined;
      state.profile = undefined;
    },
    setTimeout(state, data) {
      state.timeout = data;
    },
  },

  actions: {
    setRefreshTimer({ commit, dispatch }, time = 3590000) {
      const to = setTimeout(() => {
        dispatch('refreshToken');
      }, time + Math.floor(Math.random() * (5 - -5 + 1)) + -5);
      commit('setTimeout', to);
    },
    autoLogin({ state, dispatch }) {
      if (state.token) {
        beAxios
          .post('verify-token/', { token: state.token })
          .then(() => {
            const decoded: any = jwtDecode(state.token);
            const now = Date.now();
            const timeLeft = decoded.exp * 1000 - now;
            if (timeLeft > 30000) {
              dispatch('setRefreshTimer', timeLeft - 10000);
              dispatch('fetchUserData');
            } else {
              dispatch('logout');
            }
          })
          .catch(() => {
            dispatch('logout');
          });
      } else {
        localStorage.clear();
      }
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
          dispatch('errorMessage', 'Nieprawidłowy login lub hasło!');
        });
    },
    logout({ dispatch, commit, state }) {
      commit('clearAuthData');
      if (router.currentRoute.name !== 'home') {
        router.replace('/');
      }
      dispatch('infoMessage', 'Wylogowano');
      clearTimeout(state.timeout);
      commit('setTimeout', null);
      localStorage.clear();
    },
    refreshToken({ dispatch, commit, state }) {
      const decoded: any = jwtDecode(state.token);
      const now = Date.now();
      const timeLeft = decoded.exp * 1000 - now;
      if (timeLeft < 20000) {
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
      } else {
        dispatch('setRefreshTimer', timeLeft - 10000);
      }
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
            dispatch(
              'errorMessage',
              'Błąd przy pobieraniu danych użytkownika!',
            );
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
            dispatch(
              'errorMessage',
              'Błąd przy pobieraniu profilu użytkownika!',
            );
            dispatch('logout');
          });
      }
    },
    register({ dispatch }, data) {
      beAxios
        .post('rest-auth/registration/', data)
        .then((res) => {
          dispatch(
            'successMessage',
            'Rejestracja przebiegła pomyslnie. Teraz możesz się zalogować.',
          );
          router.replace('/login');
        })
        .catch((error) => {
          if (error.response.data.hasOwnProperty('username')) {
            dispatch(
              'errorMessage',
              'Użytkownik o takim loginie już istnieje!',
            );
          } else if (error.response.data.hasOwnProperty('email')) {
            dispatch(
              'errorMessage',
              'Użytkownik o takim adresie e-mail już istnieje!',
            );
          } else {
            dispatch(
              'errorMessage',
              'Wystąpił nieznany błąd podczas rejestracji. Skontaktuj się z administratorem lub spróbuj ponownie później.',
            );
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
        .then(() => {
          dispatch('logout');
          router.replace('/login');
          dispatch(
            'successMessage',
            'Hasło zostało zmienione. Zaloguj się ponownie.',
          );
        })
        .catch(() => {
          dispatch('errorMessage', 'Wystąpił problem ze zmiana hasła!');
        });
    },
  },

  getters: {
    token: (state) => state.token,
    isAuthenticated: (state) => state.token !== null,
    isAdministrator: (state) => state.user && state.user.is_admin_user,
    user: (state) => state.user,
    profile: (state) => state.profile,
  },
};

export default userModule;
