<template>
  <v-card outlined class="ma-2">
    <v-card-text>
      <v-row
        no-gutters
        justify="space-around"
        v-if="Article.creation_date && Article.publication_date"
      >
        <v-col cols="12" sm="auto">
          Data utworzenia:
          {{ Article.creation_date | moment('DD.MM.YYYY hh:mm:ss') }}
        </v-col>
        <v-col cols="12" sm="auto">
          Data publikacji:
          {{ Article.publication_date | moment('DD.MM.YYYY hh:mm:ss') }}
        </v-col>
      </v-row>
      <v-form v-model="inputValidated">
        <v-text-field
          clearable
          label="Tytuł artykułu"
          v-model="Article.title"
          :rules="[required]"
        ></v-text-field>
        <v-row align="center">
          <v-col class="py-0">
            <v-text-field
              clearable
              label="Alias"
              v-model="Article.alias"
              :rules="[required]"
            ></v-text-field>
          </v-col>
          <v-col class="py-0" cols="auto">
            <v-btn-cap color="primary" @click="generateAlias()"
              >Wygeneruj alias</v-btn-cap
            >
          </v-col>
        </v-row>
        <element-selector
          v-model="selectedTags"
          :items="allTags"
          itemtext="name"
          label="Wyszukaj i wybierz tagi artykułu"
        ></element-selector>
        <element-selector
          v-model="artAuthors"
          :items="users"
          itemtext="fullname"
          rules="true"
          label="Wyszukaj i wybierz autorów"
          class="mt-4"
        ></element-selector>
        <markdown-editor
          v-model="Article.text"
          rules="true"
          label="Treść artykułu"
        ></markdown-editor>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <gallery-editor v-model="Article.gallery"></gallery-editor>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { ArticlesService } from '@/services/ArticlesService';
import { ArticleModel } from '@/models/ArticleModel';
import { TagModel } from '@/models/TagModel';
import beAxios from '@/axios';

@Component
export default class ArticleEditor extends Vue {
  @Prop() public readonly article!: ArticleModel;
  @Prop() public readonly authors!: number[];
  @Prop() public readonly tags!: TagModel;
  @Prop() public readonly selTags!: number[];

  private articlesService!: ArticlesService;

  private created() {
    this.articlesService = new ArticlesService();
    this.getAllusers();
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

  private getAllusers() {
    beAxios
      .get('api/users/', {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.token,
        },
      })
      .then((res) => {
        this.$data.users = res.data;
        this.$data.users.forEach((element: any) => {
          element.fullname =
            element.first_name +
            ' "' +
            element.username +
            '" ' +
            element.last_name;
        });
      });
  }

  @Watch('$data.inputValidated')
  private validationchanged() {
    this.$emit('validation', this.$data.inputValidated);
  }

  private data() {
    return {
      inputValidated: false,
      users: [],
      required: (value: string) => !!value || 'Pole wymagane',
    };
  }
}
</script>