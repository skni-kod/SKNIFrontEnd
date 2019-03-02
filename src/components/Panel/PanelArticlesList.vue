<template>
  <div>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <div v-for="article in articles" :key="article.title">
          <div>{{ article.id }}</div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ArticleModel } from "@/models/ArticleModel";
import { PaginationModel } from "@/models/PaginationModel";

@Component
export default class PanelArticlesList extends Vue {
  @Prop() articles!: ArticleModel[];
}
</script>