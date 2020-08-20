<template>
  <div>
    <v-card outlined class="ma-2">
      <v-card-title
        class="text-h3 font-weight-bold justify-center"
        style="word-break: break-word;"
      >Edycja artykułu nr {{ this.$route.params.id }}</v-card-title>
      <v-divider />
      <v-card-text>
        <v-layout wrap justify-space-between>
          <v-flex xs12 sm6>
            <p
              class="text-center"
            >Data utworzenia: {{ article.creation_date | moment("DD-MM-YYYY hh:mm:ss") }}</p>
          </v-flex>
          <v-flex xs12 sm6>
            <p
              class="text-center"
            >Data publikacji: {{ article.publication_date | moment("DD-MM-YYYY hh:mm:ss") }}</p>
          </v-flex>
        </v-layout>
        <v-divider />
        <v-text-field clearable label="Tytuł artykułu" v-model="article.title"></v-text-field>
        <v-row align="center">
          <v-col class="py-0">
            <v-text-field clearable label="Alias" v-model="article.alias"></v-text-field>
          </v-col>
          <v-col class="py-0" cols="auto">
            <v-btn color="primary" @click="generateAlias()">Wygeneruj alias</v-btn>
          </v-col>
        </v-row>
        <v-select
          v-model="selectedTags"
          :items="allTags"
          :item-text="tagTextSelector"
          attach
          chips
          label="Tagi artykułu"
          multiple
          clearable
        ></v-select>
        <v-divider class="mb-3" />
        <v-alert dismissible type="info">Tagi html są aktywne jedynie w widoku pojedynczego atykułu!</v-alert>
        <v-layout wrap justify-space-between>
          <v-flex xs12 md6 class="text-xs-left pa-1">
            <v-textarea auto-grow v-model="article.text" outlined hide-details label="Tekst"></v-textarea>
          </v-flex>
          <v-flex xs12 md6 class="text-xs-left pa-1">
            <v-card outlined>
              <v-card-title
                class="primary text-h4 white--text font-weight-bold justify-center py-0"
              >PODGLĄD</v-card-title>
              <markdown-it-vue
                class="md-body text-left mx-2"
                :content="article.text"
                :options="markdownOptions"
              />
            </v-card>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-row>
          <v-col class="py-1">
            <v-btn block color="success" @click="editArticle">
              <v-icon left>mdi-pencil</v-icon>
              <span>Zatwierdź zmiany</span>
            </v-btn>
          </v-col>
          <v-col class="py-1">
            <v-btn block color="error" @click="dialog = true">
              <v-icon left>mdi-pencil-off</v-icon>
              <span>Odrzuć zmiany</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">Potwierdzenie</v-card-title>
        <v-divider />
        <v-card-text class="px-4 pt-2 pb-0">Czy na pewno chcesz wyjść z edycji artykułu bez zapisywania zmian?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" outlined @click="dialog = false">Nie</v-btn>
          <v-btn color="success" outlined @click="returnArticle">Tak</v-btn>
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
        });
    }
  }

  private generateAlias() {
    this.article.alias = this.articlesService.generateAliasForTitle(
      this.article.title,
    );
    this.$forceUpdate();
  }

  private editArticle() {
    if (
      this.articlesService.editArticle(
        this.article.id,
        this.article.title,
        this.article.alias,
        this.article.text,
      )
    ) {
      this.$store.dispatch('setSnackbarState', {
        state: true,
        msg: 'Artykuł został zaktualizowany',
        color: 'success',
        timeout: 7500,
      });
      this.returnArticle();
    } else {
      this.$store.dispatch('setSnackbarState', {
        state: true,
        msg: 'Błąd poczas edycji artykułu!',
        color: 'error',
        timeout: 7500,
      });
    }
  }

  private returnArticle() {
    this.$router.replace('/article/' + this.article.id + '-' + this.article.alias);
  }

  private data() {
    return {
      article: { text: '' },
      allTags: this.allTags,
      selectedTags: this.selectedTags,
      formattedPublicationDate: this.formattedPublicationDate,
      formattedCreationDate: this.formattedCreationDate,
      dialog: false,
      markdownOptions: {
        markdownIt: {
          html: true,
          linkify: true,
        },
        githubToc: {
          anchorLink: false,
        },
      },
    };
  }

  private tagTextSelector(item: TagModel) {
    return item.name;
  }
}
</script>
