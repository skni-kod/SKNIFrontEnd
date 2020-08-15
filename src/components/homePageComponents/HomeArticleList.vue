<template>
  <v-container grid-list-md text-xs-center>
    <p class="text-h3">Najnowsze artykuły</p>
    <v-layout align-space-between justify-center row fill-height wrap style="margin-top: 20px">
      <v-flex
        xs12
        :md6="index"
        :md12="!index"
        v-for="(article, index) in articles"
        :key="article.title"
      >
        <article-card :article="article"></article-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ArticleModel } from '@/models/ArticleModel';
@Component
export default class HomeArticleList extends Vue {
  @Prop() public articles!: ArticleModel[];
}
</script>
