<template>
  <div>
    <PageHeader
      eyebrow="Panel administratora"
      :title="add ? 'Nowy artykuł' : 'Edycja artykułu'"
      :description="add ? undefined : `ID: ${route.params.id}`"
      :back="{ to: add ? { name: 'articles' } : returnRoute, label: add ? 'Artykuły' : 'Wróć do artykułu' }"
    />

    <LoadingState v-if="!article" class="page" />
    <div v-else class="page page--editor">
      <div class="container editor">
        <div class="editor__main">
          <FormCard title="Podstawowe informacje">
            <TextField v-model="article.title" label="Tytuł" required :error="errors.title" :show-error="submitted" />
            <TextField
              v-model="article.alias"
              label="Alias (adres URL)"
              required
              hint="Używany w adresie strony, np. moj-pierwszy-artykul."
              :error="errors.alias"
              :show-error="submitted"
            >
              <template #suffix>
                <button type="button" class="btn btn--soft" @click="generateAlias">
                  <i class="mdi mdi-auto-fix" aria-hidden="true"></i> Generuj
                </button>
              </template>
            </TextField>
            <div class="form-row">
              <SelectField v-model="article.group" label="Typ wpisu" required :options="groups" placeholder="Wybierz typ" :error="errors.group" :show-error="submitted" />
              <MultiSelect v-model="article.tags" label="Tagi" :items="tags" item-text="name" placeholder="Wyszukaj tagi" />
            </div>
            <MultiSelect
              v-model="article.authors"
              label="Autorzy"
              required
              :items="users"
              item-text="fullname"
              placeholder="Wyszukaj autorów"
              :error="errors.authors"
              :show-error="submitted"
            />
          </FormCard>

          <FormCard title="Treść">
            <MarkdownEditor v-model="article.text" label="Treść artykułu" required :error="errors.text" :show-error="submitted" />
          </FormCard>

          <FormCard title="Galeria" description="Pierwsze zdjęcie jest miniaturą artykułu.">
            <GalleryEditor v-model="article.gallery" />
          </FormCard>
        </div>

        <aside class="editor__side">
          <FormCard title="Podgląd karty">
            <div v-if="!hasReadMore" class="alert alert--warning">
              <i class="mdi mdi-alert-outline" aria-hidden="true"></i>
              <span>Dodaj znacznik <code>---readmore---</code>, aby skrócić podgląd na liście artykułów.</span>
            </div>
            <ArticleCard :article="preview" :linkable="false" />
          </FormCard>
          <FormCard v-if="article.creation_date" title="Informacje">
            <dl class="dates">
              <div><dt>Utworzono</dt><dd>{{ formatDateTime(article.creation_date) }}</dd></div>
              <div v-if="article.publication_date"><dt>Opublikowano</dt><dd>{{ formatDateTime(article.publication_date) }}</dd></div>
            </dl>
          </FormCard>
        </aside>
      </div>
    </div>

    <EditorActions
      v-if="article"
      :text="add ? 'Czy na pewno chcesz opuścić ekran tworzenia nowego artykułu bez zapisywania zmian?' : 'Czy na pewno chcesz wyjść z edycji artykułu bez zapisywania zmian?'"
      :save-text="add ? 'Dodaj artykuł' : 'Zapisz zmiany'"
      :discard-text="add ? 'Odrzuć' : 'Odrzuć zmiany'"
      @save-changes="add ? addArticle() : editArticle()"
      @discard-changes="returnFromEditor"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ArticlesService } from '@/services/ArticlesService';
import { TagsService } from '@/services/TagsService';
import { ArticleModel } from '@/models/ArticleModel';
import type { GalleryModelImage } from '@/models/GalleryModelImage';
import PageHeader from '@/components/ui/PageHeader.vue';
import LoadingState from '@/components/ui/LoadingState.vue';
import TextField from '@/components/ui/TextField.vue';
import SelectField from '@/components/ui/SelectField.vue';
import MultiSelect from '@/components/ui/MultiSelect.vue';
import FormCard from '@/components/editor/FormCard.vue';
import MarkdownEditor from '@/components/editor/MarkdownEditor.vue';
import GalleryEditor from '@/components/editor/GalleryEditor.vue';
import EditorActions from '@/components/editor/EditorActions.vue';
import ArticleCard from '@/components/ArticleCard.vue';
import { useUsers } from '@/composables/useUsers';
import { formatDateTime } from '@/utils/date';
import { isValid, required, validate } from '@/utils/validation';

const route = useRoute();
const router = useRouter();
const store = useStore();
const articlesService = new ArticlesService();
const tagsService = new TagsService();
const users = useUsers();

const add = route.path.includes('add');
const article = ref<any>();
const tags = ref<any[]>([]);
const submitted = ref(false);
const groups = [
  { value: 'News', label: 'Aktualność' },
  { value: 'Article', label: 'Artykuł' },
];

const errors = computed(() => ({
  title: validate(article.value?.title, [required]),
  alias: validate(article.value?.alias, [required]),
  group: validate(article.value?.group, [required]),
  authors: validate(article.value?.authors, [required]),
  text: validate(article.value?.text, [required]),
}));

const returnRoute = computed(() => ({
  name: 'article',
  params: { id: article.value?.id ?? route.params.id, alias: article.value?.alias || 'artykul' },
}));

const hasReadMore = computed(() => (article.value?.text || '').includes('---readmore---'));

const preview = computed(() => {
  const copy = Object.assign({}, article.value);
  if (copy.text) {
    const readMoreIndex = copy.text.indexOf('---readmore---');
    if (readMoreIndex !== -1) {
      copy.text = copy.text.slice(0, readMoreIndex);
    }
  }
  copy.creation_date = copy.creation_date || new Date();
  return copy;
});

function cleanData(data: any) {
  if (data.authors !== undefined) {
    data.authors = data.authors.map((el: any) => (typeof el === 'object' ? el.id : el));
  } else {
    data.authors = [];
  }
  if (data.tags !== undefined) {
    data.tags = data.tags.map((el: any) => (typeof el === 'object' ? el.id : el));
  } else {
    data.tags = [];
  }
  if (data.gallery === undefined) {
    data.gallery = [];
  }
  return data;
}

function generateAlias() {
  article.value.alias = articlesService.generateAliasForTitle(article.value.title);
}

function getArticle() {
  if (route.params.id !== undefined) {
    articlesService
      .getArticle(Number(route.params.id), false)
      .then((result) => {
        article.value = cleanData(result);
      })
      .catch(() => {
        store.dispatch('errorMessage', 'Wystąpił błąd przy pobieraniu artykułu!');
        router.replace({ name: 'articles' });
      });
  } else {
    router.replace({ name: 'error404' });
  }
}

function warnInvalid() {
  store.dispatch('warningMessage', 'Formularz nie został poprawnie wypełniony!');
}

function addArticle() {
  submitted.value = true;
  if (!isValid(errors.value)) {
    warnInvalid();
    return;
  }
  articlesService
    .addArticle(article.value.id, {
      title: article.value.title,
      alias: article.value.alias,
      authors: article.value.authors,
      text: article.value.text,
      tags: article.value.tags,
      group: article.value.group,
      gallery: article.value.gallery.map((el: GalleryModelImage) => el.id),
      creator: store.getters.user.id,
      creation_date: new Date(),
      publication_date: new Date(),
    })
    .then((res: any) => {
      if (res.status === 201) {
        store.dispatch('successMessage', 'Artykuł został dodany');
        returnFromEditor();
      }
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd poczas zapisywania artykułu!');
    });
}

function editArticle() {
  submitted.value = true;
  if (!isValid(errors.value)) {
    warnInvalid();
    return;
  }
  articlesService
    .editArticle(article.value.id, {
      title: article.value.title,
      alias: article.value.alias,
      authors: article.value.authors,
      text: article.value.text,
      tags: article.value.tags,
      group: article.value.group,
      gallery: article.value.gallery.map((el: GalleryModelImage) => el.id),
    })
    .then((res: any) => {
      if (res.status === 200) {
        store.dispatch('successMessage', 'Artykuł został zaktualizowany');
        returnFromEditor();
      }
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd poczas edycji artykułu!');
    });
}

function returnFromEditor() {
  if (add) {
    router.replace({ name: 'articles' });
  } else {
    router.replace(returnRoute.value);
  }
}

onMounted(() => {
  tagsService.getAllTags().then((res) => {
    tags.value = res.data;
  });
  if (add) {
    article.value = cleanData(new ArticleModel());
  } else {
    getArticle();
  }
});
</script>

<style scoped>
.alert code {
  font-family: var(--font-mono);
  font-size: 12px;
}
</style>
