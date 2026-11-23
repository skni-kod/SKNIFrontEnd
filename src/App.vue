<template>
  <div class="app">
    <a href="#main" class="skip-link">Przejdź do treści</a>
    <AppHeader />
    <main id="main" class="main">
      <router-view :key="$route.fullPath" />
    </main>
    <AppFooter />
    <ToastStack />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import ToastStack from '@/components/ui/ToastStack.vue';

const store = useStore();

onMounted(() => {
  store.dispatch('autoLogin');
});
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.skip-link {
  position: absolute;
  left: 16px;
  top: -60px;
  z-index: 500;
  padding: 10px 16px;
  border-radius: var(--radius-sm);
  background: var(--navy-900);
  color: #fff;
  font-weight: 600;
}

.skip-link:focus {
  top: 12px;
}
</style>
