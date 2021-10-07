import { Module } from 'vuex';
import { ProjectsService } from '@/services/ProjectsService';
const CS = new ProjectsService();

const projectsModule: Module<any, any> = {
  state: {
    projects: [],
  },

  getters: {
    projects: (state) => state.projects,
  },

  actions: {
    getArticles({ commit }) {
      CS.getAllProjects().then((projects) => {
        console.log(projects);
        commit('setProjects', { projects: projects });
      });
    },
  },

  mutations: {
    setProjects(state, payload) {
      state.projects = payload.projects;
    },
  },
};

export default projectsModule;
