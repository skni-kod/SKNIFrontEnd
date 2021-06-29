<template>
  <div>
    <p
      class="text-h4 text-center font-weight-bold justify-center ma-2"
      style="word-break: break-word"
    >
      {{ add ? 'Nowy projekt' : 'Edycja projektu nr ' + this.$route.params.id }}
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
      @discardChanges="returnFromEditor"
      text="Czy na pewno chcesz opuścić ekran tworzenia nowego projektu bez zapisywania zmian?"
      saveText="Dodaj projekt"
      discardText="Odrzuć projekt"
      v-if="add"
    />
    <editor-menu
      @saveChanges="editProject"
      @discardChanges="returnFromEditor"
      text="Czy na pewno chcesz wyjść z edycji projektu bez zapisywania zmian?"
      v-else
    />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ProjectsService } from '@/services/ProjectsService';
import { ProjectModel } from '@/models/ProjectModel';
import { SectionsService } from '@/services/SectionsService';
import { SectionModel } from '@/models/SectionModel';
import ProjectEditor from '@/components/ProjectEditor.vue';

@Component({
  components: { ProjectEditor },
})
export default class ProjectEdit extends Vue {
  private projectsService!: ProjectsService;
  private sectionsService!: SectionsService;

  private created() {
    this.projectsService = new ProjectsService();
    this.sectionsService = new SectionsService();
    this.$data.article = new ProjectModel();

    if (this.$route.path.includes('add')) {
      this.$data.add = true;
      this.getAllSections();
    } else {
      this.projectsService
        .getProject(+this.$route.params.id, false)
        .then((project) => {
          this.$data.project = project;
          this.getAllSections();
          project.authors.forEach((element: any) => {
            this.$data.authors.push(element.id);
          });
          this.$data.section = project.section.id;
        })
        .catch((err) => {
          this.$router.replace({name:'error404'});
        });
    }
  }

private addProject() {
    if (this.$data.inputValidated) {
      this.projectsService
        .addProject({
          title: this.$data.project.title,
          authors: this.$data.authors,
          text: this.$data.project.text,
          section: this.$data.section,
          creator: this.$store.getters.user.id,
          repository_links: this.$data.links,
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
              {name:'project',params:{id:res.data.id}}
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
            this.returnFromEditor();
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

  private getAllSections() {
    this.sectionsService.getAllSections().then((sections) => {
      this.$data.allSections = sections;
    });
  }

  private returnFromEditor() {
    if (this.$data.add) {
      this.$router.replace({name:'projects',params:{page:'1'}});
    } else {
      this.$router.replace(
        {name:'project',params:{id:this.$data.project.id}}
      );
    }
  }

  private data() {
    return {
      inputValidated: false,
      project: { text: '' },
      authors: [],
      section: undefined,
      links: [],
      allSections: [],
      add: false,
    };
  }
}
</script>
