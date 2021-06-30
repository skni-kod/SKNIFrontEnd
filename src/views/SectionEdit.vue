<template>
  <div>
    <p
      class="text-h4 text-center font-weight-bold justify-center ma-2"
      style="word-break: break-word"
    >
      {{ add ? 'Nowa sekcja' : 'Edycja sekcji: ' + this.section.name }}
    </p>
    <section-editor
      :section="section"
      @validation="inputValidated = $event"
    ></section-editor>
    <editor-menu
      @saveChanges="addSection"
      @discardChanges="returnFromEditor"
      text="Czy na pewno chcesz opuścić ekran tworzenia nowej sekcji bez zapisywania zmian?"
      saveText="Dodaj sekcję"
      discardText="Odrzuć sekcję"
      v-if="add"
    />
    <editor-menu
      @saveChanges="editSection"
      @discardChanges="returnFromEditor"
      text="Czy na pewno chcesz wyjść z edycji sekcji bez zapisywania zmian?"
      v-else
    />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { SectionsService } from '@/services/SectionsService';
import { SectionModel } from '@/models/SectionModel';
import SectionEditor from '@/components/SectionEditor.vue';

@Component({
  components: { SectionEditor },
})
export default class ProjectEdit extends Vue {
  private sectionService!: SectionsService;

  private created() {
    this.sectionService = new SectionsService();
    this.$data.section = new SectionModel();

    if (this.$route.path.includes('add')) {
      this.$data.add = true;
    } else {
      this.sectionService
        .getSection(Number(this.$route.params.id))
        .then((section) => {
          this.$data.section = section;
        })
        .catch((err) => {
          this.$router.replace({ name: 'error404' });
        });
    }
  }

  private addSection() {
    if (this.$data.inputValidated) {
      this.sectionService
        .addSection({
          name: this.$data.section.name,
          description: this.$data.section.description,
          icon: this.$data.section.icon,
          isVisible: true,
        })
        .then((res: any) => {
          if (res.status === 201) {
            this.$store.dispatch('setSnackbarState', {
              state: true,
              msg: 'Sekcja została dodana',
              color: 'success',
              timeout: 7500,
            });
            this.$router.replace({
              name: 'section',
              params: { id: res.data.id },
            });
          } else {
            this.$store.dispatch('setSnackbarState', {
              state: true,
              msg: 'Błąd poczas zapisywania sekcji!',
              color: 'error',
              timeout: 7500,
            });
          }
        })
        .catch(() => {
          this.$store.dispatch('setSnackbarState', {
            state: true,
            msg: 'Błąd poczas zapisywania sekcji!',
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

  private editSection() {
    if (this.$data.inputValidated) {
      this.sectionService
        .editSection(this.$data.section.id, {
          name: this.$data.section.name,
          description: this.$data.section.description,
          icon: this.$data.section.icon,
        })
        .then((res: any) => {
          if (res.status === 200) {
            this.$store.dispatch('setSnackbarState', {
              state: true,
              msg: 'Sekcja została zaktualizowana',
              color: 'success',
              timeout: 7500,
            });
            this.returnFromEditor();
          } else {
            this.$store.dispatch('setSnackbarState', {
              state: true,
              msg: 'Błąd poczas edycji sekcji!',
              color: 'error',
              timeout: 7500,
            });
          }
        })
        .catch(() => {
          this.$store.dispatch('setSnackbarState', {
            state: true,
            msg: 'Błąd poczas edycji sekcji!',
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

  private returnFromEditor() {
    if (this.$data.add) {
      this.$router.replace({ name: 'sections' });
    } else {
      this.$router.replace({
        name: 'section',
        params: { id: this.$data.section.id },
      });
    }
  }

  private data() {
    return {
      inputValidated: false,
      authors: [],
      section: undefined,
      add: false,
    };
  }
}
</script>
