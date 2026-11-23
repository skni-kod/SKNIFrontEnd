<template>
  <div>
    <LoadingState v-if="loading" />
    <template v-else-if="articles.length">
      <div class="article-grid">
        <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
      </div>
      <Pagination
        class="article-grid__pagination"
        :model-value="page"
        :length="pageCount"
        @update:model-value="$emit('update:page', $event)"
      />
    </template>
    <EmptyState v-else icon="text-box-search-outline" :title="emptyTitle" :text="emptyText" />
  </div>
</template>

<script setup lang="ts">
import type { ArticleModel } from '@/models/ArticleModel';
import ArticleCard from '@/components/ArticleCard.vue';
import Pagination from '@/components/ui/Pagination.vue';
import LoadingState from '@/components/ui/LoadingState.vue';
import EmptyState from '@/components/ui/EmptyState.vue';

withDefaults(
  defineProps<{
    articles: ArticleModel[];
    loading: boolean;
    page: number;
    pageCount: number;
    emptyTitle?: string;
    emptyText?: string;
  }>(),
  { emptyTitle: 'Brak artykułów', emptyText: 'Nie opublikowano tu jeszcze żadnych wpisów.' },
);
defineEmits<{ 'update:page': [page: number] }>();
</script>

<style scoped>
.article-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.article-grid__pagination {
  margin-top: 48px;
}

@media (max-width: 1023px) {
  .article-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .article-grid {
    grid-template-columns: 1fr;
  }
}
</style>
