<template>
  <ArticleGrid
    :articles="articles"
    :loading="loading"
    :page="pagination.currentPage"
    :page-count="pagination.pageCount"
    @update:page="paginationClicked"
  />
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArticlesService } from '@/services/ArticlesService';
import type { ArticleModel } from '@/models/ArticleModel';
import { PaginationModel } from '@/models/PaginationModel';
import ArticleGrid from '@/components/ArticleGrid.vue';

const props = defineProps<{ group: 'News' | 'Article' }>();

const ROUTE_FOR_GROUP = { News: 'news', Article: 'articles' } as const;

const route = useRoute();
const router = useRouter();
const articlesService = new ArticlesService();
const pagination = reactive(new PaginationModel(1, 6, 6));
const articles = ref<ArticleModel[]>([]);
const loading = ref(true);

function paginationClicked(pageNumber: number) {
  router.replace({ name: ROUTE_FOR_GROUP[props.group], params: { page: String(pageNumber) } });
}

function getArticles() {
  let pageNumber = Number(route.params.page);
  if (!pageNumber || Number.isNaN(pageNumber) || pageNumber < 1) {
    pageNumber = 1;
  }

  pagination.currentPage = pageNumber;
  articlesService
    .getGroupArticles(props.group, pageNumber, pagination.itemsPerPage, false)
    .then((container) => {
      articles.value = container.results;
      if (!articles.value.length && pageNumber !== 1) {
        paginationClicked(1);
        return;
      }
      pagination.itemCount = container.count;
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
}

onMounted(getArticles);
</script>
