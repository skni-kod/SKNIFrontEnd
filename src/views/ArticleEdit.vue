<template>
  <div>
    <p
      class="text-h4 text-center font-weight-bold justify-center ma-2"
      style="word-break: break-word;"
    >Edycja artykułu nr {{ this.$route.params.id }}</p>
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
    <editor-menu @saveChanges="editArticle" @discardChanges="returnToArticle" text = "Czy na pewno chcesz wyjść z edycji artykułu bez zapisywania zmian?" />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ArticlesService } from '@/services/ArticlesService';
import { TagsService } from '@/services/TagsService';
import { ArticleModel } from '@/models/ArticleModel';

@Component
export default class ArticleEdit extends Vue {
  private articlesService!: ArticlesService;
  private tagsService!: TagsService;

  private created() {
    this.articlesService = new ArticlesService();
    this.tagsService = new TagsService();
    this.$data.article = new ArticleModel();

    if (this.$route.params.id !== undefined) {
      this.articlesService
        .getArticle(+this.$route.params.id, false)
        .then((article) => {
          this.$data.article = article;
          this.$data.selectedTags = this.$data.article.tags.map(
            (p: any) => p.id,
          );
          this.tagsService.getAllTags().then((tags) => {
            this.$data.allTags = tags;
          });
          article.authors.forEach((element: any) => {
            this.$data.authors.push(element.user.id);
          });
        })
        .catch((err) => {
          this.$router.replace('/404');
        });
    }
  }

  private editArticle() {
    if (this.$data.inputValidated) {
      this.articlesService
        .editArticle(this.$data.article.id, {
          title: this.$data.article.title,
          alias: this.$data.article.alias,
          authors: this.$data.authors,
          text: this.$data.article.text,
          tags: this.$data.selectedTags,
        })
        .then((res: any) => {
          if (res.status === 200) {
            this.$store.dispatch('setSnackbarState', {
              state: true,
              msg: 'Artykuł został zaktualizowany',
              color: 'success',
              timeout: 7500,
            });
            this.returnToArticle();
          } else {
            this.$store.dispatch('setSnackbarState', {
              state: true,
              msg: 'Błąd poczas edycji artykułu!',
              color: 'error',
              timeout: 7500,
            });
          }
        })
        .catch(() => {
          this.$store.dispatch('setSnackbarState', {
            state: true,
            msg: 'Błąd poczas edycji artykułu!',
            color: 'error',
            timeout: 7500,
          });
        });
    } else {
      this.$store.dispatch('setSnackbarState', {
        state: true,
        msg: 'Formularz nie został poprawnie wypełniony!',
        color: 'warning',
        timeout: 7500,
      });
    }
  }

  private returnToArticle() {
    this.$router.replace(
      '/article/' + this.$data.article.id + '-' + this.$data.article.alias,
    );
  }

  private data() {
    return {
      inputValidated: false,
      article: { text: '' },
      authors: [],
      allTags: [],
      selectedTags: [],
      dialog: false,
      fab: false,
    };
  }
}
</script>
