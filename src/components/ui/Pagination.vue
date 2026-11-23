<template>
  <nav v-if="length > 1" class="pagination" aria-label="Paginacja">
    <button type="button" class="pg pg--nav" :disabled="modelValue <= 1" @click="go(modelValue - 1)">
      <i class="mdi mdi-chevron-left" aria-hidden="true"></i>
      <span class="pg__label">Poprzednia</span>
    </button>
    <template v-for="item in items" :key="String(item.key)">
      <span v-if="item.page === null" class="pg pg--gap">…</span>
      <button
        v-else
        type="button"
        class="pg"
        :class="{ 'is-current': item.page === modelValue }"
        :aria-current="item.page === modelValue ? 'page' : undefined"
        @click="go(item.page)"
      >
        {{ item.page }}
      </button>
    </template>
    <button type="button" class="pg pg--nav" :disabled="modelValue >= length" @click="go(modelValue + 1)">
      <span class="pg__label">Następna</span>
      <i class="mdi mdi-chevron-right" aria-hidden="true"></i>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ modelValue: number; length: number }>();
const emit = defineEmits<{ 'update:modelValue': [page: number] }>();

const items = computed(() => {
  const { modelValue: current, length } = props;
  const pages = new Set<number>([1, length, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= length).sort((a, b) => a - b);
  const result: { key: string | number; page: number | null }[] = [];
  sorted.forEach((page, i) => {
    if (i > 0 && page - sorted[i - 1] > 1) {
      result.push({ key: `gap-${page}`, page: null });
    }
    result.push({ key: page, page });
  });
  return result;
});

function go(page: number) {
  if (page >= 1 && page <= props.length && page !== props.modelValue) {
    emit('update:modelValue', page);
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.pg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: #fff;
  color: var(--text);
  font-size: 14px;
  font-weight: 600;
  transition: background-color var(--t-fast), border-color var(--t-fast), color var(--t-fast);
}

.pg:hover:not(:disabled):not(.pg--gap) {
  border-color: var(--border-strong);
  background: var(--surface);
}

.pg.is-current {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

.pg:disabled {
  opacity: 0.45;
  cursor: default;
}

.pg--gap {
  border-color: transparent;
  background: transparent;
  color: var(--text-subtle);
}

.pg .mdi {
  font-size: 18px;
}

@media (max-width: 560px) {
  .pg__label {
    display: none;
  }

  .pg--nav {
    padding: 0;
  }
}
</style>
