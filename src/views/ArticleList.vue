<template>
  <v-row align="center">
    <v-col class="py-0">
      <v-row align="center" justify="center" class="mx-2">
        <v-col cols="auto" class="pa-0">
          <article-card
            class="my-2"
            v-for="article in articles"
            :key="article.title"
            :article="article"
          ></article-card>
        </v-col>
      </v-row>
      <v-pagination
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
export default class ArticleList extends Vue {
  private articlesService!: ArticlesService;
  private pagination!: PaginationModel;
  private articles!: ArticleModel[];

  private beforeCreate() {
    this.articlesService = new ArticlesService();
    this.pagination = new PaginationModel(1, 3, 3);
  }

  private mounted() {
    this.getArticles();
  }

  private paginationClicked(pageNumber: number) {
    this.$router.replace({
      name: 'articles',
      params: { page: '' + pageNumber },
    });
    this.getArticles();
  }

  private getArticles() {
    const pageNumber = +this.$route.params.page;
    if (pageNumber === undefined || isNaN(pageNumber) || pageNumber < 1) {
      this.paginationClicked(1);
      return;
    }

    this.pagination.currentPage = pageNumber;
    this.articlesService
      .getArticles(pageNumber, this.pagination.itemsPerPage, false)
      .then((paginationContainer: PaginationContainer<ArticleModel>) => {
        this.articles = paginationContainer.results;
        if (!this.articles.length) {
          this.paginationClicked(1);
          return;
        }
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
