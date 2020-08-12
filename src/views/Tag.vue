<template>
  <div>
    <h2 class="header-margin">Artykuły dla tagu #{{$route.params.tag}}</h2>
    <articles-list :articles="articles"></articles-list>
    <v-pagination
      v-model="pagination.currentPage"
      :length="pagination.pageCount"
      @input="paginationClicked"
      prev-icon="mdi-chevron-left"
      next-icon="mdi-chevron-right"
    ></v-pagination>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import ArticlesList from '@/components/ArticlesList.vue';
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
    let pageNumber = +this.$route.params.page;
    if (pageNumber === undefined || isNaN(pageNumber)) {
      pageNumber = 1;
    }

    this.pagination.currentPage = pageNumber;
    this.paginationClicked(pageNumber);
  }

  private paginationClicked(pageNumber: number) {
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

    this.$router.replace({
      name: 'tag',
      params: { page: '' + pageNumber },
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

<style>
.paginationContainer {
  display: inline-block;
}

.paginationContainer > li {
  display: inline-block;
  border: 1px solid rgb(200, 200, 200);
}

.active {
  font-weight: bold;
}

.header-margin {
  margin: 20px auto;
}
</style>
