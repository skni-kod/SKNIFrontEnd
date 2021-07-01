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
    purgeComments(state) {
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
    addComment({ dispatch }, payload) {
      CS.addComment(payload)
        .then((res: any) => {
          if (res.status === 201) {
            dispatch('refreshComments');
            dispatch('successMessage', 'Komentarz został dodany');
          }
        })
        .catch(() => {
          dispatch('errorMessage', 'Błąd poczas zapisywania komentarza!');
        });
    },
    editComment({ dispatch }, { id, body }) {
      CS.editComment(id, body)
        .then((res: any) => {
          if (res.status === 200) {
            dispatch('refreshComments');
            dispatch('successMessage', 'Komentarz został dodany');
          }
        })
        .catch(() => {
          dispatch('errorMessage', 'Błąd poczas zapisywania komentarza!');
        });
    },
    deleteComment({ dispatch }, payload) {
      CS.deleteComment(payload)
        .then((res: any) => {
          if (res.status === 204) {
            dispatch('refreshComments');
            dispatch('successMessage', 'Komentarz został usunięty');
          }
        })
        .catch(() => {
          dispatch('errorMessage', 'Błąd poczas usuwania komentarza!');
        });
    },
    refreshComments({ state, dispatch }) {
      dispatch('getComments', state.articleId);
    },
    purgeComments({ commit }) {
      commit('purgeComments');
    },
  },

  getters: {
    comments: (state) => state.comments,
  },
};

export default snackbarModule;
