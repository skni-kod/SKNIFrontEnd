import { Module } from 'vuex';
import { ArticlesService } from '@/services/ArticlesService';
const CS = new ArticlesService();

const articlesModule: Module<any, any> = {
  state: {
    articles: [],
  },

  getters: {
    articles: (state) => state.articles,
  },

  actions: {
    getArticles({ commit }) {
      CS.getArticles(0, 3, false).then((articles) => {
        commit('setArticles', { articles });
      });
    },
  },

  mutations: {
    setArticles(state, payload) {
      state.articles = payload.articles;
    },
  },
};

export default articlesModule;
