<template>
  <div>
    <v-form>
      <v-btn>submit</v-btn>
      <v-text-field label="Tytuł artykułu" v-model="article.title"></v-text-field>
      <v-text-field label="Alias" v-model="article.alias"></v-text-field>
      <v-btn @click="generateAlias">Wygeneruj alias</v-btn>
      <v-text-field label="Data utworzenia" v-model="article.creation_date"></v-text-field>
      <v-text-field label="Data publikacji" v-model="article.publication_date"></v-text-field>
      <v-select
        v-model="selectedTags"
        :items="allTags"
        :item-text="tagTextSelector"
        attach
        chips
        label="Tags"
        multiple
      ></v-select>
      <v-textarea label="Treść" v-model="article.text"></v-textarea>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ArticlesService } from "@/services/ArticlesService";
import { TagsService } from "@/services/TagsService";
import { ArticleModel } from "@/models/ArticleModel";
import { TagModel } from "@/models/TagModel";

@Component
export default class EditArticle extends Vue {
  private articlesService!: ArticlesService;
  private tagsService!: TagsService;
  private article!: ArticleModel;
  private allTags!: TagModel[];
  private selectedTags!: string[];

  beforeCreate() {
    this.articlesService = new ArticlesService();
    this.tagsService = new TagsService();
    this.article = new ArticleModel();
  }

  mounted() {
    if (this.$route.params.id != undefined) {
      this.articlesService.getArticle(+this.$route.params.id).then(article => {
        this.article = article;
      });
    }

    this.tagsService.getAllTags().then(tags => {
      this.allTags = tags;
    });
  }

  public generateAlias() {
    this.article.alias = this.articlesService.generateAliasForTitle(
      this.article.title
    );
    this.$forceUpdate();
  }

  public data() {
    return {
      article: this.article,
      allTags: this.allTags,
      selectedTags: this.selectedTags
    };
  }

  public tagTextSelector(item: TagModel) {
    return item.name;
  }
}
</script>
