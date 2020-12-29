<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-card
          v-for="project in projects"
          :key="project.id"
          class="mx-1 my-8 elevation-3"
        >
          <v-card-title class="grey lighten-4">
            <h3 class="headline">{{ project.title }}</h3>
          </v-card-title>
          <v-divider />
          <v-card-text class="text-left">
            <markdown-it-vue
              class="md-body"
              :content="project.text.substring(0, 300) + '...'"
              :options="markdownOptions"
            />
          </v-card-text>
          <v-divider />
          <v-card-text class="primary">
            <v-row class="mx-auto">
              <v-col cols="auto" class="text-center py-0">
                <v-row justify="center" class="flex-column ma-0 fill-height">
                  <v-icon x-large left class="white--text">{{
                    project.section.icon
                  }}</v-icon>
                </v-row>
              </v-col>
              <v-col class="pa-0">
                <v-row justify="center" class="flex-column ma-0 fill-height">
                  <p
                    class="white--text text-left text-h6 font-weight-black my-auto"
                  >
                    {{ project.section.name }}
                  </p>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed color="warning" :to="'/project/' + project.id"
              >Zobacz więcej</v-btn
            >
            <v-speed-dial
              direction="top"
              v-if="auth"
              v-model="fab"
              class="ml-2"
            >
              <template v-slot:activator>
                <v-btn
                  x-small
                  fab
                  v-model="fab"
                  class="text-body-1 font-weight-bold"
                  color="primary"
                >
                  <v-icon>mdi-cog</v-icon>
                </v-btn>
              </template>
              <v-btn
                fab
                x-small
                color="orange"
                :to="'/project/edit/' + project.id"
              >
                <v-icon>mdi-pen</v-icon>
              </v-btn>
              <v-btn fab x-small color="error" @click="dialog = true">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-speed-dial>
          </v-card-actions>
        </v-card>
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
    <confirmation-dialog
      v-if="dialog"
      @yes="deleteArticle"
      @no="dialog = false"
      :text="dialogText"
    ></confirmation-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ProjectsService } from '@/services/ProjectsService';
import { ProjectModel } from '@/models/ProjectModel';
import { PaginationModel } from '@/models/PaginationModel';
import { PaginationContainer } from '@/models/PaginationContainer';

@Component
export default class ProjectList extends Vue {
  private projectsService!: ProjectsService;
  private pagination!: PaginationModel;
  private projects!: ProjectModel[];
  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  get dialogText() {
    return 'Czy na pewno chcesz usunąć projekt?';
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

  private data() {
    return {
      projects: this.projects,
      fab: true,
      dialog: false,
      markdownOptions: {
        githubToc: {
          anchorLink: false,
        },
      },
    };
  }
}
</script>
