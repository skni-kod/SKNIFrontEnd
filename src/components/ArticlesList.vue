<template>
  <div>
    <div v-for="article in paginatedArticles" :key="article.title" style="border: 1px solid gray">
      <p>
        Tytuł:
        <a v-bind:href="'/#/article/'+ article.id">{{ article.title }}</a>
      </p>
      <p>Autor: {{article.creator.user.username}}, Data: {{article.creation_date}}</p>
      <p>
        Tagi:
        <span
          v-for="articleTag in article.tags"
          :key="articleTag.tag.name"
        >#{{ articleTag.tag.name }}</span>
      </p>
      <p>Treść:
        <vue-markdown>{{article.text}}</vue-markdown>
      </p>
    </div>

    <paginate
      v-if="pagination != undefined"
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
import { Component, Prop, Vue } from "vue-property-decorator";
import { ArticleModel } from "@/models/ArticleModel";
import { PaginationModel } from "@/models/PaginationModel";

@Component
export default class ArticlesList extends Vue {
  @Prop() articles!: ArticleModel[];
  @Prop() pagination!: PaginationModel;

  private paginatedArticles!: ArticleModel[];

  public paginationClicked(pageNumber: number) {
    this.paginatedArticles = this.articles.slice(
      (pageNumber - 1) * this.pagination.itemsPerPage,
      pageNumber * this.pagination.itemsPerPage
    );
  }

  public data() {
    return {
      paginatedArticles: this.paginatedArticles
    };
  }
}
</script>