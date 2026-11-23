<template>
  <div>
    <PageHeader
      eyebrow="Panel administratora"
      :title="add ? 'Nowy projekt' : 'Edycja projektu'"
      :description="add ? undefined : `ID: ${route.params.id}`"
      :back="{ to: add ? { name: 'projects' } : { name: 'project', params: { id: route.params.id } }, label: add ? 'Projekty' : 'Wróć do projektu' }"
    />

    <LoadingState v-if="!project" class="page" />
    <div v-else class="page page--editor">
      <div class="container editor">
        <div class="editor__main">
          <FormCard title="Podstawowe informacje">
            <TextField v-model="project.title" label="Tytuł projektu" required :error="errors.title" :show-error="submitted" />
            <div class="form-row">
              <MultiSelect
                v-model="project.section"
                label="Sekcja"
                required
                :items="sections"
                item-text="name"
                :multiple="false"
                placeholder="Wybierz sekcję"
                :error="errors.section"
                :show-error="submitted"
              />
              <MultiSelect
                v-model="project.authors"
                label="Autorzy"
                required
                :items="users"
                item-text="fullname"
                placeholder="Wyszukaj autorów"
                :error="errors.authors"
                :show-error="submitted"
              />
            </div>
          </FormCard>

          <FormCard title="Opis projektu">
            <MarkdownEditor v-model="project.text" label="Treść opisu projektu" required :error="errors.text" :show-error="submitted" />
          </FormCard>

          <FormCard title="Galeria" description="Pierwsze zdjęcie jest miniaturą projektu.">
            <GalleryEditor v-model="project.gallery" />
          </FormCard>
        </div>

        <aside class="editor__side">
          <FormCard title="Linki" description="Repozytoria, blogi i inne materiały projektu.">
            <LinkListInput v-model="project.links" />
          </FormCard>
          <FormCard v-if="project.creation_date" title="Informacje">
            <dl class="dates">
              <div><dt>Utworzono</dt><dd>{{ formatDateTime(project.creation_date) }}</dd></div>
              <div v-if="project.publication_date"><dt>Opublikowano</dt><dd>{{ formatDateTime(project.publication_date) }}</dd></div>
            </dl>
          </FormCard>
        </aside>
      </div>
    </div>

    <EditorActions
      v-if="project"
      :text="add ? 'Czy na pewno chcesz opuścić ekran tworzenia nowego projektu bez zapisywania zmian?' : 'Czy na pewno chcesz wyjść z edycji projektu bez zapisywania zmian?'"
      :save-text="add ? 'Dodaj projekt' : 'Zapisz zmiany'"
      :discard-text="add ? 'Odrzuć' : 'Odrzuć zmiany'"
      @save-changes="add ? addProject() : editProject()"
      @discard-changes="returnFromEditor"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ProjectsService } from '@/services/ProjectsService';
import { SectionsService } from '@/services/SectionsService';
import { ProjectModel } from '@/models/ProjectModel';
import type { GalleryModelImage } from '@/models/GalleryModelImage';
import PageHeader from '@/components/ui/PageHeader.vue';
import LoadingState from '@/components/ui/LoadingState.vue';
import TextField from '@/components/ui/TextField.vue';
import MultiSelect from '@/components/ui/MultiSelect.vue';
import FormCard from '@/components/editor/FormCard.vue';
import MarkdownEditor from '@/components/editor/MarkdownEditor.vue';
import GalleryEditor from '@/components/editor/GalleryEditor.vue';
import LinkListInput from '@/components/editor/LinkListInput.vue';
import EditorActions from '@/components/editor/EditorActions.vue';
import { useUsers } from '@/composables/useUsers';
import { formatDateTime } from '@/utils/date';
import { isValid, required, validate } from '@/utils/validation';

const route = useRoute();
const router = useRouter();
const store = useStore();
const projectsService = new ProjectsService();
const sectionsService = new SectionsService();
const users = useUsers();

const add = route.path.includes('add');
const project = ref<any>();
const sections = ref<any[]>([]);
const submitted = ref(false);

const errors = computed(() => ({
  title: validate(project.value?.title, [required]),
  section: validate(project.value?.section, [required]),
  authors: validate(project.value?.authors, [required]),
  text: validate(project.value?.text, [required]),
}));

function cleanData(data: any) {
  data.authors = data.authors !== undefined ? data.authors.map((el: any) => (typeof el === 'object' ? el.id : el)) : [];
  if (data.section !== undefined && data.section !== null && typeof data.section === 'object') {
    data.section = data.section.id;
  }
  if (data.gallery === undefined) {
    data.gallery = [];
  }
  data.links = Array.isArray(data.links)
    ? data.links.map((l: any) => ({ text: l.text ?? l.link, type: l.type ?? l.link_type }))
    : [];
  return data;
}

function getProject() {
  if (route.params.id !== undefined) {
    projectsService
      .getProject(Number(route.params.id), false)
      .then((result) => {
        project.value = cleanData(result);
      })
      .catch(() => {
        store.dispatch('errorMessage', 'Wystąpił błąd przy pobieraniu projektu!');
        router.replace({ name: 'projects' });
      });
  } else {
    router.replace({ name: 'error404' });
  }
}

function warnInvalid() {
  store.dispatch('warningMessage', 'Formularz nie został poprawnie wypełniony!');
}

function addProject() {
  submitted.value = true;
  if (!isValid(errors.value)) {
    warnInvalid();
    return;
  }
  projectsService
    .addProject({
      title: project.value.title,
      authors: project.value.authors,
      text: project.value.text,
      section: project.value.section,
      creator: store.getters.user.id,
      repository_links: project.value.links,
      gallery: project.value.gallery.map((el: GalleryModelImage) => el.id),
      creation_date: new Date(),
      publication_date: new Date(),
    })
    .then((res: any) => {
      if (res.status === 201) {
        store.dispatch('successMessage', 'Projekt został dodany');
        router.replace({ name: 'project', params: { id: res.data.id } });
      }
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd poczas zapisywania projektu!');
    });
}

function editProject() {
  submitted.value = true;
  if (!isValid(errors.value)) {
    warnInvalid();
    return;
  }
  projectsService
    .editProject(project.value.id, {
      title: project.value.title,
      authors: project.value.authors,
      text: project.value.text,
      section: project.value.section,
      repository_links: project.value.links,
      gallery: project.value.gallery.map((el: GalleryModelImage) => el.id),
    })
    .then((res: any) => {
      if (res.status === 200) {
        store.dispatch('successMessage', 'Projekt został zaktualizowany');
        returnFromEditor();
      }
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd poczas edycji projektu!');
    });
}

function returnFromEditor() {
  if (add) {
    router.replace({ name: 'projects', params: { page: '1' } });
  } else {
    router.replace({ name: 'project', params: { id: project.value.id } });
  }
}

onMounted(() => {
  sectionsService.getAllSections().then((res) => {
    sections.value = res.data;
  });
  if (add) {
    project.value = cleanData(new ProjectModel());
  } else {
    getProject();
  }
});
</script>
