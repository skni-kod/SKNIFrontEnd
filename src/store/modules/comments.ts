import { Module } from 'vuex';
import { CommentsService } from '@/services/CommentsService';
const CS = new CommentsService();

const snackbarModule: Module<any, any> = {
  state: {
    articleId: undefined,
    comments: [],
  },

  mutations: {
    setComments(state, payload) {
      state.articleId = payload.articleId;
      state.comments = payload.comments;
    },
    purgeModule(state) {
      state.articleId = undefined;
      state.comments = [];
    },
  },

  actions: {
    getComments({ commit }, payload) {
      CS.getComments({
        params: {
          article: payload,
        },
      }).then((comments) => {
        commit('setComments', { articleId: payload, comments });

      });
    },
    addComment({ commit,dispatch }, payload) {
      CS.addComment(payload).then((res: any) => {
        if (res.status === 201) {
          dispatch('refreshComments');
          dispatch('setSnackbarState', {
            state: true,
            msg: 'Komentarz został dodany',
            color: 'success',
            timeout: 7500,
          });
        } else {
            dispatch('setSnackbarState', {
            state: true,
            msg: 'Błąd poczas zapisywania komentarza!',
            color: 'error',
            timeout: 7500,
          });
        }
      })
        .catch(() => {
            dispatch('setSnackbarState', {
            state: true,
            msg: 'Błąd poczas zapisywania komentarza!',
            color: 'error',
            timeout: 7500,
          });
        });
    },
    editComment({ commit,dispatch },{id,body}) {
      CS.editComment(id,body).then((res: any) => {
        if (res.status === 200) {
          dispatch('refreshComments');
          dispatch('setSnackbarState', {
            state: true,
            msg: 'Komentarz został dodany',
            color: 'success',
            timeout: 7500,
          });
        } else {
            dispatch('setSnackbarState', {
            state: true,
            msg: 'Błąd poczas zapisywania komentarza!',
            color: 'error',
            timeout: 7500,
          });
        }
      })
        .catch(() => {
            dispatch('setSnackbarState', {
            state: true,
            msg: 'Błąd poczas zapisywania komentarza!',
            color: 'error',
            timeout: 7500,
          });
        });
    },
    deleteComment({ commit,dispatch }, payload) {
      CS.deleteComment(payload).then((res: any) => {
        if (res.status === 204) {
          dispatch('refreshComments');
          dispatch('setSnackbarState', {
            state: true,
            msg: 'Komentarz został usunięty',
            color: 'success',
            timeout: 7500,
          });
        } else {
            dispatch('setSnackbarState', {
            state: true,
            msg: 'Błąd poczas usuwania komentarza!',
            color: 'error',
            timeout: 7500,
          });
        }
      })
        .catch(() => {
            dispatch('setSnackbarState', {
            state: true,
            msg: 'Błąd poczas usuwania komentarza!',
            color: 'error',
            timeout: 7500,
          });
        });
    },
    refreshComments({ state, dispatch }) {
      dispatch('getComments', state.articleId);
    },
    purgeModule({ commit }) {
      commit('purgeModule');
    },
  },

  getters: {
    comments: (state) => state.comments,
  },
};

export default snackbarModule;
