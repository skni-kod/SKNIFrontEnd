<template>
  <v-row justify="center">
    <v-col cols="12" lg="8" xl="6">
      <v-img
        v-if="$vuetify.breakpoint.mdAndUp"
        :src="require('../assets/strona_bg.png')"
        :asspect-ratio="3.55"
      >
        <v-row>
          <v-col>
            <v-img
              :src="require('../assets/logo_color.png')"
              :width="'30%'"
              style="margin-left: 10vw; margin-top: 5vh"
            ></v-img>
          </v-col>
        </v-row>
      </v-img>
      <v-img
        v-else
        class="background"
        :src="require('../assets/logo_color.png')"
      ></v-img>
      <home-section-list :sections="sections"></home-section-list>
      <home-article-list :articles="articles"></home-article-list>
      <sponsors></sponsors>
    </v-col>
  </v-row>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { SectionsService } from '@/services/SectionsService';
import { SectionModel } from '@/models/SectionModel';
import { ArticleModel } from '@/models/ArticleModel';
import { ArticlesService } from '@/services/ArticlesService';

import homeArticleList from '@/components/HomeArticleList.vue';
import homeSectionList from '@/components/HomeSectionList.vue';
import Sponsors from '@/components/Sponsors.vue';

@Component({
  components: { homeArticleList, homeSectionList, Sponsors },
})
export default class Home extends Vue {
  private sectionsService!: SectionsService;
  private articleService!: ArticlesService;
  private sections!: SectionModel[];
  private articles!: ArticleModel[];
  constructor() {
    super();
    this.sectionsService = new SectionsService();
    this.articleService = new ArticlesService();
    this.sections = [];
    this.articles = [];
  }
  public mounted() {
    this.sectionsService.getAllSections().then((res) => {
      this.sections = res.data;
      for (let i = 0; i < this.sections.length; ) {
        if (this.sections[i].isVisible === false) {
          this.sections.splice(i, 1);
        } else {
          i++;
        }
      }
    });

    this.articleService.getArticles(0, 3, false).then((a) => {
      this.articles = a.results;
    });
  }
}
</script>

<style scoped>
.background {
  background: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0) 70%,
      rgba(255, 255, 255, 1) 100%
    ),
    url('../assets/bg.png') repeat;
  background-position: center top;
}
</style>
