<template>
  <section class="projects-list">
    <section-header title="Nasze projekty" subtitle="Projekty małe i duże" class="header" />

    <toolbar v-if="isAdministrator">
      <toolbar-item
        text="Dodaj projekt"
        :link="{ name: 'projectAdd' }"
        :icon="require('@/assets/icons/plus.svg?inline')"
      />
    </toolbar>

    <div class="projects" v-if="!loading">
      <project-tile class="project-tile" v-for="project in projects" :project="project" />
    </div>

    <div class="loading-wrapper" v-if="loading">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <v-pagination
      v-model="currentPageNumber"
      :length="Math.ceil(projectsCount / itemsPerPage)"
      @input="paginationClicked"
      prev-icon="mdi-chevron-left"
      next-icon="mdi-chevron-right"
      v-if="projectsCount > 0"
    ></v-pagination>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ProjectsService } from '@/services/ProjectsService';
import ProjectTile from '@/components/NewDesign/projects/ProjectTile.vue';
import SectionHeader from '@/components/NewDesign/SectionHeader.vue';
import Toolbar from '@/components/NewDesign/Toolbar.vue';
import ToolbarItem from '@/components/NewDesign/ToolbarItem.vue';

@Component({
  components: {
    ProjectTile,
    SectionHeader,
    Toolbar,
    ToolbarItem
  },
})
export default class ProjectList extends Vue {
  projectsService: ProjectsService = new ProjectsService();
  itemsPerPage = 10;

  get projects() {
    return this.$store.getters.paginatedProjects.projects[this.currentPageNumber] || [];
  }

  get loading() {
    const projects = this.$store.getters.paginatedProjects.projects[this.currentPageNumber];
    if (projects && projects.length > 0) return false;
    else return this.$store.getters.paginatedProjects.loading;
  }

  get projectsCount() {
    return this.$store.getters.paginatedProjects.count;
  }

  get currentPageNumber() {
    const page = Number.parseInt(this.$route.params.page);
    return Number.isNaN(page) ? 1 : page;
  }

  set currentPageNumber(page) {
    this.$router.replace({
      name: 'projects',
      params: { page: page.toString() },
    });
  }

  fetchProjects(page: number) {
    this.$store.dispatch('getPaginatedProjects', {
      page: page, pageSize: this.itemsPerPage
    });
  }

  created() {
    this.fetchProjects(this.currentPageNumber);
  }

  paginationClicked(pageNumber: number) {
    this.fetchProjects(pageNumber);
  }

  get isAdministrator(): boolean {
    return this.$store.getters.isAdministrator;
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/helpers' as *;

.projects-list {
  @include responsiveLayout();

  margin-top: 50px;
  height: 100%;
  width: 100%;

  .loading-wrapper {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header {
    text-align: center;
    margin-bottom: 50px;
  }

  .projects {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    margin-bottom: 50px;
  }

  @include media-breakpoint-down("md") {
    .projects {
      grid-template-columns: 1fr;
      grid-template-rows: unset;
    }
  }
}
</style>