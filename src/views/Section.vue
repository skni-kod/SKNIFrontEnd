<template>
  <div class="mt-2">
    <v-row justify="center" v-if="section != undefined">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-card tile elevation="0">
          <v-card-title
            class="mb-2 primary rounded-lg"
            style="word-break: break-word"
          >
            <v-row class="mx-auto">
              <v-col cols="auto" class="text-center py-0">
                <v-row justify="center" class="flex-column ma-0 fill-height">
                  <v-icon x-large left class="white--text">{{
                    section.icon
                  }}</v-icon>
                </v-row>
              </v-col>
              <v-col class="pa-0">
                <v-row justify="center" class="flex-column ma-0 fill-height">
                  <p
                    class="
                      white--text
                      text-left text-h6
                      font-weight-black
                      my-auto
                    "
                  >
                    {{ section.name }}
                  </p>
                </v-row>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-subtitle class="text-left pb-0"> </v-card-subtitle>
          <v-card-text class="pa-4">
            <markdown-it-vue
              class="md-body text-left"
              :content="section.description"
              :options="markdownOptions"
            />
            <v-row justify="center" class="ma-0 fill-height">
              <v-col
                cols="12"
                class="black--text text-left text-h6 my-auto text-center"
              >
                Nasze projekty:
              </v-col>
              <v-col
                cols="12"
                lg="4"
                v-for="project in projects"
                :key="project.title"
              >
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-card
                      class="fill-height rounded-xl"
                      :color="hover ? 'grey lighten-2' : ''"
                      style="cursor: pointer"
                      @click.native="route(project.id)"
                    >
                      <v-card-text
                        class="
                          font-weight-thin
                          justify-center
                          text-center text-subtitle-1
                        "
                        >{{ project.title }}
                      </v-card-text>
                    </v-card>
                  </template>
                </v-hover>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <gallery breakpoints="xs6" :imgs="section.gallery" />
      </v-col>
    </v-row>
    <v-speed-dial fixed right bottom direction="top" v-model="fab" v-if="role">
      <template v-slot:activator>
        <v-btn-cap
          fab
          v-model="fab"
          class="text-body-1 font-weight-bold"
          color="primary"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn-cap>
      </template>
      <v-btn-cap
        fab
        color="orange"
        :to="{ name: 'editsection', params: { id: $route.params.id } }"
      >
        <v-icon>mdi-pen</v-icon>
      </v-btn-cap>
      <v-btn-cap fab color="error" @click="dialog = true">
        <v-icon>mdi-delete</v-icon>
      </v-btn-cap>
    </v-speed-dial>
    <confirmation-dialog
      v-if="dialog"
      @yes="deletesection($route.params.id)"
      @no="dialog = false"
      :text="dialogText"
    ></confirmation-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { SectionsService } from '@/services/SectionsService';
import { ProjectsService } from '@/services/ProjectsService';
import { SectionModel } from '@/models/SectionModel';

@Component
export default class section extends Vue {
  private projectsService!: ProjectsService;
  private sectionsService!: SectionsService;
  private section!: SectionModel[];

  private beforeCreate() {
    this.projectsService = new ProjectsService();
    this.sectionsService = new SectionsService();
  }

  private mounted() {
    this.sectionsService
      .getSection(+this.$route.params.id)
      .then((section) => {
        this.projectsService.getAllProjects().then((res) => {
          const filtered = res.filter((el: any) => {
            return el.section.name === section.name;
          });
          this.$data.projects = filtered;
        });
        this.section = section;
      })
      .catch(() => {
        this.$router.replace({ name: 'error404' });
      });
  }

  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }
  get role(): boolean {
    return this.$store.getters.isAdministrator;
  }
  get dialogText() {
    return 'Czy na pewno chcesz usunąć artykuł "' + this.section.title + '"?';
  }

  private deletesection(id: number) {
    this.sectionsService
      .deleteSection(id)
      .then((res) => {
        if (res.status === 204) {
          this.$store.dispatch('successMessage', 'Porjekt został usunięty');
          this.$router.replace({ name: 'sections', params: { page: '1' } });
        }
      })
      .catch(() => {
        this.$store.dispatch('errorMessage', 'Błąd poczas usuwania projektu!');
      });
  }

  private data() {
    return {
      section: this.section,
      projects: [],
      fab: false,
      dialog: false,
      markdownOptions: {
        markdownIt: {
          html: true,
          linkify: true,
        },
        githubToc: {
          anchorLink: false,
        },
      },
    };
  }
}
</script>