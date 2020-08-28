<template>
  <div>
    <article-editor
      :article="article"
      @articleEdited="article = $event"
      :tags="allTags"
      @tagListEdited="allTags = $event"
      :selTags="selectedTags"
      @selectedTags="selectedTags = $event"
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

    <v-dialog v-model="dialog" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">Potwierdzenie</v-card-title>
        <v-divider />
        <v-card-text
          class="px-4 pt-2 pb-0"
        >Czy na pewno chcesz wyjść z edycji artykułu bez zapisywania zmian?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" outlined @click="dialog = false">Nie</v-btn>
          <v-btn color="success" outlined @click="returnToArticle">Tak</v-btn>
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
export default class EditArticle extends Vue {
  private articlesService!: ArticlesService;
  private tagsService!: TagsService;
  private article!: ArticleModel;
  private allTags!: TagModel[];
  private selectedTags!: string[];
  private formattedCreationDate!: string;
  private formattedPublicationDate!: string;

  private beforeCreate() {
    this.articlesService = new ArticlesService();
    this.tagsService = new TagsService();
    this.article = new ArticleModel();
    this.formattedCreationDate = '';
    this.formattedPublicationDate = '';
  }

  private mounted() {
    if (this.$route.params.id !== undefined) {
      this.articlesService
        .getArticle(+this.$route.params.id, false)
        .then((article) => {
          this.article = article;
          this.selectedTags = this.article.tags.map((p) => p.tag.name);

          this.tagsService.getAllTags().then((tags) => {
            this.allTags = tags;
          });
        })
        .catch(() => {
          this.$router.replace('/404');
        });
    }
  }

  private editArticle() {
    this.articlesService.editArticle(
      this.article.id,
      this.article.title,
      this.article.alias,
      this.article.text,
      '/article/' + this.article.id + '-' + this.article.alias,
    );
  }

  private returnToArticle() {
    this.$router.replace(
      '/article/' + this.article.id + '-' + this.article.alias,
    );
  }

  private data() {
    return {
      article: { text: '' },
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
