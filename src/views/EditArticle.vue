<template>
  <div>
    <v-form>
      <v-btn>submit</v-btn>
      <v-text-field label="Tytuł artykułu" v-model="article.title"></v-text-field>
      <v-text-field label="Alias" v-model="article.alias"></v-text-field>
      <v-btn @click="generateAlias">Wygeneruj alias</v-btn>
      <v-text-field label="Data utworzenia" v-model="article.creation_date"></v-text-field>
      <v-text-field label="Data publikacji" v-model="article.publication_date"></v-text-field>
      <v-text-field label="Tagi" v-model="article.tags"></v-text-field>
      <v-textarea label="Treść" v-model="article.text"></v-textarea>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ArticlesService } from "@/services/ArticlesService";
import { ArticleModel } from "@/models/ArticleModel";

@Component
export default class EditArticle extends Vue {
  private articlesService!: ArticlesService;
  private article!: ArticleModel;

  beforeCreate() {
    this.articlesService = new ArticlesService();
    this.article = new ArticleModel();
  }

  mounted() {
    if (this.$route.params.id != undefined) {
      this.articlesService.getArticle(+this.$route.params.id).then(article => {
        this.article = article;
      });
    }
  }

  public generateAlias() {
    this.article.alias = this.articlesService.generateAliasForTitle(
      this.article.title
    );
    this.$forceUpdate();
  }

  public data() {
    return {
      article: this.article
    };
  }
}
</script>
