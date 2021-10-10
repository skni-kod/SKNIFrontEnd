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
    getProjects({ commit }) {
      CS.getAllProjects().then((projects) => {
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
