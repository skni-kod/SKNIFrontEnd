<template>
  <footer class="footer">
    <div class="container footer__grid">
      <div class="footer__brand">
        <img src="@/assets/logo_small.png" alt="SKNI KOD" class="footer__logo" width="125" height="46" />
        <p>
          Studenckie koło naukowe przy Politechnice Rzeszowskiej. Rozwijamy kompetencje, których szuka rynek IT: pracę
          w zespole, code review i świadome korzystanie z narzędzi AI.
        </p>
        <div class="footer__social">
          <a
            v-for="social in socialLinks"
            :key="social.link"
            :href="social.link"
            target="_blank"
            rel="noopener"
            class="footer__social-link"
            :aria-label="social.title"
          >
            <i class="mdi" :class="iconClass(social.icon)"></i>
          </a>
        </div>
      </div>

      <div class="footer__col">
        <h2 class="footer__heading">Koło</h2>
        <router-link :to="{ name: 'about' }">O nas</router-link>
        <router-link :to="{ name: 'home', hash: '#sections' }">Sekcje</router-link>
        <router-link :to="{ name: 'projects' }">Projekty</router-link>
      </div>

      <div class="footer__col">
        <h2 class="footer__heading">Treści</h2>
        <router-link :to="{ name: 'news' }">Aktualności</router-link>
        <router-link :to="{ name: 'articles' }">Artykuły</router-link>
      </div>

      <div class="footer__col">
        <h2 class="footer__heading">Konto</h2>
        <template v-if="isLoggedIn">
          <router-link :to="{ name: 'userPanel' }">Mój panel</router-link>
          <router-link :to="{ name: 'hardwareList' }">Sprzęt</router-link>
        </template>
        <template v-else>
          <router-link :to="{ name: 'login' }">Logowanie</router-link>
          <router-link v-if="registrationOpen" :to="{ name: 'register' }">Rejestracja</router-link>
        </template>
      </div>
    </div>

    <div class="container footer__partners">
      <a href="https://prz.edu.pl" target="_blank" rel="noopener" aria-label="Politechnika Rzeszowska">
        <img src="@/assets/partners/prz.png" alt="Politechnika Rzeszowska im. Ignacego Łukasiewicza" width="175" height="75" />
      </a>
      <a href="https://weii.prz.edu.pl" target="_blank" rel="noopener" aria-label="Wydział Elektrotechniki i Informatyki">
        <img src="@/assets/partners/weii.png" alt="Wydział Elektrotechniki i Informatyki Politechniki Rzeszowskiej" width="203" height="61" />
      </a>
    </div>

    <div class="container footer__bottom">
      <span>© {{ year }} SKNI KOD. Wszystkie prawa zastrzeżone.</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { iconClass } from '@/utils/icons';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useSocialLinks } from '@/composables/useSocialLinks';
import { useSiteSettings } from '@/composables/useSiteSettings';

const store = useStore();
const socialLinks = useSocialLinks();
const year = new Date().getFullYear();
const isLoggedIn = computed<boolean>(() => store.getters.isAuthenticated);
const { settings } = useSiteSettings();
const registrationOpen = computed(() => !settings.value || settings.value.registration_open);
</script>

<style scoped>
.footer {
  margin-top: auto;
  background: var(--navy-950);
  color: var(--text-inverse-muted);
  font-size: 15px;
}

.footer__grid {
  display: grid;
  grid-template-columns: 1.6fr repeat(3, 1fr);
  gap: 40px;
  padding-block: 64px 48px;
}

.footer__brand {
  display: grid;
  gap: 18px;
  align-content: start;
  max-width: 360px;
}

.footer__logo {
  height: 42px;
  width: auto;
  filter: brightness(0) invert(1);
}

.footer__brand p {
  line-height: 1.7;
}

.footer__social {
  display: flex;
  gap: 8px;
}

.footer__social-link {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-inverse);
  font-size: 20px;
  transition: background-color var(--t-fast), color var(--t-fast);
}

.footer__social-link:hover {
  background: var(--primary);
  color: #fff;
}

.footer__col {
  display: grid;
  gap: 10px;
  align-content: start;
}

.footer__heading {
  margin-bottom: 6px;
  color: #fff;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.footer__col a {
  color: var(--text-inverse-muted);
  width: fit-content;
  transition: color var(--t-fast);
}

.footer__col a:hover {
  color: #fff;
}

.footer__partners {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px 40px;
  padding-block: 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer__partners a {
  opacity: 0.8;
  transition: opacity var(--t-fast);
}

.footer__partners a:hover {
  opacity: 1;
}

.footer__partners img {
  height: 52px;
  width: auto;
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 24px;
  padding-block: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 13px;
  color: #7385a1;
}

@media (max-width: 900px) {
  .footer__grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .footer__brand {
    grid-column: 1 / -1;
    max-width: none;
  }
}

@media (max-width: 520px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    padding-block: 48px 36px;
  }
}
</style>
