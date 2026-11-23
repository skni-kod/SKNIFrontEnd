<template>
  <div class="home">
    <HeroSection :projects-count="projectsCount" />

    <section id="sections" class="section">
      <div class="container">
        <div class="intro">
          <div class="intro__text">
            <span class="eyebrow">Sekcje w SKNI KOD</span>
            <h2 class="section-title">Dołącz do naszego koła i zaangażuj się!</h2>
            <p class="lead">
              Jest wiele powodów, aby dołączyć do SKNI KOD. Jednym z nich są sekcje: w każdej realizowane są przeróżne
              projekty, a to Ty wybierasz, do którego chcesz dołączyć.
            </p>
            <p class="muted">
              Dołącz już dziś: skontaktuj się z nami przez fanpage na Facebooku lub przyjdź na spotkanie.
            </p>
            <router-link :to="{ name: 'about' }" class="btn btn--secondary">
              Więcej o kole <i class="mdi mdi-arrow-right" aria-hidden="true"></i>
            </router-link>
          </div>
          <div class="features">
            <SectionFeature
              v-for="section in sections"
              :key="section.title"
              :title="section.title"
              :text="section.text"
              :icon="section.icon"
              :link="section.link"
              horizontal
            />
          </div>
        </div>
      </div>
    </section>

    <section class="equipment">
      <img src="@/assets/home-images/equipment.jpg" alt="" class="equipment__image" loading="lazy" />
      <div class="container equipment__inner">
        <div class="equipment__content">
          <span class="eyebrow eyebrow--light">Zaplecze techniczne</span>
          <h2 class="section-title section-title--light">Potrzebujesz sprzętu?</h2>
          <p>
            Nasze koło posiada specjalistyczny sprzęt. Druk 3D czy tworzenie gier na platformę VR to dla nas
            drobnostka. Dzięki własnemu zapleczu możemy bez przeszkód rozwijać umiejętności w tych dziedzinach.
          </p>
          <ul class="equipment__list">
            <li><i class="mdi mdi-printer-3d-nozzle-outline"></i> Drukarka 3D</li>
            <li><i class="mdi mdi-chip"></i> Arduino i Raspberry Pi</li>
            <li><i class="mdi mdi-virtual-reality"></i> Gogle VR</li>
            <li><i class="mdi mdi-soldering-iron"></i> Lutownice</li>
            <li><i class="mdi mdi-gamepad-classic"></i> Sprzęt retro</li>
          </ul>
          <router-link :to="{ name: isLoggedIn ? 'hardwareList' : 'about' }" class="btn btn--light">
            {{ isLoggedIn ? 'Przeglądaj sprzęt' : 'Dowiedz się więcej' }}
            <i class="mdi mdi-arrow-right" aria-hidden="true"></i>
          </router-link>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Co słychać w SKNI KOD?</span>
            <h2 class="section-title">Najnowsze wpisy</h2>
          </div>
          <router-link :to="{ name: 'news' }" class="btn btn--ghost">
            Wszystkie aktualności <i class="mdi mdi-arrow-right" aria-hidden="true"></i>
          </router-link>
        </div>
        <div v-if="latestArticles.length" class="cards cards--3">
          <ArticleCard v-for="article in latestArticles" :key="article.id" :article="article" />
        </div>
        <div v-else class="cards cards--3" aria-hidden="true">
          <div v-for="n in 3" :key="n" class="skeleton card-skeleton"></div>
        </div>
      </div>
    </section>

    <section v-if="featuredProjects.length" class="section section--muted">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Nasze projekty</span>
            <h2 class="section-title">Prowadzimy wiele ciekawych projektów</h2>
          </div>
          <p class="projects-count">
            Mamy ich już ponad <strong>{{ projectsCount }}</strong>
          </p>
        </div>
        <div class="cards cards--4">
          <ProjectCard v-for="project in featuredProjects" :key="project.id" :project="project" />
        </div>
        <div class="center">
          <router-link :to="{ name: 'projects' }" class="btn btn--lg">
            Zobacz wszystkie projekty <i class="mdi mdi-arrow-right" aria-hidden="true"></i>
          </router-link>
        </div>
      </div>
    </section>

    <section v-show="hasSponsors" class="section">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">Nasi partnerzy</span>
          <h2 class="section-title">Wspierają nas</h2>
        </div>
        <SponsorsStrip @loaded="hasSponsors = $event > 0" />
      </div>
    </section>

    <section class="section cta-wrap">
      <div class="container">
        <div class="cta">
          <div>
            <h2 class="cta__title">Chcesz tworzyć z nami?</h2>
            <p>Napisz do nas na Facebooku lub wpadnij na najbliższe spotkanie koła. Każdy znajdzie tu coś dla siebie.</p>
          </div>
          <div class="cta__actions">
            <a href="https://www.facebook.com/skni.kod" target="_blank" rel="noopener" class="btn btn--lg btn--light">
              <i class="mdi mdi-facebook" aria-hidden="true"></i> Napisz do nas
            </a>
            <router-link v-if="!isLoggedIn" :to="{ name: 'register' }" class="btn btn--lg btn--outline-light">
              Załóż konto
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import type { ArticleModel } from '@/models/ArticleModel';
import type { ProjectInfo } from '@/store/modules/projects';
import HeroSection from '@/components/HeroSection.vue';
import SectionFeature from '@/components/SectionFeature.vue';
import ArticleCard from '@/components/ArticleCard.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import SponsorsStrip from '@/components/SponsorsStrip.vue';

const store = useStore();
const hasSponsors = ref(false);

const sections = [
  {
    title: 'Sekcja Game-Dev',
    text: 'Tworzymy gry komputerowe, głównie w oparciu o silnik Unity. W pracy wykorzystujemy również technologię wirtualnej rzeczywistości.',
    icon: 'gamepad-variant-outline',
    link: '/section/2',
  },
  {
    title: 'Sekcja Aplikacji Desktopowych, Mobilnych i Webowych',
    text: 'Budujemy aplikacje na różnego rodzaju urządzenia, wykorzystując szeroką gamę technologii.',
    icon: 'monitor-cellphone',
    link: '/section/1',
  },
  {
    title: 'Sekcja Elektroniki i Retro',
    text: 'Odrestaurowujemy stary sprzęt, łączymy przeszłość z teraźniejszością i prowadzimy działalność edukacyjną. Realizujemy też projekty elektroniczne.',
    icon: 'chip',
    link: '/section/3',
  },
];

const isLoggedIn = computed<boolean>(() => store.getters.isAuthenticated);
const latestArticles = computed<ArticleModel[]>(() => (store.getters.articles && store.getters.articles.results) || []);
const featuredProjects = computed<ProjectInfo[]>(() => store.getters.featuredProjects);
const projectsCount = computed<number>(() => store.getters.projectsCount);

onMounted(() => {
  store.dispatch('getArticles');
  store.dispatch('getProjects');
});
</script>

<style scoped>
.section-title {
  font-size: clamp(28px, 3.4vw, 40px);
  line-height: 1.15;
}

.section-title--light {
  color: #fff;
}

.eyebrow--light {
  color: var(--sky);
}

.intro {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: center;
}

.intro__text {
  display: grid;
  gap: 20px;
  justify-items: start;
}

.features {
  display: grid;
  gap: 16px;
}

.equipment {
  position: relative;
  overflow: hidden;
  background: var(--navy-900);
  color: var(--text-inverse-muted);
}

.equipment__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.equipment::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(90deg, rgba(7, 18, 38, 0.95) 0%, rgba(7, 18, 38, 0.85) 45%, rgba(7, 18, 38, 0.25) 100%);
}

.equipment__inner {
  position: relative;
  z-index: 2;
  padding-block: clamp(64px, 9vw, 120px);
}

.equipment__content {
  display: grid;
  gap: 20px;
  justify-items: start;
  max-width: 560px;
  line-height: 1.7;
}

.equipment__list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin-bottom: 8px;
}

.equipment__list li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-inverse);
  font-size: 14px;
}

.equipment__list .mdi {
  color: var(--sky);
  font-size: 17px;
}

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: clamp(28px, 4vw, 44px);
}

.section-head > div {
  display: grid;
  gap: 12px;
  max-width: 640px;
}

.section-head--center {
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
}

.cards {
  display: grid;
  gap: 24px;
}

.cards--3 {
  grid-template-columns: repeat(3, 1fr);
}

.cards--4 {
  grid-template-columns: repeat(4, 1fr);
}

.card-skeleton {
  height: 420px;
  border-radius: var(--radius-lg);
}

.projects-count {
  display: flex;
  align-items: baseline;
  gap: 10px;
  color: var(--text-muted);
  font-size: 15px;
}

.projects-count strong {
  font-family: var(--font-display);
  font-size: 40px;
  line-height: 1;
  color: var(--primary);
}

.center {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.cta-wrap {
  padding-top: 0;
}

.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 28px;
  padding: clamp(32px, 5vw, 56px);
  border-radius: 24px;
  background:
    radial-gradient(ellipse 60% 120% at 100% 0%, rgba(56, 189, 248, 0.35), transparent 60%),
    linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: rgba(255, 255, 255, 0.85);
  box-shadow: 0 30px 60px -30px rgba(46, 49, 117, 0.7);
}

.cta > div:first-child {
  display: grid;
  gap: 10px;
  max-width: 560px;
}

.cta__title {
  color: #fff;
  font-size: clamp(26px, 3vw, 34px);
}

.cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 1100px) {
  .cards--4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 960px) {
  .intro {
    grid-template-columns: 1fr;
  }

  .cards--3 {
    grid-template-columns: 1fr 1fr;
  }

  .equipment::before {
    background: rgba(7, 18, 38, 0.86);
  }
}

@media (max-width: 640px) {
  .cards--3,
  .cards--4 {
    grid-template-columns: 1fr;
  }
}
</style>
