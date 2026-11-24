<template>
  <div class="home">
    <div class="top">
      <div v-if="announcement" class="announcement">
        <div class="container announcement__inner">
          <i class="mdi mdi-bullhorn-outline" aria-hidden="true"></i>
          <p>{{ announcement }}</p>
        </div>
      </div>
      <HeroSection />
    </div>

    <section id="sections" class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Sekcje w SKNI KOD</span>
            <h2 class="section-title">Dołącz do naszego koła i zaangażuj się!</h2>
            <p class="lead">
              W każdej sekcji realizowane są przeróżne projekty, a to Ty wybierasz, do którego chcesz dołączyć.
              Skontaktuj się z nami przez fanpage na Facebooku lub przyjdź na spotkanie.
            </p>
          </div>
          <router-link :to="{ name: 'about' }" class="btn btn--secondary">
            Więcej o kole <i class="mdi mdi-arrow-right" aria-hidden="true"></i>
          </router-link>
        </div>
        <div v-if="sections.length" class="features" :class="{ 'features--odd': sections.length % 2 === 1 }" :style="{ '--cols': Math.min(sections.length, 4) }">
          <SectionFeature
            v-for="section in sections"
            :key="section.id"
            :title="section.name"
            :text="section.text"
            :icon="section.icon"
            :link="{ name: 'section', params: { id: section.id } }"
          />
        </div>
        <div v-else class="features" style="--cols: 4" aria-hidden="true">
          <div v-for="n in 4" :key="n" class="skeleton feature-skeleton"></div>
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
            <router-link v-if="!isLoggedIn && registrationOpen" :to="{ name: 'register' }" class="btn btn--lg btn--outline-light">
              Załóż konto
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import type { ArticleModel } from '@/models/ArticleModel';
import type { ProjectInfo } from '@/store/modules/projects';
import HeroSection from '@/components/HeroSection.vue';
import SectionFeature from '@/components/SectionFeature.vue';
import ArticleCard from '@/components/ArticleCard.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import SponsorsStrip from '@/components/SponsorsStrip.vue';
import removeMarkdown from 'remove-markdown';
import { SectionsService } from '@/services/SectionsService';
import type { SectionModel } from '@/models/SectionModel';
import { sectionIcon } from '@/utils/sections';
import { useSiteSettings } from '@/composables/useSiteSettings';

const store = useStore();
const hasSponsors = ref(false);
const { settings: siteSettings } = useSiteSettings();
const now = ref(Date.now());
let expiryTimer: ReturnType<typeof setTimeout> | undefined;

const announcement = computed(() => {
  const s = siteSettings.value;
  if (!s || !s.announcement_enabled) {
    return '';
  }
  if (s.announcement_expires_at && new Date(s.announcement_expires_at).getTime() <= now.value) {
    return '';
  }
  return s.announcement_text.trim();
});

watch(
  () => siteSettings.value?.announcement_expires_at,
  (expiresAt) => {
    clearTimeout(expiryTimer);
    if (!expiresAt) {
      return;
    }
    const delay = new Date(expiresAt).getTime() - Date.now();
    if (delay > 0 && delay < 2 ** 31 - 1) {
      expiryTimer = setTimeout(() => (now.value = Date.now()), delay + 500);
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => clearTimeout(expiryTimer));
const registrationOpen = computed(() => !siteSettings.value || siteSettings.value.registration_open);

const sections = ref<{ id: number; name: string; text: string; icon: string }[]>([]);

const isLoggedIn = computed<boolean>(() => store.getters.isAuthenticated);
const latestArticles = computed<ArticleModel[]>(() => (store.getters.articles && store.getters.articles.results) || []);
const featuredProjects = computed<ProjectInfo[]>(() => store.getters.featuredProjects);
const projectsCount = computed<number>(() => store.getters.projectsCount);

function excerpt(markdown: string) {
  const text = removeMarkdown(markdown || '').replace(/\s+/g, ' ').trim();
  return text.length > 190 ? `${text.slice(0, 190).trim()}…` : text;
}

onMounted(() => {
  store.dispatch('getArticles');
  store.dispatch('getProjects');
  new SectionsService().getAllSections().then((res) => {
    sections.value = (res.data as SectionModel[])
      .filter((section) => section.isVisible !== false)
      .sort((a, b) => a.id - b.id)
      .map((section) => ({
        id: section.id,
        name: section.name,
        text: excerpt(section.description),
        icon: section.icon || sectionIcon(section.id),
      }));
  });
});
</script>

<style scoped>
.top {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - var(--header-h));
  min-height: calc(100svh - var(--header-h));
}

.announcement {
  background: var(--primary);
  color: #fff;
}

.announcement__inner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-block: 12px;
  font-size: 15px;
  font-weight: 500;
}

.announcement__inner .mdi {
  font-size: 20px;
}

.announcement__inner p {
  white-space: pre-line;
}

.section-title {
  font-size: clamp(28px, 3.4vw, 40px);
  line-height: 1.15;
}

.section-title--light {
  color: #fff;
}

.eyebrow--light {
  color: #7dc4ea;
}

.features {
  display: grid;
  grid-template-columns: repeat(var(--cols, 4), 1fr);
  gap: 20px;
}

.feature-skeleton {
  height: 300px;
  border-radius: var(--radius-lg);
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
  border-radius: var(--radius-lg);
  background: var(--navy-900);
  color: var(--text-inverse-muted);
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

@media (max-width: 1100px) {
  .features {
    grid-template-columns: repeat(2, 1fr);
  }

  .features--odd > :last-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 960px) {
  .cards--3 {
    grid-template-columns: 1fr 1fr;
  }

  .equipment::before {
    background: rgba(7, 18, 38, 0.86);
  }
}

@media (max-width: 640px) {
  .features,
  .cards--3,
  .cards--4 {
    grid-template-columns: 1fr;
  }

  .features--odd > :last-child {
    grid-column: auto;
  }
}
</style>
