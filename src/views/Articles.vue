<template>
  <articles-list v-bind:articles="articles" v-bind:pagination="pagination"></articles-list>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import ArticlesList from "@/components/ArticlesList.vue";
import { ArticlesService } from "@/services/ArticlesService";
import { ArticleModel } from "@/models/ArticleModel";
import { PaginationModel } from "@/models/PaginationModel";

@Component({
  components: {
    HelloWorld
  }
})
export default class Articles extends Vue {
  private articlesService!: ArticlesService;
  private articles!: ArticleModel[];
  private pagination!: PaginationModel;

  constructor() {
    super();
  }

  beforeCreate() {
    this.articlesService = new ArticlesService();
    this.articlesService.getAllArticles().then(articles => {
      this.articles = articles;
      this.pagination = new PaginationModel(articles.length, 4);
    });
  }

  public data() {
    return {
      pagination: this.pagination,
      articles: this.articles
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
</style>
