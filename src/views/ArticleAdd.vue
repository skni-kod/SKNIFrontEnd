<template>
  <div>
    <p
      class="text-h4 text-center font-weight-bold justify-center ma-2"
      style="word-break: break-word"
    >
      Nowy artykuł
    </p>
    <article-editor
      :article="article"
      @articleEdited="article = $event"
      :authors="authors"
      @authorsEdited="authors = $event"
      :tags="allTags"
      @tagListEdited="allTags = $event"
      :selTags="selectedTags"
      @selectedTags="selectedTags = $event"
      @validation="inputValidated = $event"
    ></article-editor>
    <editor-menu
      @saveChanges="addArticle"
      @discardChanges="returnToArticles"
      text="Czy na pewno chcesz opuścić ekran tworzenia nowego artykułu bez zapisywania zmian?"
      saveText="Dodaj artykuł"
      discardText="Odrzuć artykuł"
    />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ArticlesService } from '@/services/ArticlesService';
import { TagsService } from '@/services/TagsService';
import { ArticleModel } from '@/models/ArticleModel';

@Component
export default class ArticleAdd extends Vue {
  private articlesService!: ArticlesService;
  private tagsService!: TagsService;

  private created() {
    this.articlesService = new ArticlesService();
    this.tagsService = new TagsService();
    this.$data.article = new ArticleModel();

    this.tagsService.getAllTags().then((tags) => {
      this.$data.allTags = tags;
    });
  }

  private addArticle() {
    if (this.$data.inputValidated) {
      this.articlesService
        .addArticle(this.$data.article.id, {
          title: this.$data.article.title,
          alias: this.$data.article.alias,
          authors: this.$data.authors,
          text: this.$data.article.text,
          tags: this.$data.selectedTags,
          creator: this.$store.getters.user.id,
          creation_date: new Date(),
          publication_date: new Date(),
        })
        .then((res: any) => {
          if (res.status === 201) {
            this.$store.dispatch('setSnackbarState', {
              state: true,
              msg: 'Artykuł został dodany',
              color: 'success',
              timeout: 7500,
            });
            this.$router.replace(
              '/article/' + res.data.id + '-' + res.data.alias,
            );
          } else {
            this.$store.dispatch('setSnackbarState', {
              state: true,
              msg: 'Błąd poczas zapisywania artykułu!',
              color: 'error',
              timeout: 7500,
            });
          }
        })
        .catch(() => {
          this.$store.dispatch('setSnackbarState', {
            state: true,
            msg: 'Błąd poczas zapisywania artykułu!',
            color: 'error',
            timeout: 7500,
          });
        });
    } else {
      this.$store.dispatch('setSnackbarState', {
        state: true,
        msg: 'Formularz nie zostal poprawnie wypełniony!',
        color: 'warning',
        timeout: 7500,
      });
    }
  }

  private returnToArticles() {
    this.$router.replace('/articles');
  }

  private data() {
    return {
      inputValidated: false,
      article: { text: '' },
      authors: [],
      allTags: [],
      selectedTags: [],
    };
  }
}
</script>
