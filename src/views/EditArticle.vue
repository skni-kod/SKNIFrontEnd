<template>
  <div>
    <v-container grid-list-md text-xs-centxer>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field label="Tytuł artykułu" v-model="article.title"></v-text-field>
        </v-flex>
        <v-flex xs10>
          <v-text-field label="Alias" v-model="article.alias"></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-btn @click="generateAlias">Wygeneruj</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-text-field label="Data utworzenia" v-model="article.creation_date"></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field label="Data publikacji" v-model="article.publication_date"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-select v-model="selectedTags" :items="allTags" :item-text="tagTextSelector" attach chips label="Tags" multiple></v-select>
        </v-flex>
        <v-flex xs6 class="text-xs-left full-height">
          <v-textarea id="test" v-model="article.text" class="content-textarea" v-scroll:#test="onScroll"></v-textarea>
        </v-flex>
        <v-flex xs6 class="text-xs-left">
          <vue-markdown :source="article.text" class="content-preview" html ref="qwe"></vue-markdown>
        </v-flex>
      </v-layout>
    </v-container>
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

        this.tagsService.getAllTags().then(tags => {
          this.allTags = tags;
          this.selectedTags = this.article.tags.map(p => p.tag.name);
        });
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
      article: this.article,
      allTags: this.allTags,
      selectedTags: this.selectedTags,
      html: true
    };
  }

  public tagTextSelector(item: TagModel) {
    return item.name;
  }

  public onScroll(offset: any) {
    var contentPreview = this.$el.querySelector(".content-preview");
    if (contentPreview != undefined) {
      contentPreview.scrollTop = offset.target.scrollTop;
    }
  }
}
</script>

<style scope>
.content-textarea {
  padding-top: 0;
}

.content-textarea textarea {
  overflow: auto;
  height: 500px;
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  line-height: 18.5714px;
  font-size: 13px;
  padding-top: 0;
  resize: none;
}

.content-preview {
  overflow: auto;
  height: 500px;
  line-height: 22px;
  resize: none;
}
</style>