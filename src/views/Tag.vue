<template>
  <div>
    <strong>Artykuły dla tagu #{{$route.params.tag}}</strong>
    <articles-list v-bind:articles="articles"></articles-list>
    <paginate
      v-if="pagination != undefined"
      v-model="pagination.currentPage"
      :page-count="pagination.pageCount"
      :page-range="3"
      :margin-pages="2"
      :prev-text="'Poprzednia strona'"
      :next-text="'Następna strona'"
      :container-class="'paginationContainer'"
      :click-handler="paginationClicked"
    ></paginate>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import ArticlesList from "@/components/ArticlesList.vue";
import { ArticlesService } from "@/services/ArticlesService";
import { ArticleModel } from "@/models/ArticleModel";
import { PaginationModel } from "@/models/PaginationModel";
import { PaginationContainer } from "@/models/PaginationContainer";

@Component({
  components: {
    HelloWorld
  }
})
export default class Tag extends Vue {
  private articlesService!: ArticlesService;
  private pagination!: PaginationModel;
  private articles!: ArticleModel[];

  beforeCreate() {
    this.articlesService = new ArticlesService();
    this.pagination = new PaginationModel(1, 3, 3);
  }

  mounted() {
    var pageNumber = +this.$route.params.page;
    if (pageNumber == undefined || isNaN(pageNumber)) {
      pageNumber = 1;
    }

    this.pagination.currentPage = pageNumber;
    this.paginationClicked(pageNumber);
  }

  public paginationClicked(pageNumber: number) {
    this.articlesService
      .getArticlesWithTag(
        this.$route.params.tag,
        pageNumber,
        this.pagination.itemsPerPage
      )
      .then((paginationContainer: PaginationContainer<ArticleModel>) => {
        this.articles = paginationContainer.results;
        this.pagination.itemCount = paginationContainer.count;
      });

    this.$router.replace({
      name: "tag",
      params: { page: "" + pageNumber }
    });
  }

  public data() {
    return {
      articles: this.articles,
      pagination: this.pagination
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
</style>
