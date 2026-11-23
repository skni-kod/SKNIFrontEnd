<template>
  <div class="auth">
    <div class="auth__card card">
      <div class="auth__head">
        <span class="auth__icon" aria-hidden="true"><i class="mdi" :class="`mdi-${icon}`"></i></span>
        <h1 class="auth__title">{{ title }}</h1>
        <p v-if="subtitle" class="auth__subtitle">{{ subtitle }}</p>
      </div>
      <slot />
    </div>
    <div v-if="$slots.footer" class="auth__footer"><slot name="footer" /></div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ title: string; subtitle?: string; icon?: string }>(), { icon: 'account-circle-outline' });
</script>

<style scoped>
.auth {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: clamp(32px, 6vw, 80px) var(--gutter);
  background:
    radial-gradient(ellipse 50% 60% at 50% 0%, rgba(0, 114, 168, 0.1), transparent 70%),
    var(--surface);
}

.auth__card {
  width: 100%;
  max-width: 460px;
  padding: clamp(24px, 4vw, 40px);
  box-shadow: var(--shadow);
}

.auth__card:has(.form-wide) {
  max-width: 560px;
}

.auth__head {
  display: grid;
  justify-items: center;
  gap: 8px;
  margin-bottom: 28px;
  text-align: center;
}

.auth__icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin-bottom: 8px;
  border-radius: var(--radius);
  background: var(--primary-soft);
  color: var(--primary);
  font-size: 26px;
}

.auth__title {
  font-size: 26px;
}

.auth__subtitle {
  color: var(--text-muted);
  font-size: 15px;
}

.auth__footer {
  color: var(--text-muted);
  font-size: 15px;
}

.auth__footer :deep(a) {
  font-weight: 600;
}
</style>
