<template>
  <header class="header" :class="{ 'is-scrolled': scrolled }">
    <div class="container header__inner">
      <router-link :to="{ name: 'home' }" class="header__brand" aria-label="SKNI KOD, strona główna">
        <img src="@/assets/logo_small.png" alt="SKNI KOD" class="header__logo" width="125" height="46" />
      </router-link>

      <nav class="nav" aria-label="Nawigacja główna">
        <router-link v-for="link in links" :key="link.label" :to="link.to" class="nav__link">
          {{ link.label }}
        </router-link>
      </nav>

      <div class="header__actions">
        <router-link v-if="!isLoggedIn" :to="{ name: 'login' }" class="btn btn--sm header__login">
          <i class="mdi mdi-login" aria-hidden="true"></i>
          Zaloguj się
        </router-link>

        <div v-else ref="accountRoot" class="account">
          <button
            type="button"
            class="account__trigger"
            :aria-expanded="accountOpen"
            aria-haspopup="menu"
            @click="accountOpen = !accountOpen"
          >
            <span class="avatar" aria-hidden="true">{{ initials }}</span>
            <span class="account__name">{{ displayName }}</span>
            <i class="mdi mdi-chevron-down" aria-hidden="true"></i>
          </button>
          <Transition name="pop">
            <div v-if="accountOpen" class="account__menu" role="menu">
              <div class="account__head">
                <strong>{{ fullName }}</strong>
                <span v-if="user && user.username">@{{ user.username }}</span>
              </div>
              <router-link :to="{ name: 'userPanel' }" class="account__item" role="menuitem">
                <i class="mdi mdi-view-dashboard-outline"></i> Mój panel
              </router-link>
              <router-link v-if="isAdministrator" :to="{ name: 'adminPanel' }" class="account__item" role="menuitem">
                <i class="mdi mdi-shield-crown-outline"></i> Panel administratora
              </router-link>
              <button type="button" class="account__item account__item--danger" role="menuitem" @click="logout">
                <i class="mdi mdi-logout"></i> Wyloguj
              </button>
            </div>
          </Transition>
        </div>

        <button
          type="button"
          class="burger"
          :class="{ 'is-open': menuOpen }"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          aria-label="Menu"
          @click="menuOpen = !menuOpen"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <Teleport to="body">
    <Transition name="fade">
      <div v-if="menuOpen" class="drawer-overlay" @click="menuOpen = false"></div>
    </Transition>
    <Transition name="slide">
      <aside v-if="menuOpen" id="mobile-menu" class="drawer" aria-label="Menu mobilne">
        <div class="drawer__head">
          <img src="@/assets/logo_small.png" alt="SKNI KOD" class="header__logo" />
          <button type="button" class="btn btn--ghost btn--icon" aria-label="Zamknij menu" @click="menuOpen = false">
            <i class="mdi mdi-close"></i>
          </button>
        </div>
        <nav class="drawer__nav">
          <router-link v-for="link in links" :key="link.label" :to="link.to" class="drawer__link">
            {{ link.label }}
          </router-link>
        </nav>
        <div class="drawer__account">
          <template v-if="isLoggedIn">
            <router-link :to="{ name: 'userPanel' }" class="btn btn--secondary btn--block">
              <i class="mdi mdi-view-dashboard-outline"></i> Mój panel
            </router-link>
            <router-link v-if="isAdministrator" :to="{ name: 'adminPanel' }" class="btn btn--secondary btn--block">
              <i class="mdi mdi-shield-crown-outline"></i> Panel administratora
            </router-link>
            <button type="button" class="btn btn--danger-ghost btn--block" @click="logout">
              <i class="mdi mdi-logout"></i> Wyloguj
            </button>
          </template>
          <template v-else>
            <router-link :to="{ name: 'login' }" class="btn btn--block">Zaloguj się</router-link>
            <router-link v-if="registrationOpen" :to="{ name: 'register' }" class="btn btn--secondary btn--block">
              Załóż konto
            </router-link>
          </template>
        </div>
        <div class="drawer__social">
          <a
            v-for="social in socialLinks"
            :key="social.link"
            :href="social.link"
            target="_blank"
            rel="noopener"
            class="btn btn--ghost btn--icon"
            :aria-label="social.title"
          >
            <i class="mdi" :class="iconClass(social.icon)"></i>
          </a>
        </div>
      </aside>
    </Transition>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { iconClass } from '@/utils/icons';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useSocialLinks } from '@/composables/useSocialLinks';
import { useSiteSettings } from '@/composables/useSiteSettings';

const store = useStore();
const route = useRoute();
const socialLinks = useSocialLinks();
const { settings } = useSiteSettings();
const registrationOpen = computed(() => !settings.value || settings.value.registration_open);

const scrolled = ref(false);
const menuOpen = ref(false);
const accountOpen = ref(false);
const accountRoot = ref<HTMLElement>();

const isLoggedIn = computed<boolean>(() => store.getters.isAuthenticated);
const isAdministrator = computed<boolean>(() => !!store.getters.isAdministrator);
const user = computed(() => store.getters.user);

const fullName = computed(() => {
  const u = user.value;
  if (!u) {
    return 'Użytkownik';
  }
  return [u.first_name, u.last_name].filter(Boolean).join(' ') || u.username;
});
const displayName = computed(() => (user.value && (user.value.first_name || user.value.username)) || 'Konto');
const initials = computed(() => {
  const u = user.value;
  if (!u) {
    return '?';
  }
  const parts = [u.first_name, u.last_name].filter(Boolean);
  const source = parts.length ? parts.map((p: string) => p[0]).join('') : (u.username || '?').slice(0, 2);
  return source.toUpperCase();
});

const links = computed(() => [
  { label: 'O nas', to: { name: 'about' } },
  { label: 'Aktualności', to: { name: 'news' } },
  { label: 'Artykuły', to: { name: 'articles' } },
  { label: 'Projekty', to: { name: 'projects' } },
  ...(isLoggedIn.value ? [{ label: 'Sprzęt', to: { name: 'hardwareList' } }] : []),
]);

function logout() {
  menuOpen.value = false;
  accountOpen.value = false;
  store.dispatch('logout');
}

function onScroll() {
  scrolled.value = window.scrollY > 8;
}

function onOutside(event: MouseEvent) {
  if (accountOpen.value && accountRoot.value && !accountRoot.value.contains(event.target as Node)) {
    accountOpen.value = false;
  }
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    menuOpen.value = false;
    accountOpen.value = false;
  }
}

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
    accountOpen.value = false;
  },
);

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
});

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('mousedown', onOutside);
  document.addEventListener('keydown', onKey);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  document.removeEventListener('mousedown', onOutside);
  document.removeEventListener('keydown', onKey);
});
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--header-h);
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color var(--t), box-shadow var(--t);
}

.header.is-scrolled {
  border-bottom-color: var(--border);
  box-shadow: 0 6px 24px -18px rgba(15, 23, 42, 0.4);
}

.header__inner {
  display: flex;
  align-items: center;
  gap: 32px;
  height: 100%;
}

.header__brand {
  display: flex;
  flex-shrink: 0;
}

.header__logo {
  height: 40px;
  width: auto;
}

.nav {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: auto;
}

.nav__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  font-size: 15px;
  font-weight: 500;
  transition: color var(--t-fast), background-color var(--t-fast);
}

.nav__link:hover {
  color: var(--text);
  background: var(--surface-2);
}

.nav__link.router-link-active {
  color: var(--primary);
}

.nav__link.router-link-active::after {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: -14px;
  height: 2px;
  border-radius: 2px;
  background: var(--primary);
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.account {
  position: relative;
}

.account__trigger {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 10px 4px 4px;
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  background: #fff;
  font-size: 14px;
  font-weight: 600;
  transition: border-color var(--t-fast), box-shadow var(--t-fast);
}

.account__trigger:hover {
  border-color: var(--border-strong);
  box-shadow: var(--shadow-xs);
}

.account__trigger .mdi {
  color: var(--text-subtle);
}

.avatar {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.account__name {
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.account__menu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  width: 250px;
  padding: 6px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.account__head {
  display: grid;
  padding: 10px 12px 12px;
  margin-bottom: 6px;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}

.account__head span {
  color: var(--text-subtle);
  font-size: 13px;
}

.account__item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 12px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text);
  font-size: 14px;
  font-weight: 500;
  text-align: left;
}

.account__item .mdi {
  font-size: 18px;
  color: var(--text-subtle);
}

.account__item:hover {
  background: var(--surface);
}

.account__item--danger,
.account__item--danger .mdi {
  color: var(--danger);
}

.burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 42px;
  height: 42px;
  padding: 0 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: #fff;
}

.burger span {
  display: block;
  height: 2px;
  border-radius: 2px;
  background: var(--text);
  transition: transform var(--t), opacity var(--t);
}

.drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 110;
  background: rgba(7, 18, 38, 0.5);
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 120;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: min(360px, 88vw);
  padding: 16px 20px 24px;
  overflow-y: auto;
  background: #fff;
  box-shadow: var(--shadow-lg);
}

.drawer__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.drawer__nav {
  display: grid;
  gap: 2px;
}

.drawer__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  color: var(--text);
  font-size: 16px;
  font-weight: 500;
}

.drawer__link:hover {
  background: var(--surface);
}

.drawer__link.router-link-active {
  background: var(--primary-soft);
  color: var(--primary-strong);
}

.drawer__account {
  display: grid;
  gap: 8px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.drawer__social {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: auto;
}

.drawer__social .mdi {
  font-size: 22px;
}

.pop-enter-active,
.pop-leave-active {
  transition: opacity var(--t-fast) var(--ease), transform var(--t-fast) var(--ease);
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--t) var(--ease);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform var(--t) var(--ease);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

@media (max-width: 1023px) {
  .nav {
    display: none;
  }

  .header__actions {
    margin-left: auto;
  }

  .burger {
    display: flex;
  }

  .account__name {
    display: none;
  }
}

@media (max-width: 479px) {
  .header__login {
    display: none;
  }
}
</style>
