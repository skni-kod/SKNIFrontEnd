<template>
  <div class="pw">
    <div class="pw__meter" aria-hidden="true">
      <span v-for="n in 5" :key="n" :class="{ 'is-on': n <= score }" :data-score="score"></span>
    </div>
    <ul class="pw__list">
      <li v-for="check in checks" :key="check.label" :class="{ 'is-ok': check.ok }">
        <i class="mdi" :class="check.ok ? 'mdi-check-circle' : 'mdi-circle-outline'" aria-hidden="true"></i>
        {{ check.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';

const props = defineProps<{ password: string }>();
const emit = defineEmits<{ validation: [value: true | string] }>();

const special = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

const checks = computed(() => {
  const p = props.password || '';
  return [
    { label: 'Co najmniej 8 znaków', ok: p.length >= 8 },
    { label: 'Mała litera', ok: /[a-z]/.test(p) },
    { label: 'Duża litera', ok: /[A-Z]/.test(p) },
    { label: 'Cyfra', ok: /\d/.test(p) },
    { label: 'Znak specjalny', ok: special.test(p) },
  ];
});

const score = computed(() => checks.value.filter((c) => c.ok).length);
const isPasswordValid = computed<true | string>(() =>
  checks.value.every((c) => c.ok) ? true : 'Hasło nie spełnia wymagań',
);

watch(isPasswordValid, (value) => emit('validation', value), { immediate: true });
</script>

<style scoped>
.pw {
  display: grid;
  gap: 12px;
  padding: 14px 16px;
  border-radius: var(--radius-sm);
  background: var(--surface);
}

.pw__meter {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
}

.pw__meter span {
  height: 4px;
  border-radius: 2px;
  background: var(--border);
  transition: background-color var(--t);
}

.pw__meter span.is-on {
  background: var(--warning);
}

.pw__meter span.is-on[data-score='5'] {
  background: var(--success);
}

.pw__list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 16px;
  list-style: none;
  font-size: 13px;
  color: var(--text-muted);
}

.pw__list li {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pw__list .mdi {
  font-size: 16px;
  color: var(--text-subtle);
}

.pw__list li.is-ok {
  color: var(--text);
}

.pw__list li.is-ok .mdi {
  color: var(--success);
}
</style>
