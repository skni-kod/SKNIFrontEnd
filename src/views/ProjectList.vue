<template>
  <div>
    <projects-list :projects="projects"></projects-list>
    <v-pagination
      v-model="pagination.currentPage"
      :length="pagination.pageCount"
      @input="paginationClicked"
      prev-icon="mdi-chevron-left"
      next-icon="mdi-chevron-right"
    ></v-pagination>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import ProjectsList from '@/components/ProjectsList.vue';
import { ProjectsService } from '@/services/ProjectsService';
import { ProjectModel } from '@/models/ProjectModel';
import { PaginationModel } from '@/models/PaginationModel';
import { PaginationContainer } from '@/models/PaginationContainer';

@Component
export default class ProjectList extends Vue {
  private projectsService!: ProjectsService;
  private pagination!: PaginationModel;
  private projects!: ProjectModel[];

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

  private data() {
    return { projects: this.projects };
  }
}
</script>
