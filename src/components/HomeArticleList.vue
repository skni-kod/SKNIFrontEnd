<template>
  <v-card tile elevation="0" class="ma-1">
    <v-card-title class="text-h3 justify-center py-1">Najnowsze artykuły</v-card-title>
    <v-card-text class="pa-0">
      <v-row no-gutters justify="center">
      <v-col class="pa-1" cols="12" :md="index ? 6 : 12" v-for="(article, index) in articles"
        :key="article.title">
        <article-card :article="article" @delete="deleteArticle"></article-card>
      </v-col>
    </v-row>
    </v-card-text>
  </v-card>
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
          this.$router.replace({name:'articles',params:{page:'1'}});
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
