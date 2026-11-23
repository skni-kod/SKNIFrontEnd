<template>
  <div>
    <PageHeader eyebrow="Mój panel" :title="`Witaj, ${user?.first_name || 'Gal Anonim'}!`">
      <template #meta>
        <span v-if="user" class="meta-item"><i class="mdi mdi-at" aria-hidden="true"></i>{{ user.username }}</span>
        <span v-if="user && user.email" class="meta-item">
          <i class="mdi mdi-email-outline" aria-hidden="true"></i>{{ user.email }}
        </span>
      </template>
      <template #actions>
        <router-link v-if="user" :to="{ name: 'userProfile', params: { id: user.profile } }" class="btn btn--secondary">
          <i class="mdi mdi-card-account-details-outline" aria-hidden="true"></i> Mój profil publiczny
        </router-link>
      </template>
    </PageHeader>

    <div class="page">
      <div class="container panel">
        <aside class="panel__side">
          <nav class="card menu" aria-label="Ustawienia konta">
            <span class="menu__label">Ustawienia konta</span>
            <router-link :to="{ name: 'UserEditChange' }" class="menu__item">
              <i class="mdi mdi-text-account" aria-hidden="true"></i>
              <span>Zmień opis profilu</span>
              <i class="mdi mdi-chevron-right menu__arrow" aria-hidden="true"></i>
            </router-link>
            <router-link :to="{ name: 'UserPassChange' }" class="menu__item">
              <i class="mdi mdi-lock-reset" aria-hidden="true"></i>
              <span>Zmień hasło</span>
              <i class="mdi mdi-chevron-right menu__arrow" aria-hidden="true"></i>
            </router-link>
            <span class="menu__item is-disabled" aria-disabled="true">
              <i class="mdi mdi-email-edit-outline" aria-hidden="true"></i>
              <span>Zmień e-mail</span>
              <span class="menu__soon">wkrótce</span>
            </span>
            <hr class="divider" />
            <button type="button" class="menu__item menu__item--danger" @click="logout">
              <i class="mdi mdi-logout" aria-hidden="true"></i>
              <span>Wyloguj</span>
            </button>
          </nav>
        </aside>

        <section class="card card--pad panel__main">
          <header class="panel__head">
            <h2>Opis profilu</h2>
            <router-link :to="{ name: 'UserEditChange' }" class="btn btn--ghost btn--sm">
              <i class="mdi mdi-pencil-outline" aria-hidden="true"></i> Edytuj
            </router-link>
          </header>
          <MarkdownView v-if="profile && profile.description" :content="profile.description" />
          <EmptyState v-else icon="text-account" title="Brak opisu" text="Napisz coś o sobie, aby inni mogli Cię lepiej poznać.">
            <router-link :to="{ name: 'UserEditChange' }" class="btn btn--sm">Dodaj opis</router-link>
          </EmptyState>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import PageHeader from '@/components/ui/PageHeader.vue';
import EmptyState from '@/components/ui/EmptyState.vue';
import MarkdownView from '@/components/MarkdownView.vue';

const store = useStore();
const user = computed(() => store.getters.user);
const profile = computed(() => store.getters.profile);

function logout() {
  store.dispatch('logout');
}
</script>

<style scoped>
.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.panel {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}

.menu {
  display: grid;
  gap: 2px;
  padding: 10px;
}

.menu__label {
  padding: 8px 12px 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

.menu .divider {
  margin: 6px 0;
}

.menu__item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text);
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  transition: background-color var(--t-fast);
}

.menu__item > .mdi:first-child {
  font-size: 20px;
  color: var(--text-muted);
}

.menu__item:hover:not(.is-disabled) {
  background: var(--surface);
}

.menu__arrow {
  margin-left: auto;
  color: var(--text-subtle);
}

.menu__item.is-disabled {
  color: var(--text-subtle);
  cursor: not-allowed;
}

.menu__soon {
  margin-left: auto;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  background: var(--surface-2);
  font-size: 12px;
}

.menu__item--danger,
.menu__item--danger > .mdi:first-child {
  color: var(--danger);
}

.panel__main {
  display: grid;
  gap: 20px;
}

.panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.panel__head h2 {
  font-size: 20px;
}

@media (max-width: 860px) {
  .panel {
    grid-template-columns: 1fr;
  }
}
</style>
