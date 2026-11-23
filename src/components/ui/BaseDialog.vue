<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="open" class="overlay" @mousedown.self="!persistent && close()">
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          :style="{ maxWidth: `${maxWidth}px` }"
        >
          <header v-if="title" class="dialog__header">
            <h2 :id="titleId" class="dialog__title">{{ title }}</h2>
            <button type="button" class="btn btn--ghost btn--icon btn--sm" aria-label="Zamknij" @click="close">
              <i class="mdi mdi-close"></i>
            </button>
          </header>
          <div class="dialog__body">
            <slot />
          </div>
          <footer v-if="$slots.actions" class="dialog__actions">
            <slot name="actions" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, useId } from 'vue';

const props = withDefaults(
  defineProps<{ open?: boolean; title?: string; maxWidth?: number; persistent?: boolean }>(),
  { open: true, maxWidth: 440 },
);
const emit = defineEmits<{ close: [] }>();
const titleId = useId();

function close() {
  emit('close');
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.open && !props.persistent) {
    close();
  }
}

onMounted(() => document.addEventListener('keydown', onKey));
onBeforeUnmount(() => document.removeEventListener('keydown', onKey));
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(7, 18, 38, 0.55);
  backdrop-filter: blur(3px);
}

.dialog {
  width: 100%;
  max-height: calc(100vh - 32px);
  overflow: auto;
  background: #fff;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 20px 0 24px;
}

.dialog__title {
  font-size: 19px;
}

.dialog__body {
  padding: 12px 24px 4px;
  color: var(--text-muted);
}

.dialog__actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px 24px 24px;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity var(--t) var(--ease);
}

.dialog-enter-active .dialog,
.dialog-leave-active .dialog {
  transition: transform var(--t) var(--ease);
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from .dialog,
.dialog-leave-to .dialog {
  transform: translateY(8px) scale(0.98);
}
</style>
