import { Module } from 'vuex';
import axios from '../../axios';
import router from '../../router';

let timeout = null;

const userModule: Module<any, any> = {
    state: {
        token: null,
        refreshToken: null,
        user: null,
    },

    mutations: {
        authUser(state, auth) {
            state.token = auth.token;
            state.refreshToken = auth.refreshToken;
        },
        storeUser(state, user) {
            state.user = user;
        },
        clearAuthData(state) {
            state.token = null;
            state.refreshToken = null;
            state.user = null;
        },
    },

    actions: {
        setRefreshTimer({ commit, dispatch }) {
            timeout = setTimeout(() => {
                dispatch('refreshToken');
            }, 3300000);
        },
        login({ commit, dispatch }, authData) {
            axios.post('obtain-token/', {
                username: authData.login,
                password: authData.password,
            })
                .then((res) => {
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + 3300000);
                    localStorage.setItem('token', res.data.access);
                    localStorage.setItem('refreshToken', res.data.refresh);
                    localStorage.setItem('expirationDate', expirationDate.toString());
                    commit('authUser', {
                        token: res.data.access,
                        refreshToken: res.data.refresh,
                    });
                    dispatch('setRefreshTimer');
                    dispatch('fetchUserData');
                    router.replace('/');
                })
                .catch((err) => {
                    dispatch('setSnackbarState', {
                        state: true,
                        msg: 'Nieprawidłowy login lub hasło!',
                        color: 'error',
                        timeout: 7500,
                    });
                });
        },
        // tryAutoLogin({ dispatch, commit }) {
        //     const token = localStorage.getItem('token');
        //     if (!token) {
        //         return;
        //     } else {
        //         // const expirationDate = new Date(localStorage.getItem('expirationDate'));
        //         const expirationDate = new Date();
        //         const now = new Date();
        //         if (now >= expirationDate) {
        //             dispatch('clearLocalStorage');
        //             return;
        //         } else {
        //             const userId = localStorage.getItem('userId');
        //             commit('authUser', {
        //                 '{token}': token,
        //                 '{userId}': userId,
        //             });
        //             dispatch('setLogoutTimer', (expirationDate.getTime() - now.getTime()) / 1000);
        //             dispatch('fetchUserData');
        //         }
        //     }
        // },
        logout({ dispatch, commit, state }) {
            commit('clearAuthData');
            dispatch('clearLocalStorage');
            router.replace('/');
        },
        refreshToken({ dispatch, commit, state }) {
            axios.post('refresh_token/', {
                refresh: state.refreshToken,
            }).then((res) => {
                const now = new Date();
                const expirationDate = new Date(now.getTime() + 3300000);
                localStorage.setItem('token', res.data.access);
                localStorage.setItem('refreshToken', res.data.refresh);
                localStorage.setItem('expirationDate', expirationDate.toString());
                commit('authUser', {
                    token: res.data.access,
                    refreshToken: res.data.refresh,
                });
                dispatch('setRefreshTimer');
            });
        },
        clearLocalStorage() {
            localStorage.removeItem('expirationDate');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        },
        fetchUserData({ dispatch, commit, state }) {
            if (!state.token) {
                return;
            } else {
                axios.get('rest-auth/user/', {
                    headers: {
                        Authorization: 'Bearer ' + state.token,
                    },
                })
                    .then((res) => {
                        commit('storeUser', res.data);
                        dispatch('setSnackbarState', {
                            state: true,
                            msg: 'Witaj spowrotem, ' + state.user.username + '!',
                            color: 'success',
                            timeout: 7500,
                        });
                    });
            }
        },
        // changeUserPassword({ dispatch, state }, auth) {
        //     axios.post('/accounts:update', {
        //         idToken: state.idToken,
        //         password: auth,
        //         returnSecureToken: false,
        //     }).then((res) => {
        //         dispatch('logout');
        //         router.replace('/adminlogin');
        //         dispatch('setSnackbarState', {
        //             snackbarState: true,
        //             snackbarMsg: 'Hasło zostało zmienione',
        //             snackbarColor: 'info',
        //             timeout: 7500,
        //         });
        //     }).catch((error) => {
        //         dispatch('setSnackbarState', {
        //             snackbarState: true,
        //             snackbarMsg: error,
        //             snackbarColor: 'error',
        //             timeout: 7500,
        //         });
        //     });
        // },
    },

    getters: {
        user: (state) => state.user,
        token: (state) => state.token,
        isAuthenticated: (state) => state.idToken !== null,
    },
};

export default userModule;
