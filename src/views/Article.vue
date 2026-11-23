<template>
  <div>
    <LoadingState v-if="!article" class="page" />
    <template v-else>
      <PageHeader narrow :back="backLink" :eyebrow="groupLabel" :title="article.title">
        <template #meta>
          <span class="meta-item">
            <i class="mdi mdi-calendar-blank-outline" aria-hidden="true"></i>
            <time :datetime="String(article.creation_date)">{{ formatDate(article.creation_date) }}</time>
          </span>
          <span v-if="readingTime" class="meta-item">
            <i class="mdi mdi-clock-outline" aria-hidden="true"></i> {{ readingTime }} min czytania
          </span>
        </template>
        <template v-if="role" #actions>
          <AdminActions
            :edit-to="{ name: 'articleEdit', params: { id: article.id } }"
            :confirm-text="dialogText"
            @delete="deleteArticle(article.id)"
          />
        </template>
      </PageHeader>

      <div class="page">
        <div class="container container--narrow article">
          <div v-if="authors.length || tags.length" class="article__info">
            <div v-if="authors.length" class="article__authors">
              <router-link
                v-for="author in authors"
                :key="author.id"
                :to="{ name: 'userProfile', params: { id: (author.profile && author.profile.id) || author.id } }"
                class="author"
              >
                <UserAvatar :first-name="author.first_name" :last-name="author.last_name" :username="author.username" :size="40" />
                <span>
                  <strong>{{ [author.first_name, author.last_name].filter(Boolean).join(' ') || author.username }}</strong>
                  <small>{{ authors.length === 1 ? 'Autor' : 'Współautor' }}</small>
                </span>
              </router-link>
            </div>
            <div v-if="tags.length" class="article__tags">
              <router-link
                v-for="tag in tags"
                :key="tag.id ?? tag.name"
                :to="{ name: 'tag', params: { tag: tag.name } }"
                class="chip"
              >
                <i class="mdi mdi-pound" aria-hidden="true"></i>{{ tag.name }}
              </router-link>
            </div>
          </div>

          <MarkdownView class="article__body" :content="article.text" />

          <Gallery class="article__gallery" :imgs="article.gallery" />

          <hr class="divider" />

          <CommentsList :comments="comments" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ArticlesService } from '@/services/ArticlesService';
import type { ArticleModel } from '@/models/ArticleModel';
import PageHeader from '@/components/ui/PageHeader.vue';
import LoadingState from '@/components/ui/LoadingState.vue';
import UserAvatar from '@/components/ui/UserAvatar.vue';
import MarkdownView from '@/components/MarkdownView.vue';
import Gallery from '@/components/Gallery.vue';
import CommentsList from '@/components/CommentsList.vue';
import AdminActions from '@/components/AdminActions.vue';
import { formatDate } from '@/utils/date';

const route = useRoute();
const router = useRouter();
const store = useStore();
const articlesService = new ArticlesService();
const article = ref<ArticleModel>();

const role = computed<boolean>(() => !!store.getters.isAdministrator);
const comments = computed(() => store.getters.comments);
const authors = computed<any[]>(() => ((article.value?.authors as any[]) || []).filter((a) => a && typeof a === 'object'));
const tags = computed<any[]>(() => ((article.value?.tags as any[]) || []).filter((t) => t && typeof t === 'object'));
const isNews = computed(() => article.value?.group === 'News');
const groupLabel = computed(() => (isNews.value ? 'Aktualności' : 'Artykuły SKNI'));
const backLink = computed(() =>
  isNews.value
    ? { to: { name: 'news' }, label: 'Wszystkie aktualności' }
    : { to: { name: 'articles' }, label: 'Wszystkie artykuły' },
);
const readingTime = computed(() => {
  const words = (article.value?.text || '').split(/\s+/).filter(Boolean).length;
  return words > 120 ? Math.max(1, Math.round(words / 200)) : 0;
});
const dialogText = computed(() => `Czy na pewno chcesz usunąć artykuł "${article.value?.title}"?`);

function deleteArticle(id: number) {
  articlesService
    .deleteArticle(id)
    .then((res) => {
      if (res.status === 204) {
        store.dispatch('successMessage', 'Artykuł został usunięty');
        router.replace({ name: 'articles', params: { page: '1' } });
      }
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd poczas usuwania artykułu!');
    });
}

onMounted(() => {
  articlesService
    .getArticle(Number(route.params.id))
    .then((result) => {
      article.value = result;
      document.title = `${result.title} | SKNI KOD`;
    })
    .catch(() => {
      router.replace({ name: 'error404' });
    });

  store.dispatch('getComments', route.params.id);
});

onBeforeUnmount(() => {
  store.dispatch('purgeComments');
});
</script>

<style scoped>
.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.meta-item .mdi {
  font-size: 17px;
  color: var(--text-subtle);
}

.article {
  display: grid;
  gap: 40px;
}

.article__info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--border);
}

.article__authors {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
}

.author {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text);
}

.author span {
  display: grid;
  line-height: 1.3;
}

.author strong {
  font-size: 15px;
  transition: color var(--t-fast);
}

.author:hover strong {
  color: var(--primary);
}

.author small {
  color: var(--text-subtle);
  font-size: 13px;
}

.article__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.article__tags .mdi {
  font-size: 14px;
  margin-right: -2px;
}
</style>
