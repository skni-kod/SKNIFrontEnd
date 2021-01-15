<template>
  <div>
    <p
      class="text-h4 text-center font-weight-bold justify-center ma-2"
      style="word-break: break-word"
    >
      Edycja projektu nr {{ this.$route.params.id }}
    </p>
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
    <editor-menu
      @saveChanges="editProject"
      @discardChanges="returnToProject"
      text="Czy na pewno chcesz wyjść z edycji projektu bez zapisywania zmian?"
    />
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
            this.$data.authors.push(element.id);
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
    };
  }
}
</script>
