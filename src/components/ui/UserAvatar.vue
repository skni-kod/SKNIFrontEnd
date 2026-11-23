<template>
  <span class="avatar" :style="{ width: `${size}px`, height: `${size}px`, fontSize: `${Math.round(size * 0.38)}px` }" aria-hidden="true">
    {{ initials }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{ firstName?: string; lastName?: string; username?: string; size?: number }>(),
  { size: 36 },
);

const initials = computed(() => {
  const parts = [props.firstName, props.lastName].filter((p): p is string => !!p && !!p.trim());
  if (parts.length) {
    return parts.map((p) => p.trim()[0]).join('').toUpperCase();
  }
  return (props.username || '?').slice(0, 2).toUpperCase();
});
</script>

<style scoped>
.avatar {
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--primary);
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1;
}
</style>
