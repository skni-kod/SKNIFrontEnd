import { Module } from 'vuex';
import { ProjectsService } from '@/services/ProjectsService';
import { SectionModel } from '@/models/SectionModel';
import { ProjectModel } from '@/models/ProjectModel';
import removeMarkdown from 'remove-markdown';
import projectPlaceholder from '@/assets/project_placeholder.jpg';

export interface ProjectInfo {
  id: number;
  name: string;
  section: {
    id: number;
    name: string;
  };
  description: string;
  image: string;
}

const convertProject = (project: ProjectModel): ProjectInfo => {
  const image = project.gallery.length > 0
    ? `${process.env.VUE_APP_MEDIA_URL}/${project.gallery[0].image}`
    : projectPlaceholder;

  return {
    id: project.id,
    description: removeMarkdown(
      project.text.split(projectsService.readMoreGuard)[0],
    ),
    name: project.title,
    section: {
      id: (project.section as SectionModel).id,
      name: (project.section as SectionModel).name,
    },
    image,
  };
};

const projectsService = new ProjectsService();

const projectsModule: Module<any, any> = {
  state: {
    projects: [],

    paginatedProjects: {
      loading: true,
      projects: {},
      page: 0,
      count: 0,
    },
  },

  getters: {
    projects: (state) => state.projects,

    featuredProjects: (state) => {
      if (!state.projects) {
          return [];
      }

      const featuredProjects: ProjectInfo[] = state.projects
        .slice(0, 4)
        .map(convertProject);

      return featuredProjects;
    },

    projectsCount: (state) => state.projects.length,

    paginatedProjects: (state) => {
      const tempProjects: Record<number, ProjectModel[]> = state.paginatedProjects.projects;

      const projects = Object.fromEntries(Object.entries(tempProjects).map(([page, proj]) => {
        return [page, proj.map(convertProject)];
      }));

      return {
        ...state.paginatedProjects,
        projects,
      };
    },
  },

  actions: {
    getProjects({ commit }) {
      projectsService.getAllProjects().then((projects) => {
        commit('setProjects', { projects });
      });
    },

    getPaginatedProjects({ commit }, { page, pageSize }) {
      commit('loadPaginatedProjects');

      projectsService.getProjectsByPage(page, pageSize, false).then(({ count, results }) => {
        commit('setPaginatedProjects', { count, results, page });
      });
    },
  },

  mutations: {
    setProjects(state, payload) {
      state.projects = payload.projects;
    },

    setPaginatedProjects(state, { count, results, page }) {
      state.paginatedProjects.projects[page] = results;
      state.paginatedProjects.count = count;
      state.paginatedProjects.loading = false;
    },

    loadPaginatedProjects(state) {
      state.paginatedProjects.loading = true;
    },
  },
};

export default projectsModule;
