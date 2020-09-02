<template>
  <v-card outlined class="ma-2">
    <v-card-title
      class="text-h3 font-weight-bold justify-center"
      style="word-break: break-word;"
    >Edycja artykułu nr {{ this.$route.params.id }}</v-card-title>
    <v-divider />
    <v-card-text>
      <v-form v-model="inputValidated">
        <v-layout
          v-if="Article.creation_date && Article.publication_date"
          wrap
          justify-space-between
        >
          <v-flex xs12 sm6>
            <p
              class="text-center"
            >Data utworzenia: {{ Article.creation_date | moment("DD.MM.YYYY hh:mm:ss") }}</p>
          </v-flex>
          <v-flex xs12 sm6>
            <p
              class="text-center"
            >Data publikacji: {{ Article.publication_date | moment("DD.MM.YYYY hh:mm:ss") }}</p>
          </v-flex>
        </v-layout>
        <v-divider v-if="Article.creation_date && Article.publication_date" />
        <v-text-field clearable label="Tytuł artykułu" v-model="Article.title" :rules="[required]"></v-text-field>
        <v-row align="center">
          <v-col class="py-0">
            <v-text-field clearable label="Alias" v-model="Article.alias" :rules="[required]"></v-text-field>
          </v-col>
          <v-col class="py-0" cols="auto">
            <v-btn color="primary" @click="generateAlias()">Wygeneruj alias</v-btn>
          </v-col>
        </v-row>
        <v-select
          v-model="selectedTags"
          :items="allTags"
          :item-text="tagTextSelector"
          hide-selected
          small-chips
          deletable-chips
          label="Tagi artykułu"
          multiple
        >
          <template v-slot:no-data>
            <v-alert type="info" class="ma-0">Wszystkie tagi wykorzystane!</v-alert>
          </template>
        </v-select>
        <v-divider class="mb-3" />
        <markdown-editor v-model="Article.text"></markdown-editor>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { ArticlesService } from '@/services/ArticlesService';
import { ArticleModel } from '@/models/ArticleModel';
import { TagModel } from '@/models/TagModel';

@Component
export default class ArticleEditor extends Vue {
  @Prop() public readonly article!: ArticleModel;
  @Prop() public readonly tags!: TagModel;
  @Prop() public readonly selTags!: string[];

  private articlesService!: ArticlesService;

  get Article() {
    return this.article;
  }

  set Article(article: ArticleModel) {
    this.$emit('articleEdited', article);
  }

  get allTags() {
    return this.tags;
  }

  set allTags(tags: TagModel) {
    this.$emit('tagListEdited', tags);
  }

  get selectedTags() {
    return this.selTags;
  }

  set selectedTags(tags: string[]) {
    this.$emit('selectedTags', tags);
  }

  private generateAlias() {
    this.Article.alias = this.articlesService.generateAliasForTitle(
      this.Article.title,
    );
    this.$forceUpdate();
  }

  private tagTextSelector(item: TagModel) {
    return item.name;
  }

  @Watch('$data.inputValidated')
  private validationchanged() {
    this.$emit('validation', this.$data.inputValidated);
  }

  private data() {
    return {
      inputValidated: false,
      required: (value: string) => !!value || 'Pole wymagane',
    };
  }
}
</script>