<template>
  <div class="home-container">
    <hero-section />
    <div class="sections-container">
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
        <h2 class="section-title">
          Dołącz do naszego koła<br />i zaangażuj się!
        </h2>
        <p class="text">
          Jest wiele powodów aby dołączyć do SKNI KOD. Jednym z nich są sekcje!
          W każdej z nich realizowane są przeróżne projekty, które mogą Cię
          zainteresować. To Ty wybierasz do którego projektu chciałbyś dołączyć.
        </p>
        <p class="text">
          Dołącz już dziś - skontaktuj się z nami poprzez fanpage na facebooku
          lub przyjdź na spotkanie.
        </p>

        <link-button class="btn" :to="{ name: 'contact' }">Kontakt</link-button>
      </div>
    </div>

    <div class="equipment-container full-bleed">
      <img
        :src="require('@/assets/home-images/equipment.jpg')"
        alt="Drukarka 3D"
        class="equipment-image"
      />
      <div class="equipment-inner">
        <h2 class="section-title">Potrzebujesz sprzętu?</h2>
        <p class="text">
          Nasze koło posiada specjalistyczny sprzęt! Druki 3D czy rozwijanie
          gier na platformę VR to dla nas drobnostka. Dzieki temu, że posiadamy
          własny sprzęt możemy bez probelemy rozwijać nasze umiejęstności w tych
          dziedzinach.
        </p>
        <p class="text">
          Posiadamy także specjalistyczne lutownice, moduły arduino oraz
          raspberry, sprzęt retro, drukarka 3D, google VR.
        </p>

        <link-button class="btn" :to="{ name: 'contact' }">Kontakt</link-button>
      </div>
    </div>

    <div class="articles-container">
      <HomeArticle />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SectionsService } from '@/services/SectionsService';
import { SectionModel } from '@/models/SectionModel';
import { ArticleModel } from '@/models/ArticleModel';
import { ArticlesService } from '@/services/ArticlesService';
import LinkButton from '@/components/NewDesign/base/LinkButton.vue';

import homeArticleList from '@/components/HomeArticleList.vue';
import homeSectionList from '@/components/HomeSectionList.vue';
import Sponsors from '@/components/Sponsors.vue';
import Section from '@/components/NewDesign/Section.vue';
import HomeArticle from '@/components/NewDesign/HomeArticle.vue';
import HeroSection from '@/components/NewDesign/HeroSection.vue';
import HomeArticleList from '@/components/HomeArticleList.vue';

@Component({
  components: {
    homeArticleList,
    homeSectionList,
    Sponsors,
    Section,
    HeroSection,
    LinkButton,
    HomeArticle,
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
@use '@/styles/components/buttons';

.home-container {
  @include responsiveLayout();
  row-gap: 50px;
}

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
    align-items: start;
    flex-direction: column;

    .subtitle {
      color: $primary;
      font-size: 16px;
      text-transform: uppercase;
      margin-bottom: 25px;
    }

    .section-title {
      font-size: 38px;
      font-weight: 500;
      margin-bottom: 50px;
    }

    .text {
      font-size: 16px;
    }

    .btn {
      @include buttons.button-theme($primary, $body-bg);
      width: auto;
      margin-top: 50px;
    }
  }
}

.equipment-container {
  position: relative;
  height: 600px;
  margin: 50px 0;

  .equipment-image {
    width: 100%;
    position: absolute;
    height: 600px;
    object-fit: cover;
  }

  .equipment-inner {
    max-width: 600px;
    margin: auto;
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    height: 100%;

    .section-title {
      font-size: 48px;
      font-size: 700;
      margin-bottom: 35px;
    }

    .text {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 30px;
    }

    .section-title,
    .text {
      color: #fff;
    }

    .btn {
      @include buttons.button-theme($primary, $body-bg);
      background-color: #fff;
      color: $primary;
      border-color: #fff;
      margin-top: 30px;

      &:hover {
        border-color: #fff;
        color: #fff;
      }
    }
  }
}
</style>
