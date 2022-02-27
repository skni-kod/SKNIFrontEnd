<template>
  <div class="home-container">
    <hero-section />

    <div class="sections-container" id="sections">
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
        <SectionHeader
          title="Dołącz do naszego koła
          <br />i zaangażuj się!"
          subtitle="Sekcje w SKNI KOD"
        ></SectionHeader>
        <p class="text">
          Jest wiele powodów aby dołączyć do SKNI KOD. Jednym z nich są sekcje!
          W każdej z nich realizowane są przeróżne projekty, które mogą Cię
          zainteresować. To Ty wybierasz do którego projektu chciałbyś dołączyć.
        </p>
        <p class="text">
          Dołącz już dziś - skontaktuj się z nami poprzez fanpage na facebooku
          lub przyjdź na spotkanie.
        </p>

        <link-button class="btn" :to="{ name: 'about' }"
          >Zobacz więcej</link-button
        >
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

        <link-button class="btn" :to="{ name: 'about' }"
          >Zobacz więcej</link-button
        >
      </div>
    </div>

    <div class="articles-container">
      <SectionHeader
        title="Najnowsze artykuły"
        subtitle="Co słychać w SKNI KOD?"
      ></SectionHeader>

      <div class="articles-inner">
        <ArticleCard v-for="article in articles.results" :article="article" :key="article.id" />
      </div>
    </div>

    <projects-grid
      :projects="featuredProjects"
      :projectsCount="projectsCount"
    />

    <div class="sponsors-container">
      <SectionHeader
        title="Wspierają nas"
        subtitle="Nasi partnerzy"
      ></SectionHeader>
      <div class="sponsors-inner">
       <!-- TODO: Fetch sponsors from API -->
        <Sponsors />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SectionsService } from '@/services/SectionsService';
import { SectionModel } from '@/models/SectionModel';
import { ArticleModel } from '@/models/ArticleModel';
import { ArticlesService } from '@/services/ArticlesService';
import LinkButton from '@/components/base/LinkButton.vue';
import { mapActions, mapGetters } from 'vuex';

import homeArticleList from '@/components/HomeArticleList.vue';
import homeSectionList from '@/components/HomeSectionList.vue';
import Sponsors from '@/components/Sponsors.vue';
import Section from '@/components/Section.vue';
import ArticleCard from '@/components/ArticleCard.vue';
import Sponsor from '@/components/Sponsor.vue';
import HeroSection from '@/components/HeroSection.vue';
import ProjectsGrid from '@/components/projects/ProjectsGrid.vue';
import SectionHeader from '../components/SectionHeader.vue';

@Component({
  components: {
    homeArticleList,
    homeSectionList,
    Sponsors,
    Section,
    HeroSection,
    LinkButton,
    ArticleCard,
    ProjectsGrid,
    Sponsor,
    SectionHeader,
  },

  computed: {
    ...mapGetters(['articles', 'projects']),
  },
})
export default class Home extends Vue {
  private sectionsService!: SectionsService;
  private articleService!: ArticlesService;
  private sections!: SectionModel[];
  // private articles!: ArticleModel[];

  get featuredProjects() {
    return this.$store.getters.featuredProjects;
  }

  get projectsCount() {
    return this.$store.getters.projectsCount;
  }

  constructor() {
    super();
    this.sectionsService = new SectionsService();
    this.articleService = new ArticlesService();
    this.sections = [];
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
  }

  public created() {
    this.$store.dispatch('getArticles');
    this.$store.dispatch('getProjects');
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/helpers' as *;
@use '@/styles/components/buttons';

.home-container {
  @include responsiveLayout();
  row-gap: 50px;
  width: 100%;
  margin-top: -150px;
}

.sections-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  width: 100%;
  padding: 50px 0;

  .section-header {
    margin-bottom: 50px;
  }
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
    align-items: flex-start;
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

  @media only screen and (max-width: 1499px) {
    grid-template-columns: 1fr;

    .join-us {
      grid-row-start: 1;
    }
  }

  @media only screen and (max-width: 768px) {
    .sections-grid {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      .section-game-dev {
        grid-row: 1/2;
        grid-column: 1/2;
        margin: auto;
      }
      .section-apps {
        grid-row: 2/3;
        margin: auto;
        grid-column: 1/2;
      }
      .section-retro {
        grid-row: 3/4;
        grid-column: 1/2;
        margin: auto;
      }
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
    width: 80%;
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

  @media only screen and (max-width: 768px) {
    position: relative;
    height: 675px;
    margin: 50px 0;

    .equipment-image {
      width: 100%;
      position: absolute;
      height: 675px;
      object-fit: cover;
    }
  }
}

.articles-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 50px;

  .section-header {
    margin-bottom: 75px;
    text-align: center;
  }
  .articles-inner {
    display: flex;
    justify-content: space-between;
  }

  @media only screen and (max-width: 1199px) {
    .articles-inner {
      flex-direction: column;
      align-items: center;
      .card {
        margin-bottom: 25px;
        max-width: 400px;
      }
    }
  }
}

.sponsors-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  .section-header {
    margin-bottom: 50px;
    text-align: center;
  }
  .sponsors-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media only screen and (max-width: 768px) {
    .sponsors-inner {
      flex-direction: column;
    }
    .sponsor {
      padding: 25px;
    }
  }
}
</style>
