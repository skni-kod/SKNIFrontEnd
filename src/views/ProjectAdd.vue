<template>
  <div>
    <p
      class="text-h4 text-center font-weight-bold justify-center ma-2"
      style="word-break: break-word"
    >
      Nowy projekt
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
      @saveChanges="addProject"
      @discardChanges="returnToProjects"
      text="Czy na pewno chcesz opuścić ekran tworzenia nowego projektu bez zapisywania zmian?"
      saveText="Dodaj projekt"
      discardText="Odrzuć projekt"
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
export default class ProjectsAdd extends Vue {
  private projectsService!: ProjectsService;
  private sectionService!: SectionsService;

  private created() {
    this.projectsService = new ProjectsService();
    this.sectionService = new SectionsService();
    this.$data.project = new ProjectModel();

    this.sectionService.getAllSections().then((res) => {
      this.$data.allSections = res;
    });
  }

  private addProject() {
    if (this.$data.inputValidated) {
      this.projectsService
        .addProject(this.$data.project.id, {
          title: this.$data.project.title,
          alias: this.$data.project.alias,
          authors: this.$data.authors,
          text: this.$data.project.text,
          tags: this.$data.selectedSections,
          creator: this.$store.getters.user.id,
          creation_date: new Date(),
          publication_date: new Date(),
        })
        .then((res: any) => {
          if (res.status === 201) {
            this.$store.dispatch('setSnackbarState', {
              state: true,
              msg: 'Projekt został dodany',
              color: 'success',
              timeout: 7500,
            });
            this.$router.replace(
              '/project/' + res.data.id + '-' + res.data.alias,
            );
          } else {
            this.$store.dispatch('setSnackbarState', {
              state: true,
              msg: 'Błąd poczas zapisywania projektu!',
              color: 'error',
              timeout: 7500,
            });
          }
        })
        .catch(() => {
          this.$store.dispatch('setSnackbarState', {
            state: true,
            msg: 'Błąd poczas zapisywania projektu!',
            color: 'error',
            timeout: 7500,
          });
        });
    } else {
      this.$store.dispatch('setSnackbarState', {
        state: true,
        msg: 'Formularz nie zostal poprawnie wypełniony!',
        color: 'warning',
        timeout: 7500,
      });
    }
  }

  private returnToProjects() {
    this.$router.replace('/projects');
  }

  private data() {
    return {
      inputValidated: false,
      project: { text: '' },
      authors: [],
      allSections: [],
      selectedSections: [],
    };
  }
}
</script>
