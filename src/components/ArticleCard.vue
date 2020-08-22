<template>
  <div v-if="article != undefined">
    <v-card>
      <v-img
        class="white--text"
        height="300px"
        :src="article.gallery ? (article.gallery[0] ? article.gallery[0].image : require('../assets/strona_bg.png')) : require('../assets/strona_bg.png')"
      >
        <div class="card-text pt-12 pb-2 px-2">
          <v-card-title
            class="text-h5 white--text darken-2 font-weight-bold justify-left pb-0 px-0"
          >{{ article.title }}</v-card-title>
          <v-card-text class="px-0">
            <p class="text-left mb-0">{{ article.text }}</p>
          </v-card-text>
          <v-card-actions class="pa-0">
            <v-btn fab x-small color="orange" :to="'/editarticle/' + article.id" v-if="auth">
              <v-icon>mdi-pen</v-icon>
            </v-btn>
            <v-spacer />
            <v-btn
              :to="'/article/'+ article.id + '-' + article.alias"
              color="primary"
            >Czytaj więcej...</v-btn>
          </v-card-actions>
        </div>
      </v-img>
    </v-card>
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
