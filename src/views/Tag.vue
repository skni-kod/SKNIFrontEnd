<template>
  <v-row justify="center" align="center" class="fill-height">
    <v-col class="py-0">
      <p class="text-h5 font-weight-bold text-center ma-2">
        Artykuły dla tagu #{{ $route.params.tag }}
      </p>
      <article-card
        class="ma-2"
        v-for="article in articles"
        :key="article.title"
        :article="article"
      ></article-card>
      <v-pagination
        class="ma-2"
        v-model="pagination.currentPage"
        :length="pagination.pageCount"
        @input="paginationClicked"
        prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right"
      ></v-pagination>
    </v-col>
  </v-row>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ArticlesService } from '@/services/ArticlesService';
import { ArticleModel } from '@/models/ArticleModel';
import { PaginationModel } from '@/models/PaginationModel';
import { PaginationContainer } from '@/models/PaginationContainer';

@Component
export default class Tag extends Vue {
  private articlesService!: ArticlesService;
  private pagination!: PaginationModel;
  private articles!: ArticleModel[];

  private beforeCreate() {
    this.articlesService = new ArticlesService();
    this.pagination = new PaginationModel(1, 3, 3);
  }

  private mounted() {
    this.getarticlesWithTag();
  }

  private paginationClicked(pageNumber: number) {
    this.$router.replace({
      name: 'tag',
      params: { page: '' + pageNumber },
    });
    this.getarticlesWithTag();
  }

  private getarticlesWithTag() {
    let pageNumber = +this.$route.params.page;
    if (pageNumber === undefined || isNaN(pageNumber)) {
      pageNumber = 1;
    }

    this.pagination.currentPage = pageNumber;
    this.articlesService
      .getArticlesWithTag(
        this.$route.params.tag,
        pageNumber,
        this.pagination.itemsPerPage,
        false,
      )
      .then((paginationContainer: PaginationContainer<ArticleModel>) => {
        this.articles = paginationContainer.results;
        this.pagination.itemCount = paginationContainer.count;
      });
  }

  private data() {
    return {
      articles: this.articles,
      pagination: this.pagination,
    };
  }
}
</script>
