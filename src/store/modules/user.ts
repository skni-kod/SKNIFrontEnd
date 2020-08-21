import { Module } from 'vuex';
import axios from "../../axios";
import router from '../../router';

const userModule: Module<any, any> = {
    state: {
        idToken: null,
        userId: null,
        user: null,
        logoutTomeout: null,
    },

    mutations: {
        authUser(state, userData) {
            state.idToken = userData.token;
            state.userId = userData.userId;
        },
        storeUser(state, user) {
            state.user = user;
        },
        clearAuthData(state) {
            state.idToken = null;
            state.userId = null;
        },
        setLogoutTimeout(state, payload) {
            state.logoutTomeout = payload;
        },
    },

    actions: {
        setLogoutTimer({ commit, dispatch }, expirationTime) {
            const timeout = setTimeout(() => {
                commit('clearAuthData');
                if (router.currentRoute.path.includes("admin")) { router.replace({ name: "Index" }); }
                dispatch("modifySnackbar", {
                    state: true,
                    msg: "Twoja sesja wygasła. Wylogowano z panelu administracyjnego.",
                    color: "info",
                });
            }, expirationTime * 1000);
            commit('setLogoutTimeout', timeout);
        },
        login({ commit, dispatch }, authData) {
            axios.post('obtain-token/', {
                username: authData.login,
                password: authData.password,
            })
                .then((res) => {
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + 3600000);
                    localStorage.setItem('token', res.data.idToken);
                    localStorage.setItem('userId', res.data.localId);
                    localStorage.setItem('expirationDate', expirationDate.toString());
                    commit('authUser', {
                        token: res.data.idToken,
                        userId: res.data.localId,
                    });
                    dispatch('setLogoutTimer', res.data.expiresIn);
                    dispatch('fetchUserData');
                    router.replace({ name: "Admin" });
                })
                .catch((err) => {
                    dispatch("modifySnackbar", {
                        state: true,
                        msg: "Wystąpił błąd podczas logowania!",
                        color: "error",
                    });
                });
        },
        tryAutoLogin({ dispatch, commit }) {
            const token = localStorage.getItem('token');
            if (!token) { return; }
            else {
                const expirationDate = new Date(localStorage.getItem('expirationDate'));
                const now = new Date();
                if (now >= expirationDate) {
                    dispatch('clearLocalStorage');
                    return;
                } else {
                    const userId = localStorage.getItem('userId');
                    commit('authUser', {
                        token: token,
                        userId: userId,
                    });
                    dispatch('setLogoutTimer', (expirationDate.getTime() - now.getTime()) / 1000);
                    dispatch('fetchUserData');
                }
            }
        },
        logout({ dispatch, commit, state }) {
            commit('clearAuthData');
            dispatch('clearLocalStorage');
            clearTimeout(state.logoutTomeout);
            commit('setLogoutTimeout', null);
            router.replace('/');
        },
        clearLocalStorage() {
            localStorage.removeItem('expirationDate');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
        },
        fetchUserData({ commit, state }) {
            if (!state.idToken) { return; }
            else {
                axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup', { idToken: state.idToken })
                    .then((res) => {
                        commit('storeUser', res.data);
                    })
                    .catch((error) => console.log(error));
            }
        },
        changeUserPassword({ dispatch, state }, auth) {
            axios.post('/accounts:update', {
                idToken: state.idToken,
                password: auth,
                returnSecureToken: false,
            }).then((res) => {
                dispatch('logout');
                router.replace('/adminlogin');
                dispatch('modifySnackbar', {
                    snackbarState: true,
                    snackbarMsg: 'Hasło zostało zmienione',
                    snackbarColor: 'info',
                });
            }).catch((error) => {
                dispatch('modifySnackbar', {
                    snackbarState: true,
                    snackbarMsg: error,
                    snackbarColor: 'error',
                });
            });
        },
    },

    getters: {
        user: (state) => state.user,
        token: (state) => state.idToken,
        isAuthenticated: (state) => state.idToken !== null,
        loginError: (state) => state.loginError,
    },
};

export default userModule;
