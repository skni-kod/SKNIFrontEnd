<template>
  <div class="articles">
    <div v-for="article in paginatedArticles" :key="article.title" style="border: 1px solid gray">
      <p>Tytuł: {{ article.title }}</p>
      <p>Autor: {{article.creator.user.username}}, Data: {{article.creation_date}}</p>
      <p>Treść:
        <vue-markdown>{{article.text}}</vue-markdown>
      </p>
    </div>

    <paginate
      v-if="pagination != undefined"
      :page-count="pagination.pageCount"
      :page-range="3"
      :margin-pages="2"
      :click-handler="paginationClicked"
      :prev-text="'Poprzednia strona'"
      :next-text="'Następna strona'"
      :container-class="'paginationContainer'"
    ></paginate>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
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
  private allArticles!: ArticleModel[];
  private paginatedArticles!: ArticleModel[];
  private pagination!: PaginationModel;

  private articlesPerPage: number = 4;

  constructor() {
    super();
  }

  beforeCreate() {
    this.articlesService = new ArticlesService();
    this.articlesService.getAllArticles().then(articles => {
      this.allArticles = articles;
      this.pagination = new PaginationModel(
        articles.length,
        this.articlesPerPage
      );

      this.paginationClicked(1);
    });
  }

  public data() {
    return {
      pagination: this.pagination,
      paginatedArticles: this.paginatedArticles
    };
  }

  public paginationClicked(pageNumber: number) {
    this.paginatedArticles = this.allArticles.slice(
      (pageNumber - 1) * this.articlesPerPage,
      pageNumber * this.articlesPerPage
    );
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
