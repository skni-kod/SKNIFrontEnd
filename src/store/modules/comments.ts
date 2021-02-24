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
        commit('setComments', {articleId: payload, comments});

      });
    },
    refreshComments({ state, commit }) {
        commit('getComments', state.articleId);
    },
    purgeModule({commit}) {
        commit('purgeModule');
    },
  },

  getters: {
    comments: (state) => state.comments,
  },
};

export default snackbarModule;
