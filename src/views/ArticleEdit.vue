<template>
  <div>
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

    <v-speed-dial fixed right bottom direction="top" v-model="fab">
      <template v-slot:activator>
        <v-btn
          large
          v-model="fab"
          class="text-body-1 font-weight-bold"
          color="primary"
          style="z-index: 3;"
        >
          <v-icon large v-if="fab" left>mdi-close</v-icon>
          <v-icon large v-else left>mdi-dots-vertical</v-icon>
          <span>Menu</span>
        </v-btn>
      </template>
      <v-container class="ma-0 pa-0">
        <v-row justify="end">
          <v-btn
            color="blue white--text"
            class="mr-3"
            @click="$vuetify.goTo(0, { duration: 1000 })"
          >
            <v-icon left>mdi-arrow-collapse-up</v-icon>
            <span>Przejdź na górę</span>
          </v-btn>
        </v-row>
        <v-row justify="end">
          <v-btn
            color="blue white--text"
            class="mr-3"
            @click="$vuetify.goTo('footer', { duration: 1000 })"
          >
            <v-icon left>mdi-arrow-collapse-down</v-icon>
            <span>Przejdź na dół</span>
          </v-btn>
        </v-row>
        <v-row justify="end">
          <v-btn color="success" class="mr-3" @click="editArticle">
            <v-icon left>mdi-pencil</v-icon>
            <span>Zatwierdź zmiany</span>
          </v-btn>
        </v-row>
        <v-row justify="end">
          <v-btn color="error" class="mr-3" @click="dialog = true">
            <v-icon left>mdi-pencil-off</v-icon>
            <span>Odrzuć zmiany</span>
          </v-btn>
        </v-row>
      </v-container>
    </v-speed-dial>

    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-card-title class="text-h4 white--text primary px-4 py-3">Potwierdzenie</v-card-title>
        <v-divider />
        <v-card-text
          class="text-h6 px-4 pt-2 pb-0"
        >Czy na pewno chcesz wyjść z edycji artykułu bez zapisywania zmian?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" @click="dialog = false">Nie</v-btn>
          <v-btn color="success" @click="returnToArticle">Tak</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ArticlesService } from '@/services/ArticlesService';
import { TagsService } from '@/services/TagsService';
import { ArticleModel } from '@/models/ArticleModel';
import { TagModel } from '@/models/TagModel';

@Component
export default class ArticleEdit extends Vue {
  private articlesService!: ArticlesService;
  private tagsService!: TagsService;
  private allTags!: TagModel[];
  private selectedTags!: string[];
  private formattedCreationDate!: string;
  private formattedPublicationDate!: string;

  private created() {
    this.articlesService = new ArticlesService();
    this.tagsService = new TagsService();
    this.$data.article = new ArticleModel();
    this.formattedCreationDate = '';
    this.formattedPublicationDate = '';

    if (this.$route.params.id !== undefined) {
      this.articlesService
        .getArticle(+this.$route.params.id, false)
        .then((article) => {
          this.$data.article = article;
          this.selectedTags = this.$data.article.tags.map((p) => p.name);
          this.tagsService.getAllTags().then((tags) => {
            this.allTags = tags;
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
      const tags = this.$data.allTags
        .filter((tag: TagModel) => {
          return this.$data.selectedTags.includes(tag.name);
        })
        .map((el: TagModel) => el.id);
      this.articlesService
        .editArticle(this.$data.article.id, {
          title: this.$data.article.title,
          alias: this.$data.article.alias,
          text: this.$data.article.text,
          tags,
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
        msg: 'Formularz nie zostal poprawnie wypełniony!',
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
      allTags: this.allTags,
      selectedTags: this.selectedTags,
      formattedPublicationDate: this.formattedPublicationDate,
      formattedCreationDate: this.formattedCreationDate,
      dialog: false,
      fab: false,
    };
  }
}
</script>
