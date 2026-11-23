<template>
  <div>
    <PageHeader
      eyebrow="O nas"
      title='Studenckie Koło Naukowe Informatyków „KOD”'
      description="Od 1997 roku zrzeszamy studentów Politechniki Rzeszowskiej, którzy chcą rozwijać się w programowaniu i nowoczesnych technologiach."
    />

    <section class="section">
      <div class="container about">
        <div class="about__text">
          <p class="lead">
            Koło skupia głównie studentów kierunku Informatyka Wydziału Elektrotechniki i Informatyki. Od początku
            działalności udaje się zachęcić do czynnego udziału w pracach koła już studentów pierwszych lat.
          </p>
          <p>
            Celem pracy koła jest poszerzenie wiedzy z dziedziny optymalnego rozwiązywania zagadnień programowania oraz
            poznawanie nowoczesnych technologii informatycznych. W ramach regularnych spotkań studenci samodzielnie
            przygotowują referaty oraz organizują wewnętrzne współzawodnictwo w rozwiązywaniu interesujących ich
            zagadnień.
          </p>
          <p>
            Członkowie koła mają możliwość testowania nowoczesnego oprogramowania systemowego i sieciowego, a także
            obsługi własnych serwerów. W ramach koła działa Rzeszowska Grupa .NET, zajmująca się technologiami
            programistycznymi firmy Microsoft.
          </p>
          <p>
            Efektem pracy koła jest udział w zawodach informatycznych, takich jak Imagine Cup czy Akademickie Mistrzostwa
            w Programowaniu Zespołowym, a także w ogólnopolskich konferencjach dla młodych pracowników nauki i studentów.
          </p>
        </div>
        <figure class="about__figure">
          <img src="@/assets/about_1.jpg" alt="Członkowie SKNI KOD" loading="lazy" />
        </figure>
      </div>
    </section>

    <section class="section section--muted">
      <div class="container container--narrow">
        <div class="history-head">
          <span class="eyebrow">Historia</span>
          <h2 class="history-title">Ponad ćwierć wieku działalności</h2>
        </div>
        <LoadingState v-if="!timelineItems" />
        <ol v-else class="timeline">
          <li v-for="item in timelineItems" :key="`${item.year}-${item.title}`" class="timeline__item">
            <span class="timeline__dot" aria-hidden="true"></span>
            <div class="timeline__card card">
              <span class="timeline__year">{{ item.year }}</span>
              <h3 class="timeline__title">{{ item.title }}</h3>
              <p v-if="item.text">{{ item.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import LoadingState from '@/components/ui/LoadingState.vue';
import { useSiteSettings } from '@/composables/useSiteSettings';

const { settings, failed } = useSiteSettings();
const timelineItems = computed(() => {
  if (settings.value) {
    return settings.value.history;
  }
  return failed.value ? [] : null;
});
</script>

<style scoped>
.about {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(32px, 6vw, 80px);
  align-items: center;
}

.about__text {
  display: grid;
  gap: 18px;
  color: var(--text-muted);
  line-height: 1.75;
}

.about__text .lead {
  color: var(--text);
}

.about__figure {
  margin: 0;
}

.about__figure img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: var(--shadow-lg);
}

.history-head {
  display: grid;
  justify-items: center;
  gap: 12px;
  margin-bottom: 48px;
  text-align: center;
}

.history-title {
  font-size: clamp(26px, 3vw, 36px);
}

.timeline {
  position: relative;
  display: grid;
  gap: 24px;
  list-style: none;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 21px;
  width: 2px;
  background: linear-gradient(180deg, var(--primary) 0%, var(--primary-soft-2) 100%);
}

.timeline__item {
  position: relative;
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 20px;
}

.timeline__dot {
  position: relative;
  z-index: 1;
  width: 16px;
  height: 16px;
  margin: 24px auto 0;
  border-radius: 50%;
  background: #fff;
  border: 3px solid var(--primary);
}

.timeline__card {
  display: grid;
  gap: 8px;
  padding: 22px 24px;
  color: var(--text-muted);
  font-size: 15px;
  line-height: 1.7;
}

.timeline__year {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  color: var(--primary);
}

.timeline__title {
  font-size: 19px;
}

@media (max-width: 860px) {
  .about {
    grid-template-columns: 1fr;
  }

  .about__figure img {
    aspect-ratio: 16 / 10;
  }
}
</style>
