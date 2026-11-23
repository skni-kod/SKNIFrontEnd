<template>
  <div class="field">
    <span v-if="label" class="field__label">{{ label }}</span>
    <label class="drop" :class="{ 'is-over': over, 'has-file': !!model }" @dragover.prevent="over = true" @dragleave="over = false" @drop.prevent="onDrop">
      <input ref="input" class="sr-only" type="file" :accept="accept" @change="onChange" />
      <i class="mdi drop__icon" :class="model ? 'mdi-file-image-outline' : 'mdi-cloud-upload-outline'" aria-hidden="true"></i>
      <span v-if="model" class="drop__text">
        <strong>{{ model.name }}</strong>
        <span class="muted">{{ size }}</span>
      </span>
      <span v-else class="drop__text">
        <span><strong>Wybierz plik</strong> lub przeciągnij go tutaj</span>
        <span class="muted">{{ acceptLabel }}</span>
      </span>
      <button v-if="model" type="button" class="btn btn--ghost btn--icon btn--sm" aria-label="Usuń plik" @click.prevent="clear">
        <i class="mdi mdi-close"></i>
      </button>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<{ label?: string; accept?: string }>(), {
  accept: '.jpg, .jpeg, .png, .bmp',
});

const model = defineModel<File | undefined>();
const input = ref<HTMLInputElement>();
const over = ref(false);

const acceptLabel = computed(() => props.accept.replace(/\./g, '').toUpperCase());
const size = computed(() => (model.value ? `${(model.value.size / 1024 / 1024).toFixed(2)} MB` : ''));

function onChange(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  model.value = files && files[0] ? files[0] : undefined;
}

function onDrop(event: DragEvent) {
  over.value = false;
  const file = event.dataTransfer?.files?.[0];
  if (file) {
    model.value = file;
  }
}

function clear() {
  model.value = undefined;
  if (input.value) {
    input.value.value = '';
  }
}
</script>

<style scoped>
.drop {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border: 1.5px dashed var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface);
  cursor: pointer;
  transition: border-color var(--t-fast), background-color var(--t-fast);
}

.drop:hover,
.drop.is-over {
  border-color: var(--primary);
  background: var(--primary-soft);
}

.drop:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-ring);
}

.drop.has-file {
  border-style: solid;
  background: #fff;
}

.drop__icon {
  font-size: 28px;
  color: var(--primary);
}

.drop__text {
  flex: 1;
  display: grid;
  font-size: 14px;
  min-width: 0;
  overflow-wrap: anywhere;
}

.drop__text strong {
  color: var(--text);
  font-weight: 600;
}

.drop__text .muted {
  font-size: 13px;
}
</style>
