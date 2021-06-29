<template>
  <div class="mt-2">
    <v-row justify="center" v-if="article != undefined" class="mx-1">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-card>
          <v-card-title
            class="text-h4 primary--text font-weight-bold justify-center"
            style="word-break: break-word"
            >{{ article.title }}</v-card-title
          >
          <v-divider />
          <v-card-subtitle class="grey lighten-3">
            <v-row class="text-subtitle-1 mx-auto">
              <v-icon left color="primary">mdi-calendar-today</v-icon>
              <p class="my-auto">
                {{ article.creation_date | moment('DD-MM-YYYY') }}
              </p>
              <v-spacer />
              <v-icon left color="primary">mdi-account</v-icon>
              <p class="my-auto">{{ article.creator.username }}</p>
              <v-spacer v-if="article.tags.length > 0" />
              <div v-if="article.tags.length > 0">
                <v-icon left color="primary">mdi-note</v-icon>
                <v-hover
                  v-slot:default="{ hover }"
                  v-for="tag in article.tags"
                  :key="tag.name"
                >
                  <v-chip
                    small
                    label
                    class="mx-1"
                    :color="hover ? 'primary' : 'grey'"
                  >
                    <a
                      :href="'/#/tag/' + tag.name"
                      class="white--text text-decoration-none"
                      >{{ '#' + tag.name }}</a
                    >
                  </v-chip>
                </v-hover>
              </div>
            </v-row>
            <v-divider v-if="article.authors.length" class="mt-5"></v-divider>
            <v-row
              v-if="article.authors.length"
              align="center"
              justify="start"
              class="text-subtitle-1 mx-auto mt-2"
            >
              <v-col cols="auto" class="pa-0">
                <p class="my-auto">
                  {{ article.authors.length === 1 ? 'Autor:' : 'Autorzy:' }}
                </p>
              </v-col>
              <v-col class="py-0 pr-0">
                <v-row align="center" justify="center">
                  <div
                    v-for="(author, i) in article.authors"
                    :key="i"
                    class="mx-2"
                  >
                    <v-icon left color="primary">mdi-account</v-icon>
                    <v-hover v-slot:default="{ hover }">
                      <v-chip
                        small
                        label
                        class="white--text"
                        :color="hover ? 'primary' : 'grey'"
                      >
                        <a
                          :href="'/#/user/profile/' + author.id"
                          class="white--text text-decoration-none"
                          >{{ author.username }}</a
                        >
                      </v-chip>
                    </v-hover>
                  </div>
                </v-row>
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-divider />
          <v-card-text>
            <markdown-it-vue
              class="md-body text-left"
              :content="article.text"
              :options="markdownOptions"
            />
          </v-card-text>
        </v-card>
        <gallery breakpoints="xs6" :imgs="article.gallery" />
        <comments-list :comments="comments" />
      </v-col>
    </v-row>
    <v-speed-dial fixed right bottom direction="top" v-model="fab" v-if="role">
      <template v-slot:activator>
        <v-btn-cap
          fab
          v-model="fab"
          class="text-body-1 font-weight-bold"
          color="primary"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn-cap>
      </template>
      <v-btn-cap
        fab
        color="orange"
        :to="{ name: 'editArticle', params: { id: article.id } }"
      >
        <v-icon>mdi-pen</v-icon>
      </v-btn-cap>
      <v-btn-cap fab color="error" @click="dialog = true">
        <v-icon>mdi-delete</v-icon>
      </v-btn-cap>
    </v-speed-dial>
    <confirmation-dialog
      v-if="dialog"
      @yes="deleteArticle($route.params.id)"
      @no="dialog = false"
      :text="dialogText"
    ></confirmation-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ArticlesService } from '@/services/ArticlesService';
import { ArticleModel } from '@/models/ArticleModel';

@Component
export default class Article extends Vue {
  private articlesService!: ArticlesService;
  private article!: ArticleModel;

  private beforeCreate() {
    this.articlesService = new ArticlesService();
  }

  private mounted() {
    this.articlesService
      .getArticle(+this.$route.params.id)
      .then((article) => {
        this.article = article;
      })
      .catch(() => {
        this.$router.replace({ name: 'error404' });
      });

    this.$store.dispatch('getComments', this.$route.params.id);
  }

  private beforeDestroy() {
    this.$store.dispatch('purgeModule');
  }

  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  get role(): boolean {
    return this.$store.getters.isAdministrator;
  }

  get dialogText() {
    return 'Czy na pewno chcesz usunąć artykuł "' + this.article.title + '"?';
  }

  private deleteArticle(id: number) {
    this.articlesService
      .deleteArticle(id)
      .then((res) => {
        if (res.status === 204) {
          this.$store.dispatch('setSnackbarState', {
            state: true,
            msg: 'Artykuł został usunięty',
            color: 'success',
            timeout: 7500,
          });
          this.$router.replace({ name: 'articles', params: { page: '1' } });
        } else {
          this.$store.dispatch('setSnackbarState', {
            state: true,
            msg: 'Błąd poczas usuwania artykułu!',
            color: 'error',
            timeout: 7500,
          });
        }
      })
      .catch(() => {
        this.$store.dispatch('setSnackbarState', {
          state: true,
          msg: 'Błąd poczas usuwania artykułu!',
          color: 'error',
          timeout: 7500,
        });
      });
  }

  get comments() {
    return this.$store.getters.comments;
  }

  private data() {
    return {
      article: this.article,
      fab: false,
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
}
</script>
