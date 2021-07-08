<template>
  <div>
    <p
      class="text-h4 text-center font-weight-bold justify-center ma-2"
      style="word-break: break-word"
    >
      {{ add ? 'Nowy projekt' : 'Edycja projektu nr ' + this.$route.params.id }}
    </p>
    <project-editor
      v-if="project"
      v-model="project"
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
import { SectionModel } from '@/models/SectionModel';
import { GalleryModelImage } from '@/models/GalleryModelImage';
import ProjectEditor from '@/components/ProjectEditor.vue';

@Component({
  components: { ProjectEditor },
})
export default class ProjectEdit extends Vue {
  private projectsService!: ProjectsService;

  private created() {
    this.projectsService = new ProjectsService();

    if (this.$route.path.includes('add')) {
      this.$data.add = true;
      this.$data.project = new ProjectModel();
    } else {
      this.getProject();
    }
  }

  private getProject() {
    if (this.$route.params.id !== undefined) {
      this.projectsService
        .getProject(+this.$route.params.id, false)
        .then((project) => {
          this.$data.project = project;
        })
        .catch(() => {
          this.$store.dispatch(
            'errorMessage',
            'Wystąpił błąd przy pobieraniu projektu!',
          );
          this.$router.replace({ name: 'projects' });
        });
    } else {
      this.$router.replace({ name: 'error404' });
    }
  }

  private addProject() {
    if (this.$data.inputValidated) {
      this.projectsService
        .addProject({
          title: this.$data.project.title,
          authors: this.$data.project.authors,
          text: this.$data.project.text,
          section: this.$data.project.section,
          creator: this.$store.getters.user.id,
          repository_links: this.$data.project.links,
          gallery: this.$data.project.gallery.map((el: GalleryModelImage) => {
            return el.id;
          }),
          creation_date: new Date(),
          publication_date: new Date(),
        })
        .then((res: any) => {
          if (res.status === 201) {
            this.$store.dispatch('successMessage', 'Projekt został dodany');
            this.$router.replace({
              name: 'project',
              params: { id: res.data.id },
            });
          }
        })
        .catch(() => {
          this.$store.dispatch(
            'errorMessage',
            'Błąd poczas zapisywania projektu!',
          );
        });
    } else {
      this.$store.dispatch(
        'warningMessage',
        'Formularz nie zostal poprawnie wypełniony!',
      );
    }
  }

  private editProject() {
    if (this.$data.inputValidated) {
      this.projectsService
        .editProject(this.$data.project.id, {
          title: this.$data.project.title,
          authors: this.$data.project.authors,
          text: this.$data.project.text,
          section: this.$data.project.section,
          repository_links: this.$data.project.links,
          gallery: this.$data.project.gallery.map((el: GalleryModelImage) => {
            return el.id;
          }),
        })
        .then((res: any) => {
          if (res.status === 200) {
            this.$store.dispatch(
              'successMessage',
              'Projekt został zaktualizowany',
            );
            this.returnFromEditor();
          }
        })
        .catch(() => {
          this.$store.dispatch('errorMessage', 'Błąd poczas edycji projektu!');
        });
    } else {
      this.$store.dispatch(
        'warningMessage',
        'Formularz nie został poprawnie wypełniony!',
      );
    }
  }

  private returnFromEditor() {
    if (this.$data.add) {
      this.$router.replace({ name: 'projects', params: { page: '1' } });
    } else {
      this.$router.replace({
        name: 'project',
        params: { id: this.$data.project.id },
      });
    }
  }

  private data() {
    return {
      inputValidated: false,
      project: undefined,
      add: false,
    };
  }
}
</script>
