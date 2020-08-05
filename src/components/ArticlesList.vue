<template>
  <div>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <div class="ma-2" v-for="article in articles" :key="article.title">
          <article-card v-bind:article="article"></article-card>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ArticleModel } from '@/models/ArticleModel';
import { PaginationModel } from '@/models/PaginationModel';

@Component
export default class ArticlesList extends Vue {
  @Prop() public articles!: ArticleModel[];
}
</script>
