<template>
  <div class="articles">
    <ul id="example-1">
      <li
        v-for="(article, index) in paginatedArticles"
        :key="article.title"
      >{{index}} - {{ article.title }}</li>
    </ul>

    <paginate
      v-if="pagination != undefined"
      :page-count="pagination.pageCount"
      :page-range="3"
      :margin-pages="2"
      :click-handler="paginationClicked"
      :prev-text="'Poprzednia strona'"
      :next-text="'Następna strona'"
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
