<template>
  <div class="articles">
    <ul id="example-1">
      <li v-for="(article, index) in articles" :key="index">{{index}} - {{ article.title }}</li>
    </ul>

    <paginate
      :page-count="pagination.pageCount"
      :page-range="3"
      :margin-pages="2"
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
  private articles!: ArticleModel[];
  @Prop() private pagination!: PaginationModel;

  constructor() {
    super();

    this.articlesService = new ArticlesService();
    this.pagination = new PaginationModel();
    this.pagination.pageCount = 123;
  }

  async mounted() {
    this.articles = await this.articlesService.getAllArticles();
  }

  public data() {
    return {
      articles: this.articles
    };
  }

  public paginationClicked(pageNumber: number) {
    console.log("Pagination number: " + pageNumber);
  }
}
</script>
