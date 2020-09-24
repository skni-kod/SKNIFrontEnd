<template>
  <div>
    <p
      class="text-h4 text-center font-weight-bold justify-center ma-2"
      style="word-break: break-word;"
    >Edycja projektu nr {{ this.$route.params.id }}</p>
    <project-editor
      :project="project"
      @articleEdited="project = $event"
      :authors="authors"
      @authorsEdited="authors = $event"
      :section="section"
      @sectionUpdated="section = $event"
      :links="links"
      @linksEdited="links = $event"
      :allSections="allSections"
      @validation="inputValidated = $event"
    ></project-editor>
    <v-speed-dial fixed right bottom direction="top" v-model="fab">
      <template v-slot:activator>
        <v-btn
          large
          v-model="fab"
          class="text-body-1 font-weight-bold"
          color="primary"
          style="z-index: 3;"
        >
          <v-icon large v-if="fab" left>mdi-close</v-icon>
          <v-icon large v-else left>mdi-dots-vertical</v-icon>
          <span>Menu</span>
        </v-btn>
      </template>
      <v-container class="ma-0 pa-0">
        <v-row justify="end">
          <v-btn
            color="blue white--text"
            class="mr-3"
            @click="$vuetify.goTo(0, { duration: 1000 })"
          >
            <v-icon left>mdi-arrow-collapse-up</v-icon>
            <span>Przejdź na górę</span>
          </v-btn>
        </v-row>
        <v-row justify="end">
          <v-btn
            color="blue white--text"
            class="mr-3"
            @click="$vuetify.goTo('footer', { duration: 1000 })"
          >
            <v-icon left>mdi-arrow-collapse-down</v-icon>
            <span>Przejdź na dół</span>
          </v-btn>
        </v-row>
        <v-row justify="end">
          <v-btn color="success" class="mr-3" @click="editProject">
            <v-icon left>mdi-pencil</v-icon>
            <span>Zatwierdź zmiany</span>
          </v-btn>
        </v-row>
        <v-row justify="end">
          <v-btn color="error" class="mr-3" @click="dialog = true">
            <v-icon left>mdi-pencil-off</v-icon>
            <span>Odrzuć zmiany</span>
          </v-btn>
        </v-row>
      </v-container>
    </v-speed-dial>
    <confirmation-dialog
      v-if="dialog"
      @yes="returnToProject"
      @no="dialog = false"
      text="Czy na pewno chcesz wyjść z edycji projektu bez zapisywania zmian?"
    ></confirmation-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ProjectsService } from '@/services/ProjectsService';
import { ProjectModel } from '@/models/ProjectModel';
import { SectionsService } from '@/services/SectionsService';
import { SectionModel } from '@/models/SectionModel';

@Component
export default class ProjectEdit extends Vue {
  private projectsService!: ProjectsService;
  private sectionsService!: SectionsService;

  private created() {
    this.projectsService = new ProjectsService();
    this.sectionsService = new SectionsService();
    this.$data.article = new ProjectModel();

    if (this.$route.params.id !== undefined) {
      this.projectsService
        .getProject(+this.$route.params.id, false)
        .then((project) => {
          this.$data.project = project;
          project.authors.forEach((element: any) => {
            this.$data.authors.push(element.user.id);
          });
          this.$data.section = project.section.id;
        })
        .catch((err) => {
          this.$router.replace('/404');
        });
      this.sectionsService.getAllSections().then((res) => {
        this.$data.allSections = res;
      });
    }
  }

  private editProject() {
    if (this.$data.inputValidated) {
      this.projectsService
        .editProject(this.$data.project.id, {
          title: this.$data.project.title,
          authors: this.$data.authors,
          section: this.$data.section,
          text: this.$data.project.text,
        })
        .then((res: any) => {
          if (res.status === 200) {
            this.$store.dispatch('setSnackbarState', {
              state: true,
              msg: 'Projekt został zaktualizowany',
              color: 'success',
              timeout: 7500,
            });
            this.returnToProject();
          } else {
            this.$store.dispatch('setSnackbarState', {
              state: true,
              msg: 'Błąd poczas edycji projektu!',
              color: 'error',
              timeout: 7500,
            });
          }
        })
        .catch(() => {
          this.$store.dispatch('setSnackbarState', {
            state: true,
            msg: 'Błąd poczas edycji projektu!',
            color: 'error',
            timeout: 7500,
          });
        });
    } else {
      this.$store.dispatch('setSnackbarState', {
        state: true,
        msg: 'Formularz nie został poprawnie wypełniony!',
        color: 'warning',
        timeout: 7500,
      });
    }
  }

  private returnToProject() {
    this.$router.replace('/project/' + this.$data.project.id);
  }

  private data() {
    return {
      inputValidated: false,
      project: { text: '' },
      authors: [],
      section: undefined,
      links: [],
      allSections: [],
      dialog: false,
      fab: false,
    };
  }
}
</script>
