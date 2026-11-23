<template>
  <section class="hero">
    <img src="@/assets/hero-image.jpg" alt="" class="hero__photo" />
    <div class="container hero__inner">
      <p class="hero__kicker">Politechnika Rzeszowska, Wydział Elektrotechniki i Informatyki</p>
      <h1 class="hero__title">Studenckie Koło Naukowe Informatyków KOD</h1>
      <p class="hero__text">
        Od 1997 roku spotykamy się, żeby programować, tworzyć gry i aplikacje, budować elektronikę i uczyć się od
        siebie nawzajem.
      </p>
      <div class="hero__actions">
        <router-link :to="{ hash: '#sections' }" class="btn btn--lg">Poznaj sekcje</router-link>
        <router-link :to="{ name: 'projects' }" class="btn btn--lg btn--outline-light">Nasze projekty</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  background: var(--navy-950);
  color: #fff;
}

.hero__photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 70% center;
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(7, 18, 38, 0.94) 0%, rgba(7, 18, 38, 0.82) 42%, rgba(7, 18, 38, 0.35) 100%);
}

.hero__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: min(78vh, 680px);
  padding-block: 88px;
}

.hero__kicker {
  margin-bottom: 20px;
  color: var(--text-inverse-muted);
  font-size: 15px;
  font-weight: 500;
}

.hero__title {
  max-width: 820px;
  color: #fff;
  font-size: clamp(40px, 5.6vw, 76px);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -0.03em;
}

.hero__text {
  max-width: 540px;
  margin-top: 24px;
  color: #c9d4e5;
  font-size: clamp(17px, 1.4vw, 19px);
  line-height: 1.65;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 36px;
}

@media (max-width: 760px) {
  .hero::after {
    background: rgba(7, 18, 38, 0.84);
  }

  .hero__inner {
    min-height: 0;
    padding-block: 64px 72px;
  }
}
</style>
