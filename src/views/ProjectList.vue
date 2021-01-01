<template>
  <div>
    <v-row justify="center" v-for="project in projects" :key="project.title">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <project-card
          class="my-2"
          :project="project"
          @delete="deleteProject"
        ></project-card>
      </v-col>
    </v-row>
    <v-pagination
      v-model="pagination.currentPage"
      :length="pagination.pageCount"
      @input="paginationClicked"
      prev-icon="mdi-chevron-left"
      next-icon="mdi-chevron-right"
      class="mb-3"
    ></v-pagination>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ProjectsService } from '@/services/ProjectsService';
import { ProjectModel } from '@/models/ProjectModel';
import { PaginationModel } from '@/models/PaginationModel';
import { PaginationContainer } from '@/models/PaginationContainer';

import ProjectCard from '@/components/ProjectCard.vue';

@Component({
  components: {
    ProjectCard,
  },
})
export default class ProjectList extends Vue {
  private projectsService!: ProjectsService;
  private pagination!: PaginationModel;
  private projects!: ProjectModel[];
  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  private beforeCreate() {
    this.projectsService = new ProjectsService();
    this.pagination = new PaginationModel(1, 3, 3);
  }

  private mounted() {
    this.getProjects();
  }

  private paginationClicked(pageNumber: number) {
    this.$router.replace({
      name: 'projects',
      params: { page: '' + pageNumber },
    });

    this.getProjects();
  }

  private getProjects() {
    let pageNumber = +this.$route.params.page;
    if (pageNumber === undefined || isNaN(pageNumber)) {
      pageNumber = 1;
    }

    this.pagination.currentPage = pageNumber;
    this.projectsService
      .getProjectsByPage(pageNumber, this.pagination.itemsPerPage)
      .then((paginationContainer: PaginationContainer<ProjectModel>) => {
        this.projects = paginationContainer.results;
        if (!this.projects.length) {
          this.paginationClicked(1);
          return;
        }
        this.pagination.itemCount = paginationContainer.count;
      });
  }

  private deleteProject(id: number) {
    return; // TODO
  }

  private data() {
    return {
      projects: this.projects,
    };
  }
}
</script>
