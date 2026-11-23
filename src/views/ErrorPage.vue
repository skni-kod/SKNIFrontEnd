<template>
  <div class="error">
    <div class="container error__inner">
      <img :src="image" alt="" class="error__image" />
      <span class="error__code">Błąd {{ errorNum }}</span>
      <h1 class="error__title">{{ errorNum === 403 ? 'Brak dostępu' : 'Strona nie istnieje' }}</h1>
      <p class="error__text">
        {{
          errorNum === 403
            ? 'Nie masz uprawnień do wyświetlenia tej strony. Zaloguj się na odpowiednie konto lub wróć na stronę główną.'
            : 'Strona, której szukasz, została przeniesiona, usunięta lub nigdy nie istniała.'
        }}
      </p>
      <div class="error__actions">
        <router-link :to="{ name: 'home' }" class="btn">
          <i class="mdi mdi-home-outline" aria-hidden="true"></i> Strona główna
        </router-link>
        <button v-if="canGoBack" type="button" class="btn btn--secondary" @click="router.back()">
          <i class="mdi mdi-arrow-left" aria-hidden="true"></i> Wróć
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import lama403 from '@/assets/lama_403.png';
import lama404 from '@/assets/lama_404.png';

const route = useRoute();
const router = useRouter();
const errorNum = computed(() => (route.name === 'error403' ? 403 : 404));
const image = computed(() => (errorNum.value === 403 ? lama403 : lama404));
const canGoBack = window.history.length > 1;
</script>

<style scoped>
.error {
  flex: 1;
  display: grid;
  place-items: center;
  padding-block: clamp(40px, 8vw, 96px);
  background: var(--surface);
}

.error__inner {
  display: grid;
  justify-items: center;
  gap: 14px;
  text-align: center;
}

.error__image {
  width: min(420px, 80vw);
  height: auto;
  margin-bottom: 8px;
}

.error__code {
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  background: var(--primary-soft);
  color: var(--primary-strong);
  font-size: 13px;
  font-weight: 600;
}

.error__title {
  font-size: clamp(28px, 4vw, 40px);
}

.error__text {
  max-width: 520px;
  color: var(--text-muted);
}

.error__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 12px;
}
</style>
