<template>
  <label class="switch" :class="{ 'is-disabled': disabled }">
    <input v-model="model" type="checkbox" class="sr-only" :disabled="disabled" />
    <span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span>
    <span v-if="label || $slots.default" class="switch__text">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
defineProps<{ label?: string; disabled?: boolean }>();
const model = defineModel<boolean>();
</script>

<style scoped>
.switch {
  display: inline-flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
}

.switch.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.switch__track {
  position: relative;
  flex-shrink: 0;
  width: 40px;
  height: 24px;
  margin-top: 1px;
  border-radius: var(--radius-pill);
  background: var(--border-strong);
  transition: background-color var(--t-fast);
}

.switch__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: var(--shadow-xs);
  transition: transform var(--t-fast) var(--ease);
}

input:checked + .switch__track {
  background: var(--primary);
}

input:checked + .switch__track .switch__thumb {
  transform: translateX(16px);
}

input:focus-visible + .switch__track {
  box-shadow: 0 0 0 3px var(--primary-ring);
}

.switch__text {
  display: grid;
  gap: 2px;
  font-size: 15px;
}
</style>
