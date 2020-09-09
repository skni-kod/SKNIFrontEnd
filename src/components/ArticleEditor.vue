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
        <v-autocomplete
          v-model="selectedTags"
          :items="allTags"
          clearable
          chips
          hide-selected
          label="Wyszukaj i wybierz tagi artykułu"
          item-text="name"
          item-value="id"
          multiple
        >
          <template v-slot:selection="data">
            <v-chip small close @click:close="remove(data.item.id)">{{ data.item.name }}</v-chip>
          </template>
          <template v-slot:item="data">
            <v-list-item-content>
              <v-list-item-title>{{ data.item.name }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <template v-slot:no-data>
            <v-alert type="info" class="ma-0">Brak wyników!</v-alert>
          </template>
        </v-autocomplete>
        <user-selector v-model="artAuthors" rules="true" label="Wyszukaj i wybierz autorów"></user-selector>
        <markdown-editor v-model="Article.text" rules="true" label="Treść artykułu"></markdown-editor>
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
  @Prop() public readonly authors!: number[];
  @Prop() public readonly tags!: TagModel;
  @Prop() public readonly selTags!: number[];

  private articlesService!: ArticlesService;

  private created() {
    this.articlesService = new ArticlesService();
  }

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

  get artAuthors() {
    return this.authors;
  }

  set artAuthors(data: number[]) {
    this.$emit('authorsEdited', data);
  }

  get selectedTags() {
    return this.selTags;
  }

  set selectedTags(tags: number[]) {
    this.$emit('selectedTags', tags);
  }

  private generateAlias() {
    this.Article.alias = this.articlesService.generateAliasForTitle(
      this.Article.title,
    );
    this.$forceUpdate();
  }

  @Watch('$data.inputValidated')
  private validationchanged() {
    this.$emit('validation', this.$data.inputValidated);
  }

  private remove(item: any) {
    const index = this.selectedTags.indexOf(item);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  private data() {
    return {
      inputValidated: false,
      required: (value: string) => !!value || 'Pole wymagane',
    };
  }
}
</script>