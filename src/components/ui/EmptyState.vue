<template>
  <div class="empty">
    <span class="empty__icon" aria-hidden="true"><i class="mdi" :class="`mdi-${icon}`"></i></span>
    <h3 class="empty__title">{{ title }}</h3>
    <p v-if="text" class="empty__text">{{ text }}</p>
    <div v-if="$slots.default" class="empty__actions"><slot /></div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ title: string; text?: string; icon?: string }>(), { icon: 'inbox-outline' });
</script>

<style scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  padding: clamp(40px, 6vw, 64px) 24px;
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.empty__icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin-bottom: 6px;
  border-radius: 50%;
  background: #fff;
  box-shadow: var(--shadow-sm);
  color: var(--primary);
  font-size: 26px;
}

.empty__title {
  font-size: 18px;
}

.empty__text {
  max-width: 420px;
  color: var(--text-muted);
  font-size: 15px;
}

.empty__actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
