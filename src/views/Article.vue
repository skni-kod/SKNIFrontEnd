<template>
  <div>
    <v-layout>
      <v-flex xs12 sm10 md8 lg6 offset-sm1 offset-md2 offset-lg3>
        <single-article :article="article" :comments="comments" class="mx-1"></single-article>
      </v-flex>
    </v-layout>
    <v-speed-dial fixed right bottom direction="top" v-model="fab">
      <template v-slot:activator>
        <v-btn fab v-model="fab" class="text-body-1 font-weight-bold" color="primary">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </template>
      <v-btn fab color="orange" :to="'/article/edit/' + $route.params.id">
        <v-icon>mdi-pen</v-icon>
      </v-btn>
      <v-btn fab color="error" @click="dialog = true;">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
    <confirmation-dialog v-if="dialog" @yes="deleteArticle($route.params.id)" @no="dialog = false" :text="dialogText"></confirmation-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ArticlesService } from '@/services/ArticlesService';
import { CommentsService } from '@/services/CommentsService';
import { ArticleModel } from '@/models/ArticleModel';
import { CommentModel } from '@/models/CommentModel';

@Component
export default class Article extends Vue {
  private articlesService!: ArticlesService;
  private commentsService!: CommentsService;
  private article!: ArticleModel;
  private comments!: CommentModel[];

  private beforeCreate() {
    this.articlesService = new ArticlesService();
    this.commentsService = new CommentsService();
  }

  private mounted() {
    this.articlesService
      .getArticle(+this.$route.params.id)
      .then((article) => {
        this.article = article;
      })
      .catch(() => {
        this.$router.replace('/404');
      });

    this.commentsService
      .getCommentsForArticle(+this.$route.params.id)
      .then((comments) => {
        this.comments = comments;
      });
  }

  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
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
          this.$router.replace('/articles/1');
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

  private data() {
    return {
      article: this.article,
      comments: this.comments,
      fab: false,
      dialog: false,
    };
  }
}
</script>
