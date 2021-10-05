<template>
  <div class="home-container">
    <hero-section />
    <Section />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SectionsService } from '@/services/SectionsService';
import { SectionModel } from '@/models/SectionModel';
import { ArticleModel } from '@/models/ArticleModel';
import { ArticlesService } from '@/services/ArticlesService';

import homeArticleList from '@/components/HomeArticleList.vue';
import homeSectionList from '@/components/HomeSectionList.vue';
import Sponsors from '@/components/Sponsors.vue';
import Section from '@/components/NewDesign/Section.vue';
import HeroSection from '@/components/NewDesign/HeroSection.vue';

@Component({
  components: {
    homeArticleList,
    homeSectionList,
    Sponsors,
    Section,
    HeroSection,
  },
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

<style lang="scss" scoped>
@use '@/styles/helpers' as *;

.home-container {
  @include responsiveLayout();
  row-gap: 50px;
}
</style>
