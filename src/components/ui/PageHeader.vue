<template>
  <header class="page-header">
    <div class="container" :class="{ 'container--narrow': narrow }">
      <router-link v-if="back" :to="back.to" class="page-header__back">
        <i class="mdi mdi-arrow-left" aria-hidden="true"></i>
        {{ back.label }}
      </router-link>
      <div class="page-header__row">
        <div class="page-header__text">
          <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
          <h1 class="page-header__title">
            <slot name="title">{{ title }}</slot>
          </h1>
          <p v-if="description" class="page-header__description">{{ description }}</p>
          <div v-if="$slots.meta" class="page-header__meta"><slot name="meta" /></div>
        </div>
        <div v-if="$slots.actions" class="page-header__actions"><slot name="actions" /></div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
  title?: string;
  eyebrow?: string;
  description?: string;
  narrow?: boolean;
  back?: { to: RouteLocationRaw; label: string };
}>();
</script>

<style scoped>
.page-header {
  position: relative;
  padding-block: clamp(36px, 5vw, 64px) clamp(28px, 4vw, 48px);
  background:
    radial-gradient(ellipse 60% 120% at 100% 0%, rgba(56, 189, 248, 0.12), transparent 60%),
    linear-gradient(180deg, var(--surface) 0%, #fff 100%);
  border-bottom: 1px solid var(--border);
}

.page-header__back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
  transition: color var(--t-fast);
}

.page-header__back:hover {
  color: var(--primary);
}

.page-header__row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.page-header__text {
  display: grid;
  gap: 12px;
  max-width: 760px;
  min-width: 0;
}

.page-header__title {
  font-size: clamp(30px, 4vw, 44px);
  line-height: 1.15;
  overflow-wrap: anywhere;
}

.page-header__description {
  font-size: clamp(16px, 1.3vw, 18px);
  color: var(--text-muted);
  line-height: 1.65;
}

.page-header__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 20px;
  margin-top: 4px;
  font-size: 14px;
  color: var(--text-muted);
}

.page-header__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
