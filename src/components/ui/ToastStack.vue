<template>
  <div class="toasts" aria-live="polite">
    <TransitionGroup name="toast">
      <div v-for="toast in toasts" :key="toast.id" class="toast" :class="`toast--${toast.color}`" role="status">
        <i class="mdi toast__icon" :class="iconFor(toast.color)" aria-hidden="true"></i>
        <p class="toast__message">{{ toast.message }}</p>
        <button type="button" class="toast__close" aria-label="Zamknij" @click="dismiss(toast.ref)">
          <i class="mdi mdi-close"></i>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useStore } from 'vuex';

interface Snackbar {
  message: string;
  color?: string;
}

const TIMEOUT = 5000;
const store = useStore();
const ids = new WeakMap<object, number>();
let nextId = 1;

const snackbars = computed<Snackbar[]>(() => store.getters.snackbars);

const toasts = computed(() =>
  snackbars.value.map((ref) => {
    if (!ids.has(ref)) {
      ids.set(ref, nextId++);
    }
    return { id: ids.get(ref)!, ref, message: ref.message, color: ref.color || 'info' };
  }),
);

function dismiss(ref: Snackbar) {
  store.dispatch(
    'setSnackbars',
    snackbars.value.filter((s) => s !== ref),
  );
}

const scheduled = new WeakSet<object>();
watch(
  () => snackbars.value.slice(),
  (list) => {
    for (const ref of list) {
      if (!scheduled.has(ref)) {
        scheduled.add(ref);
        setTimeout(() => dismiss(ref), TIMEOUT);
      }
    }
  },
  { immediate: true, deep: false },
);

function iconFor(color: string) {
  return (
    {
      success: 'mdi-check-circle',
      error: 'mdi-alert-circle',
      warning: 'mdi-alert',
      info: 'mdi-information',
    }[color] || 'mdi-information'
  );
}
</script>

<style scoped>
.toasts {
  position: fixed;
  z-index: 300;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: min(440px, calc(100vw - 32px));
  pointer-events: none;
}

.toast {
  --toast-accent: var(--primary);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 14px 14px 16px;
  border-radius: var(--radius);
  background: var(--navy-900);
  color: var(--text-inverse);
  box-shadow: var(--shadow-lg);
  pointer-events: auto;
  border-left: 4px solid var(--toast-accent);
}

.toast--success {
  --toast-accent: #22c55e;
}

.toast--error {
  --toast-accent: #f87171;
}

.toast--warning {
  --toast-accent: #fbbf24;
}

.toast--info {
  --toast-accent: var(--sky);
}

.toast__icon {
  font-size: 20px;
  line-height: 1.2;
  color: var(--toast-accent);
}

.toast__message {
  flex: 1;
  font-size: 14px;
  line-height: 1.5;
  padding-top: 1px;
}

.toast__close {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: var(--radius-xs);
  background: transparent;
  color: var(--text-inverse-muted);
}

.toast__close:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity var(--t) var(--ease), transform var(--t) var(--ease);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
