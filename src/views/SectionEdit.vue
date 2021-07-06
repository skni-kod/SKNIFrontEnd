<template>
  <div>
    <p
      class="text-h4 text-center font-weight-bold justify-center ma-2"
      style="word-break: break-word"
      v-if="this.section"
    >
      {{ add ? 'Nowa sekcja' : 'Edycja sekcji: ' + this.section.name }}
    </p>
    <section-editor
      v-if="section"
      v-model="section"
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
import { GalleryModelImage } from '@/models/GalleryModelImage';
import SectionEditor from '@/components/SectionEditor.vue';

@Component({
  components: { SectionEditor },
})
export default class SectionEdit extends Vue {
  private sectionService!: SectionsService;

  private created() {
    this.sectionService = new SectionsService();

    if (this.$route.path.includes('add')) {
      this.$data.add = true;
      this.$data.section = new SectionModel();
    } else {
      this.sectionService
        .getSection(Number(this.$route.params.id))
        .then((res) => {
          this.$data.section = res.data;
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
          gallery: this.$data.section.gallery.map((el: GalleryModelImage) => {
            return el.id;
          }),
          isVisible: true,
        })
        .then((res: any) => {
          if (res.status === 201) {
            this.$store.dispatch('successMessage', 'Sekcja została dodana');
            this.$router.replace({
              name: 'section',
              params: { id: res.data.id },
            });
          }
        })
        .catch(() => {
          this.$store.dispatch(
            'errorMessage',
            'Błąd poczas zapisywania sekcji!',
          );
        });
    } else {
      this.$store.dispatch(
        'warningMessage',
        'Formularz nie zostal poprawnie wypełniony!',
      );
    }
  }

  private editSection() {
    if (this.$data.inputValidated) {
      this.sectionService
        .editSection(this.$data.section.id, {
          name: this.$data.section.name,
          description: this.$data.section.description,
          icon: this.$data.section.icon,
          gallery: this.$data.section.gallery.map((el: GalleryModelImage) => {
            return el.id;
          }),
        })
        .then((res: any) => {
          if (res.status === 200) {
            this.$store.dispatch(
              'successMessage',
              'Sekcja została zaktualizowana',
            );
            this.returnFromEditor();
          }
        })
        .catch(() => {
          this.$store.dispatch('errorMessage', 'Błąd poczas edycji sekcji!');
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
      section: undefined,
      add: false,
    };
  }
}
</script>
