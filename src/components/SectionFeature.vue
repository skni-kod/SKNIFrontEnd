<template>
  <article class="feature" :class="{ 'feature--horizontal': horizontal }">
    <span class="feature__icon" aria-hidden="true"><i class="mdi" :class="`mdi-${icon}`"></i></span>
    <div class="feature__body">
      <h3 class="feature__title">
        <router-link :to="link" class="feature__link">{{ title }}</router-link>
      </h3>
      <p class="feature__text">{{ text }}</p>
      <span class="feature__more">Poznaj sekcję <i class="mdi mdi-arrow-right" aria-hidden="true"></i></span>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

defineProps<{ title: string; text: string; icon: string; link: RouteLocationRaw; horizontal?: boolean }>();
</script>

<style scoped>
.feature {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
  padding: 28px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xs);
  transition: box-shadow var(--t) var(--ease), transform var(--t) var(--ease), border-color var(--t);
}

.feature:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
  border-color: var(--primary-soft-2);
}

.feature__body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.feature--horizontal {
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  padding: 24px 28px;
}

.feature--horizontal .feature__icon {
  flex-shrink: 0;
  margin-bottom: 0;
}

@media (max-width: 520px) {
  .feature--horizontal {
    flex-direction: column;
    gap: 14px;
  }
}

.feature__icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin-bottom: 6px;
  border-radius: var(--radius);
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  color: #fff;
  font-size: 26px;
  box-shadow: 0 10px 20px -10px rgba(0, 114, 168, 0.7);
}

.feature__title {
  font-size: 19px;
  line-height: 1.35;
}

.feature__link {
  color: var(--text);
}

.feature__link::after {
  content: '';
  position: absolute;
  inset: 0;
}

.feature__text {
  color: var(--text-muted);
  font-size: 15px;
  line-height: 1.65;
}

.feature__more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: auto;
  padding-top: 6px;
  color: var(--primary);
  font-size: 14px;
  font-weight: 600;
}

.feature__more .mdi {
  transition: transform var(--t) var(--ease);
}

.feature:hover .feature__more .mdi {
  transform: translateX(3px);
}
</style>
