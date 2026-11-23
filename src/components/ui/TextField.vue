<template>
  <div class="field" :class="{ 'field--invalid': visibleError }">
    <label v-if="label" :for="id" class="field__label">
      {{ label }}<span v-if="required" class="req" aria-hidden="true">*</span>
    </label>
    <div class="field__control">
      <i v-if="icon" class="mdi" :class="iconClass(icon)" aria-hidden="true"></i>
      <textarea
        v-if="multiline"
        :id="id"
        v-model="model"
        class="input"
        :rows="rows"
        :placeholder="placeholder"
        :readonly="readonly"
        :aria-invalid="!!visibleError"
        @blur="touched = true"
      ></textarea>
      <input
        v-else
        :id="id"
        v-model="model"
        class="input"
        :type="inputType"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :readonly="readonly"
        :aria-invalid="!!visibleError"
        @focus="$emit('focus')"
        @blur="onBlur"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="btn btn--ghost btn--icon btn--sm field__suffix"
        :aria-label="reveal ? 'Ukryj hasło' : 'Pokaż hasło'"
        @click="reveal = !reveal"
      >
        <i class="mdi" :class="reveal ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"></i>
      </button>
      <slot name="suffix" />
    </div>
    <p v-if="visibleError" class="field__error">{{ visibleError }}</p>
    <p v-else-if="hint" class="field__hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { iconClass } from '@/utils/icons';
import { computed, ref, useId } from 'vue';

const props = withDefaults(
  defineProps<{
    label?: string;
    type?: string;
    icon?: string;
    hint?: string;
    placeholder?: string;
    error?: string;
    showError?: boolean;
    required?: boolean;
    readonly?: boolean;
    multiline?: boolean;
    rows?: number;
    autocomplete?: string;
    autofocus?: boolean;
  }>(),
  { type: 'text', rows: 5 },
);

const emit = defineEmits<{ focus: []; blur: [] }>();
const model = defineModel<string | number | null>();

const id = useId();
const touched = ref(false);
const reveal = ref(false);

const inputType = computed(() => (props.type === 'password' && reveal.value ? 'text' : props.type));
const visibleError = computed(() => ((touched.value || props.showError) && props.error) || '');

function onBlur() {
  touched.value = true;
  emit('blur');
}
</script>
