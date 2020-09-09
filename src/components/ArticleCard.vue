<template>
  <div>
    <v-card v-if="article != undefined">
      <v-img
        class="white--text"
        height="300px"
        :src="article.gallery ? (article.gallery[0] ? article.gallery[0].image : require('../assets/strona_bg.png')) : require('../assets/strona_bg.png')"
      >
        <v-row align="end" style="height: 100%" class="card-text ma-0">
          <v-col cols="12">
            <v-card-title
              class="text-h5 white--text darken-2 font-weight-bold justify-left pb-0 px-0"
            >{{ article.title }}</v-card-title>
            <v-card-text class="px-0">
              <p class="text-left mb-0">{{ text }}</p>
            </v-card-text>
            <v-card-actions class="pa-0">
              <v-spacer />
              <v-btn :to="'/article/'+ article.id + '-' + article.alias" color="primary">
                <v-icon left>mdi-page-next</v-icon>
                <span>Czytaj więcej...</span>
              </v-btn>
              <v-speed-dial direction="top" v-if="auth" v-model="fab" class="ml-2">
                <template v-slot:activator>
                  <v-btn
                    x-small
                    fab
                    v-model="fab"
                    class="text-body-1 font-weight-bold"
                    color="primary"
                  >
                    <v-icon>mdi-cog</v-icon>
                  </v-btn>
                </template>
                <v-btn fab x-small color="orange" :to="'/article/edit/' + article.id">
                  <v-icon>mdi-pen</v-icon>
                </v-btn>
                <v-btn fab x-small color="error" @click="dialog = true;">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-speed-dial>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-img>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-card-title class="text-h4 white--text primary px-4 py-3">Potwierdzenie</v-card-title>
        <v-divider />
        <v-card-text
          class="text-h6 px-4 pt-2 pb-0"
        >Czy na pewno chcesz usunąć artykuł {{ '\"' + article.title + '\"' }}?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" @click="dialog = false">Nie</v-btn>
          <v-btn color="success" @click="deleteArticle">Tak</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ArticleModel } from '@/models/ArticleModel';
import { CommentModel } from '@/models/CommentModel';

@Component
export default class ArticleCard extends Vue {
  @Prop() public article!: ArticleModel;
  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  private removeMarkdown(text: string) {
    const removeMd = require('remove-markdown');
    return removeMd(text);
  }

  get text(): string {
    return this.removeMarkdown(this.article.text);
  }

  private deleteArticle() {
    this.$data.dialog = false;
    this.$emit('delete', this.article.id);
  }

  private data() {
    return {
      fab: false,
      dialog: false,
    };
  }
}
</script>

<style scoped>
.card-text {
  background-image: linear-gradient(rgba(12, 12, 12, 0), rgba(12, 12, 12, 0.8));
  position: absolute;
  bottom: 0px;
  width: 100%;
}
</style>
