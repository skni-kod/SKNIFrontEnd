import { Module } from 'vuex';
import { ProjectsService } from '@/services/ProjectsService';
import { SectionModel } from '@/models/SectionModel';
import { ProjectModel } from '@/models/ProjectModel';
import removeMarkdown from 'remove-markdown';
import projectPlaceholder from '@/assets/project_placeholder.jpg';

export type ProjectInfo = {
  id: number,
  name: string,
  section: {
    id: number,
    name: string
  },
  description: string,
  image: string
}

const projectsService = new ProjectsService();

const projectsModule: Module<any, any> = {
  state: {
    projects: [],
  },

  getters: {
    projects: (state) => state.projects,

    featuredProjects: (state) => {
      if (!state.projects) return [];

      const featuredProjects: ProjectInfo[] = state.projects
        .slice(0, 4)
        .map((project: ProjectModel) => {
          const image = project.gallery.length > 0 ? `${process.env.VUE_APP_MEDIA_URL}/${project.gallery[0].image}` : projectPlaceholder;

          return {
            id: project.id,
            description: removeMarkdown(project.text.split(projectsService.readMoreGuard)[0]),
            name: project.title,
            section: {
              id: (project.section as SectionModel).id,
              name: (project.section as SectionModel).name
            },
            image
          };
        });

      return featuredProjects;
    },

    projectsCount: (state) => state.projects.length
  },

  actions: {
    getProjects({ commit }) {
      projectsService.getAllProjects().then((projects) => {
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
