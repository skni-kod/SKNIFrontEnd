<template>
  <v-container grid-list-md text-xs-center>
    <p class="text-h3 text-center">Najnowsze artykuły</p>
    <v-layout align-space-between justify-center row fill-height wrap style="margin-top: 20px">
      <v-flex
        xs12
        :md6="index"
        :md12="!index"
        v-for="(article, index) in articles"
        :key="article.title"
      >
        <article-card :article="article" @delete="deleteArticle"></article-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ArticlesService } from '@/services/ArticlesService';
import { ArticleModel } from '@/models/ArticleModel';
@Component
export default class HomeArticleList extends Vue {
  @Prop() public articles!: ArticleModel[];
  private articlesService!: ArticlesService;

  private beforeCreate() {
    this.articlesService = new ArticlesService();
  }

  private deleteArticle(id: number) {
    this.articlesService
      .deleteArticle(id)
      .then((res) => {
        if (res.status === 204) {
          this.$store.dispatch('setSnackbarState', {
            state: true,
            msg: 'Artykuł został usunięty',
            color: 'success',
            timeout: 7500,
          });
          this.$router.replace('/articles/1');
        } else {
          this.$store.dispatch('setSnackbarState', {
            state: true,
            msg: 'Błąd poczas usuwania artykułu!',
            color: 'error',
            timeout: 7500,
          });
        }
      })
      .catch(() => {
        this.$store.dispatch('setSnackbarState', {
          state: true,
          msg: 'Błąd poczas usuwania artykułu!',
          color: 'error',
          timeout: 7500,
        });
      });
  }
}
</script>
