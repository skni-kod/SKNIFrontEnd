<template>
  <section class="hero">
    <div class="hero__bg" aria-hidden="true"></div>
    <div class="container hero__inner">
      <div class="hero__content">
        <span class="hero__eyebrow">
          <i class="mdi mdi-school-outline" aria-hidden="true"></i>
          Politechnika Rzeszowska · od 1997
        </span>
        <h1 class="hero__title">
          Studenckie Koło Naukowe Informatyków <span class="hero__accent">KOD</span>
        </h1>
        <p class="hero__text">
          Poszerzamy wiedzę z optymalnego rozwiązywania zagadnień programistycznych i poznajemy nowoczesne technologie.
          Na regularnych spotkaniach przygotowujemy referaty, realizujemy projekty i rywalizujemy w rozwiązywaniu
          ciekawych problemów.
        </p>
        <div class="hero__actions">
          <router-link :to="{ hash: '#sections' }" class="btn btn--lg btn--light">
            Poznaj nasze sekcje
            <i class="mdi mdi-arrow-down" aria-hidden="true"></i>
          </router-link>
          <router-link :to="{ name: 'projects' }" class="btn btn--lg btn--outline-light">Zobacz projekty</router-link>
        </div>
        <dl class="hero__stats">
          <div>
            <dt>Rok założenia</dt>
            <dd>1997</dd>
          </div>
          <div>
            <dt>Sekcje tematyczne</dt>
            <dd>3</dd>
          </div>
          <div v-if="projectsCount">
            <dt>Projekty</dt>
            <dd>{{ projectsCount }}+</dd>
          </div>
        </dl>
      </div>

      <div class="hero__visual">
        <img src="@/assets/hero-image.jpg" alt="Członkowie koła podczas pracy przy laptopach" class="hero__image" />
        <div class="hero__card">
          <span class="hero__card-icon" aria-hidden="true"><i class="mdi mdi-code-braces"></i></span>
          <div>
            <strong>Gry, aplikacje, elektronika</strong>
            <span>Wybierz projekt dla siebie</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ projectsCount?: number }>();
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  background: var(--navy-950);
  color: var(--text-inverse);
}

.hero__bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 60% at 85% 10%, rgba(0, 114, 168, 0.45), transparent 65%),
    radial-gradient(ellipse 50% 50% at 0% 100%, rgba(46, 49, 117, 0.6), transparent 70%),
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: auto, auto, 44px 44px, 44px 44px;
  mask-image: linear-gradient(180deg, #000 70%, transparent 100%);
}

.hero__inner {
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: clamp(40px, 6vw, 88px);
  padding-block: clamp(56px, 9vw, 120px);
}

.hero__content {
  display: grid;
  gap: 24px;
  justify-items: start;
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-inverse-muted);
  font-size: 13px;
  font-weight: 500;
}

.hero__eyebrow .mdi {
  color: var(--sky);
  font-size: 16px;
}

.hero__title {
  color: #fff;
  font-size: clamp(36px, 5.2vw, 62px);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.025em;
}

.hero__accent {
  background: linear-gradient(90deg, #7dd3fc 0%, var(--sky) 45%, #60a5fa 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__text {
  max-width: 560px;
  color: var(--text-inverse-muted);
  font-size: clamp(16px, 1.35vw, 18px);
  line-height: 1.7;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

.hero__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 40px;
  margin: 20px 0 0;
  padding-top: 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.hero__stats div {
  display: flex;
  flex-direction: column-reverse;
  gap: 2px;
}

.hero__stats dt {
  color: var(--text-inverse-muted);
  font-size: 13px;
}

.hero__stats dd {
  margin: 0;
  color: #fff;
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 700;
  line-height: 1.1;
}

.hero__visual {
  position: relative;
}

.hero__image {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.6);
  outline: 1px solid rgba(255, 255, 255, 0.08);
  outline-offset: -1px;
}

.hero__card {
  position: absolute;
  left: -28px;
  bottom: 36px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px 14px 14px;
  background: rgba(255, 255, 255, 0.96);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  color: var(--text);
}

.hero__card div {
  display: grid;
  font-size: 13px;
  color: var(--text-muted);
}

.hero__card strong {
  font-size: 15px;
  color: var(--text);
}

.hero__card-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: #fff;
  font-size: 22px;
}

@media (max-width: 960px) {
  .hero__inner {
    grid-template-columns: 1fr;
  }

  .hero__visual {
    max-width: 560px;
  }

  .hero__image {
    aspect-ratio: 16 / 10;
  }

  .hero__card {
    left: 16px;
    bottom: 16px;
  }
}
</style>
