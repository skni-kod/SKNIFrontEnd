<template>
  <div v-if="article != undefined">
    <p>Dane artykułu {{$route.params.id}}</p>
    <p>Tytuł: {{ article.title }}</p>
    <p>Autor: {{article.creator.user.username}}, Data: {{article.creation_date}}</p>
    <p>
      Tagi:
      <span v-for="articleTag in article.tags" :key="articleTag.tag.name">
        #
        <a v-bind:href="'/#/tag/'+ articleTag.tag.name">{{ articleTag.tag.name }}</a>
      </span>
    </p>
    <p>Treść:
      <vue-markdown>{{article.text}}</vue-markdown>
    </p>

    <comments-list v-bind:comments="comments"></comments-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import { ArticlesService } from "@/services/ArticlesService";
import { CommentsService } from "@/services/CommentsService";
import { ArticleModel } from "@/models/ArticleModel";
import { CommentModel } from "@/models/CommentModel";

@Component({
  components: {
    HelloWorld
  }
})
export default class Article extends Vue {
  private articlesService!: ArticlesService;
  private commentsService!: CommentsService;
  private article!: ArticleModel;
  private comments!: CommentModel[];

  beforeCreate() {
    this.articlesService = new ArticlesService();
    this.commentsService = new CommentsService();

    this.articlesService.getArticle(+this.$route.params.id).then(article => {
      this.article = article;
    });

    this.commentsService
      .getCommentsForArticle(+this.$route.params.id)
      .then(comments => {
        this.comments = comments;
      });
  }

  public data() {
    return {
      article: this.article,
      comments: this.comments
    };
  }
}
</script>
