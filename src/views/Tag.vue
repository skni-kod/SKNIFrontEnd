<template>
  <div>
    <PageHeader eyebrow="Artykuły z tagiem" :title="`#${tag}`" :back="{ to: { name: 'articles' }, label: 'Wszystkie artykuły' }" />
    <div class="page">
      <div class="container">
        <ArticleGrid
          :articles="articles"
          :loading="loading"
          :page="pagination.currentPage"
          :page-count="pagination.pageCount"
          empty-title="Brak artykułów z tym tagiem"
          empty-text="Spróbuj wybrać inny tag lub przejrzyj wszystkie artykuły."
          @update:page="paginationClicked"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArticlesService } from '@/services/ArticlesService';
import type { ArticleModel } from '@/models/ArticleModel';
import { PaginationModel } from '@/models/PaginationModel';
import PageHeader from '@/components/ui/PageHeader.vue';
import ArticleGrid from '@/components/ArticleGrid.vue';

const route = useRoute();
const router = useRouter();
const articlesService = new ArticlesService();
const pagination = reactive(new PaginationModel(1, 3, 6));
const articles = ref<ArticleModel[]>([]);
const loading = ref(true);
const tag = computed(() => String(route.params.tag));

function paginationClicked(pageNumber: number) {
  router.replace({ name: 'tag', params: { tag: tag.value, page: String(pageNumber) } });
}

function getArticlesWithTag() {
  let pageNumber = Number(route.params.page);
  if (!pageNumber || Number.isNaN(pageNumber)) {
    pageNumber = 1;
  }

  pagination.currentPage = pageNumber;
  articlesService
    .getArticlesWithTag(tag.value, pageNumber, pagination.itemsPerPage, false)
    .then((container) => {
      articles.value = container.results;
      pagination.itemCount = container.count;
    })
    .finally(() => {
      loading.value = false;
    });
}

onMounted(getArticlesWithTag);
</script>
