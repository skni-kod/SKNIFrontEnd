<template>
  <div>
    <p>Dane artykułu {{$route.params.id}}</p>
    <p>Tytuł: {{ article.title }}</p>
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import { ArticlesService } from "@/services/ArticlesService";
import { ArticleModel } from "@/models/ArticleModel";

@Component({
  components: {
    HelloWorld
  }
})
export default class Article extends Vue {
  private articlesService!: ArticlesService;
  private article!: ArticleModel;

  constructor() {
    super();
  }

  beforeCreate() {
    this.articlesService = new ArticlesService();
    this.articlesService.getArticle(+this.$route.params.id).then(article => {
      this.article = article;
    });
  }

  public data() {
    return {
      article: this.article
    };
  }
}
</script>
