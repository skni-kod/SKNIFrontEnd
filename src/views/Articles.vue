<template>
  <div class="articles">
    <ul id="example-1">
      <li v-for="(article, index) in articles" :key="index">{{index}} - {{ article.title }}</li>
    </ul>

    <paginate
      :page-count="20"
      :click-handler="paginationClicked"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'className'"
    ></paginate>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import { ArticlesService } from "@/services/ArticlesService";
import { ArticleModel } from "@/models/ArticleModel";

@Component({
  components: {
    HelloWorld
  }
})
export default class Articles extends Vue {
  private articlesService!: ArticlesService;
  private articles!: ArticleModel[];

  constructor() {
    super();
    this.articlesService = new ArticlesService();
  }

  async mounted() {
    this.articles = await this.articlesService.getAllArticles();
  }

  public data() {
    return { articles: this.articles };
  }

  public paginationClicked(pageNumber: number) {
    console.log("Pagination number: " + pageNumber);
  }
}
</script>
