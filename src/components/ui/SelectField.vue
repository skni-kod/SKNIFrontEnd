<template>
  <div class="field" :class="{ 'field--invalid': visibleError }">
    <label v-if="label" :for="id" class="field__label">
      {{ label }}<span v-if="required" class="req" aria-hidden="true">*</span>
    </label>
    <div class="field__control">
      <select :id="id" v-model="model" class="input" @blur="touched = true">
        <option v-if="placeholder" :value="undefined" disabled>{{ placeholder }}</option>
        <option v-for="option in options" :key="String(option.value)" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
    <p v-if="visibleError" class="field__error">{{ visibleError }}</p>
    <p v-else-if="hint" class="field__hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId } from 'vue';

const props = defineProps<{
  label?: string;
  options: { value: any; label: string }[];
  placeholder?: string;
  hint?: string;
  error?: string;
  showError?: boolean;
  required?: boolean;
}>();

const model = defineModel<any>();
const id = useId();
const touched = ref(false);
const visibleError = computed(() => ((touched.value || props.showError) && props.error) || '');
</script>
