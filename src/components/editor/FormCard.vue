<template>
  <section class="form-card card">
    <header v-if="title" class="form-card__head">
      <h2 class="form-card__title">{{ title }}</h2>
      <p v-if="description" class="form-card__desc">{{ description }}</p>
    </header>
    <div class="form-card__body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ title?: string; description?: string }>();
</script>

<style scoped>
.form-card {
  overflow: visible;
}

.form-card__head {
  display: grid;
  gap: 4px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
}

.form-card__title {
  font-size: 17px;
}

.form-card__desc {
  color: var(--text-muted);
  font-size: 14px;
}

.form-card__body {
  display: grid;
  gap: 20px;
  padding: 24px;
}
</style>
