<template>
  <div>
    <PageHeader
      eyebrow="Panel administratora"
      :title="add ? 'Nowa sekcja' : `Edycja sekcji${section && section.name ? ': ' + section.name : ''}`"
      :back="{ to: add ? { name: 'sections' } : { name: 'section', params: { id: route.params.id } }, label: add ? 'Sekcje' : 'Wróć do sekcji' }"
    />

    <LoadingState v-if="!section" class="page" />
    <div v-else class="page page--editor">
      <div class="container editor editor--single">
        <div class="editor__main">
          <FormCard title="Podstawowe informacje">
            <div class="form-row">
              <TextField v-model="section.name" label="Nazwa sekcji" required :error="errors.name" :show-error="submitted" />
              <TextField
                v-model="section.icon"
                label="Ikona"
                required
                :icon="section.icon || 'shape-outline'"
                hint="Nazwa ikony z materialdesignicons.com, np. chip"
                :error="errors.icon"
                :show-error="submitted"
              />
            </div>
          </FormCard>
          <FormCard title="Opis sekcji">
            <MarkdownEditor v-model="section.description" label="Treść opisu sekcji" required :error="errors.description" :show-error="submitted" />
          </FormCard>
          <FormCard title="Galeria">
            <GalleryEditor v-model="section.gallery" />
          </FormCard>
        </div>
      </div>
    </div>

    <EditorActions
      v-if="section"
      :text="add ? 'Czy na pewno chcesz opuścić ekran tworzenia nowej sekcji bez zapisywania zmian?' : 'Czy na pewno chcesz wyjść z edycji sekcji bez zapisywania zmian?'"
      :save-text="add ? 'Dodaj sekcję' : 'Zapisz zmiany'"
      :discard-text="add ? 'Odrzuć' : 'Odrzuć zmiany'"
      @save-changes="add ? addSection() : editSection()"
      @discard-changes="returnFromEditor"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { SectionsService } from '@/services/SectionsService';
import { SectionModel } from '@/models/SectionModel';
import type { GalleryModelImage } from '@/models/GalleryModelImage';
import PageHeader from '@/components/ui/PageHeader.vue';
import LoadingState from '@/components/ui/LoadingState.vue';
import TextField from '@/components/ui/TextField.vue';
import FormCard from '@/components/editor/FormCard.vue';
import MarkdownEditor from '@/components/editor/MarkdownEditor.vue';
import GalleryEditor from '@/components/editor/GalleryEditor.vue';
import EditorActions from '@/components/editor/EditorActions.vue';
import { isValid, required, validate } from '@/utils/validation';

const route = useRoute();
const router = useRouter();
const store = useStore();
const sectionService = new SectionsService();

const add = route.path.includes('add');
const section = ref<any>();
const submitted = ref(false);

const errors = computed(() => ({
  name: validate(section.value?.name, [required]),
  icon: validate(section.value?.icon, [required]),
  description: validate(section.value?.description, [required]),
}));

function withGallery(data: any) {
  if (data.gallery === undefined) {
    data.gallery = [];
  }
  return data;
}

function warnInvalid() {
  store.dispatch('warningMessage', 'Formularz nie został poprawnie wypełniony!');
}

function addSection() {
  submitted.value = true;
  if (!isValid(errors.value)) {
    warnInvalid();
    return;
  }
  sectionService
    .addSection({
      name: section.value.name,
      description: section.value.description,
      icon: section.value.icon,
      gallery: section.value.gallery.map((el: GalleryModelImage) => el.id),
      isVisible: true,
    })
    .then((res: any) => {
      if (res.status === 201) {
        store.dispatch('successMessage', 'Sekcja została dodana');
        router.replace({ name: 'section', params: { id: res.data.id } });
      }
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd poczas zapisywania sekcji!');
    });
}

function editSection() {
  submitted.value = true;
  if (!isValid(errors.value)) {
    warnInvalid();
    return;
  }
  sectionService
    .editSection(section.value.id, {
      name: section.value.name,
      description: section.value.description,
      icon: section.value.icon,
      gallery: section.value.gallery.map((el: GalleryModelImage) => el.id),
    })
    .then((res: any) => {
      if (res.status === 200) {
        store.dispatch('successMessage', 'Sekcja została zaktualizowana');
        returnFromEditor();
      }
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd poczas edycji sekcji!');
    });
}

function returnFromEditor() {
  if (add) {
    router.replace({ name: 'sections' });
  } else {
    router.replace({ name: 'section', params: { id: section.value.id } });
  }
}

onMounted(() => {
  if (add) {
    section.value = withGallery(new SectionModel());
  } else {
    sectionService
      .getSection(Number(route.params.id), false)
      .then((res) => {
        section.value = withGallery(res.data);
      })
      .catch(() => {
        router.replace({ name: 'error404' });
      });
  }
});
</script>
