<template>
  <div>
    <PageHeader eyebrow="Panel administratora" :title="current ? current.title : 'Zarządzanie witryną'" :description="current ? current.description : 'Wybierz moduł, którym chcesz zarządzać.'" />
    <div class="page">
      <div class="container admin">
        <nav class="admin__nav card" aria-label="Moduły panelu">
          <router-link
            :to="{ name: 'adminPanel' }"
            class="admin__link"
            :class="{ 'is-active': !module }"
            exact-active-class=""
            active-class=""
          >
            <i class="mdi mdi-view-dashboard-outline" aria-hidden="true"></i>
            <span>Przegląd</span>
          </router-link>
          <router-link
            v-for="item in modules"
            :key="item.module"
            :to="{ name: 'adminPanel', params: { module: item.module } }"
            class="admin__link"
            :class="{ 'is-active': module === item.module }"
            active-class=""
            exact-active-class=""
          >
            <i class="mdi" :class="item.icon" aria-hidden="true"></i>
            <span>{{ item.title }}</span>
            <span v-if="item.soon" class="admin__soon">wkrótce</span>
          </router-link>
        </nav>

        <div class="admin__content">
          <component :is="current.component" v-if="current" />
          <div v-else class="overview">
            <router-link
              v-for="item in modules"
              :key="item.module"
              :to="{ name: 'adminPanel', params: { module: item.module } }"
              class="overview__card card"
            >
              <span class="overview__icon" aria-hidden="true"><i class="mdi" :class="item.icon"></i></span>
              <strong>{{ item.title }}</strong>
              <span class="muted">{{ item.description }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import PageHeader from '@/components/ui/PageHeader.vue';

const route = useRoute();

const modules = [
  {
    icon: 'mdi-lightning-bolt-outline',
    title: 'Szybkie akcje',
    module: 'anothers',
    description: 'Dodawanie artykułów, sekcji, projektów i sprzętu.',
    component: defineAsyncComponent(() => import('@/components/admin/Anothers.vue')),
  },
  {
    icon: 'mdi-tag-outline',
    title: 'Tagi',
    module: 'tags',
    description: 'Tagi przypisywane do artykułów.',
    component: defineAsyncComponent(() => import('@/components/admin/Tags.vue')),
  },
  {
    icon: 'mdi-handshake-outline',
    title: 'Sponsorzy',
    module: 'sponsors',
    description: 'Partnerzy wyświetlani na stronie głównej.',
    component: defineAsyncComponent(() => import('@/components/admin/SponsorsList.vue')),
  },
  {
    icon: 'mdi-link-variant',
    title: 'Linki w stopce',
    module: 'footerlinks',
    description: 'Media społecznościowe widoczne w stopce i menu.',
    component: defineAsyncComponent(() => import('@/components/admin/Footer.vue')),
  },
  {
    icon: 'mdi-cog-outline',
    title: 'Ustawienia witryny',
    module: 'settings',
    description: 'Moduł w przygotowaniu.',
    soon: true,
    component: defineAsyncComponent(() => import('@/components/admin/Placeholder.vue')),
  },
  {
    icon: 'mdi-account-group-outline',
    title: 'Użytkownicy',
    module: 'users',
    description: 'Moduł w przygotowaniu.',
    soon: true,
    component: defineAsyncComponent(() => import('@/components/admin/Placeholder.vue')),
  },
  {
    icon: 'mdi-dolly',
    title: 'Wypożyczenia',
    module: 'rentals',
    description: 'Moduł w przygotowaniu.',
    soon: true,
    component: defineAsyncComponent(() => import('@/components/admin/Placeholder.vue')),
  },
  {
    icon: 'mdi-book-open-page-variant-outline',
    title: 'Historia koła',
    module: 'history',
    description: 'Moduł w przygotowaniu.',
    soon: true,
    component: defineAsyncComponent(() => import('@/components/admin/Placeholder.vue')),
  },
];

const module = computed(() => route.params.module as string | undefined);
const current = computed(() => modules.find((m) => m.module === module.value));
</script>

<style scoped>
.admin {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}

.admin__nav {
  position: sticky;
  top: calc(var(--header-h) + 24px);
  display: grid;
  gap: 2px;
  padding: 8px;
}

.admin__link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 500;
  transition: background-color var(--t-fast), color var(--t-fast);
}

.admin__link .mdi {
  font-size: 19px;
}

.admin__link:hover {
  background: var(--surface);
  color: var(--text);
}

.admin__link.is-active {
  background: var(--primary-soft);
  color: var(--primary-strong);
  font-weight: 600;
}

.admin__soon {
  margin-left: auto;
  padding: 1px 7px;
  border-radius: var(--radius-pill);
  background: var(--surface-2);
  color: var(--text-subtle);
  font-size: 11px;
  font-weight: 500;
}

.overview {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.overview__card {
  display: grid;
  gap: 6px;
  align-content: start;
  padding: 20px;
  color: var(--text);
  font-size: 14px;
  transition: border-color var(--t-fast), box-shadow var(--t-fast), transform var(--t) var(--ease);
}

.overview__card strong {
  font-size: 16px;
}

.overview__card:hover {
  border-color: var(--primary-soft-2);
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.overview__icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  margin-bottom: 8px;
  border-radius: var(--radius-sm);
  background: var(--primary-soft);
  color: var(--primary);
  font-size: 21px;
}

@media (max-width: 900px) {
  .admin {
    grid-template-columns: 1fr;
  }

  .admin__nav {
    position: static;
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .admin__link {
    flex-shrink: 0;
  }

  .admin__soon {
    display: none;
  }
}
</style>
