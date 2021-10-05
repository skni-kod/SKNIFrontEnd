<template>
  <div class="sections-container" style="width:1420px;margin:auto;">
    <div class="sections-grid">
      <Section
        class="section-game-dev"
        title="Sekcja Game-Dev"
        text="Sekcja zajmująca się tworzeniem gier komputerowych, głównie opartych o silnik Unity. Dodatkowo w pracy wykorzystuję technologię wirtualnej rzeczywistości. "
        icon="game"
        link="/section/2"
      />
      <Section
        class="section-apps"
        title="Sekcja Aplikacji Desktopowych Mobilnych i Webowych "
        text="Sekcja zajmująca się budową aplikacji na różnego rodzaju urządzenia, wykorzystując szeroką gamę technologii."
        icon="monitor"
        link="/section/1"
      />
      <Section
        class="section-retro"
        title="Sekcja Elektroniki i Retro "
        text="Sekcja zajmująca się odrestaurowywaniem starego sprzętu, łączenie przeszłości z teraźniejszością oraz prowadzeniem działalności edukacyjnej. Dodatkowo realizowane są tutaj różne projekty elektroniczne."
        icon="cpu"
        link="/section/3"
      />
    </div>
    <div class="join-us">
      <h5 class="subtitle">Sekcje w SKNI KOD</h5>
      <h2 class="title">Dołącz do naszego koła i zaangażuj się!</h2>
      <p class="text">
        Jest wiele powodów aby dołączyć do SKNI KOD. Jednym z nich są sekcje! W
        każdej z nich realizowane są przeróżne projekty, które mogą Cię
        zainteresować. To Ty wybierasz do którego projektu chciałbyś dołączyć.
      </p>
      <p class="text">
        Dołącz już dziś - skontaktuj się z nami poprzez fanpage na facebooku lub
        przyjdź na spotkanie.
      </p>
    </div>
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

@Component({
  components: { homeArticleList, homeSectionList, Sponsors, Section },
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
.sections-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  width: 100%;
  padding: 50px 0;
  .sections-grid {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 50px;

    .section-game-dev {
      grid-row-start: 2;
      grid-row-end: 4;
    }
    .section-apps {
      grid-column-start: 2;
      grid-row-start: 1;
      grid-row-end: 3;
    }
    .section-retro {
      grid-column-start: 2;
      grid-row-start: 3;
      grid-row-end: 5;
    }
  }

  .join-us {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
