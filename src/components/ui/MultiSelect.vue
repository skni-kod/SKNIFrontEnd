<template>
  <div ref="root" class="field" :class="{ 'field--invalid': visibleError }">
    <label v-if="label" :for="id" class="field__label">
      {{ label }}<span v-if="required" class="req" aria-hidden="true">*</span>
    </label>
    <div class="ms input" :class="{ 'is-open': open }" @click="focusInput">
      <span v-for="item in selectedItems" :key="String(item[itemValue])" class="chip chip--primary ms__chip">
        {{ item[itemText] }}
        <button type="button" class="ms__remove" :aria-label="`Usuń ${item[itemText]}`" @click.stop="remove(item)">
          <i class="mdi mdi-close"></i>
        </button>
      </span>
      <input
        :id="id"
        ref="input"
        v-model="query"
        class="ms__input"
        type="text"
        role="combobox"
        :aria-expanded="open"
        :placeholder="selectedItems.length ? '' : placeholder"
        autocomplete="off"
        @focus="open = true"
        @keydown.down.prevent="move(1)"
        @keydown.up.prevent="move(-1)"
        @keydown.enter.prevent="pickActive"
        @keydown.esc="open = false"
        @keydown.backspace="onBackspace"
      />
      <i class="mdi mdi-chevron-down ms__caret" aria-hidden="true"></i>
    </div>
    <ul v-if="open" class="ms__menu" role="listbox">
      <li
        v-for="(item, i) in filtered"
        :key="String(item[itemValue])"
        role="option"
        class="ms__option"
        :class="{ 'is-active': i === active }"
        @mousedown.prevent="pick(item)"
        @mouseenter="active = i"
      >
        {{ item[itemText] }}
      </li>
      <li v-if="!filtered.length" class="ms__empty">Brak wyników</li>
    </ul>
    <p v-if="visibleError" class="field__error">{{ visibleError }}</p>
    <p v-else-if="hint" class="field__hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    label?: string;
    items: Record<string, any>[];
    itemText: string;
    itemValue?: string;
    multiple?: boolean;
    placeholder?: string;
    hint?: string;
    error?: string;
    showError?: boolean;
    required?: boolean;
  }>(),
  { itemValue: 'id', multiple: true, placeholder: 'Zacznij pisać, aby wyszukać' },
);

const model = defineModel<any>();

const id = useId();
const root = ref<HTMLElement>();
const input = ref<HTMLInputElement>();
const query = ref('');
const open = ref(false);
const active = ref(0);
const touched = ref(false);

const selectedValues = computed<any[]>(() => {
  if (props.multiple) {
    return Array.isArray(model.value) ? model.value : [];
  }
  return model.value === undefined || model.value === null ? [] : [model.value];
});

const selectedItems = computed(() =>
  selectedValues.value
    .map((v) => props.items.find((item) => item[props.itemValue] === v))
    .filter((item): item is Record<string, any> => !!item),
);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return props.items.filter(
    (item) =>
      !selectedValues.value.includes(item[props.itemValue]) &&
      (!q || String(item[props.itemText]).toLowerCase().includes(q)),
  );
});

const visibleError = computed(() => ((touched.value || props.showError) && props.error) || '');

watch(filtered, () => (active.value = 0));

function focusInput() {
  input.value?.focus();
}

function pick(item: Record<string, any>) {
  const value = item[props.itemValue];
  if (props.multiple) {
    model.value = [...selectedValues.value, value];
  } else {
    model.value = value;
    open.value = false;
  }
  query.value = '';
}

function pickActive() {
  const item = filtered.value[active.value];
  if (item) {
    pick(item);
  }
}

function remove(item: Record<string, any>) {
  const value = item[props.itemValue];
  model.value = props.multiple ? selectedValues.value.filter((v) => v !== value) : undefined;
}

function onBackspace() {
  if (!query.value && selectedItems.value.length) {
    remove(selectedItems.value[selectedItems.value.length - 1]);
  }
}

function move(step: number) {
  open.value = true;
  const count = filtered.value.length;
  if (count) {
    active.value = (active.value + step + count) % count;
  }
}

function onOutside(event: MouseEvent) {
  if (root.value && !root.value.contains(event.target as Node)) {
    if (open.value) {
      touched.value = true;
    }
    open.value = false;
  }
}

onMounted(() => document.addEventListener('mousedown', onOutside));
onBeforeUnmount(() => document.removeEventListener('mousedown', onOutside));
</script>

<style scoped>
.field {
  position: relative;
}

.ms {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  padding: 6px 36px 6px 8px;
  cursor: text;
  position: relative;
}

.ms.is-open {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-ring);
}

.ms__chip {
  padding-right: 4px;
}

.ms__remove {
  display: inline-grid;
  place-items: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: inherit;
}

.ms__remove:hover {
  background: rgba(0, 0, 0, 0.08);
}

.ms__input {
  flex: 1;
  min-width: 120px;
  padding: 4px 6px;
  border: 0;
  outline: none;
  background: transparent;
  font-size: 15px;
}

.ms__caret {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: var(--text-subtle);
}

.ms__menu {
  position: absolute;
  z-index: 30;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  max-height: 260px;
  overflow-y: auto;
  padding: 6px;
  list-style: none;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow);
}

.ms__option {
  padding: 8px 10px;
  border-radius: var(--radius-xs);
  font-size: 15px;
  cursor: pointer;
}

.ms__option.is-active {
  background: var(--primary-soft);
  color: var(--primary-strong);
}

.ms__empty {
  padding: 8px 10px;
  color: var(--text-subtle);
  font-size: 14px;
}
</style>
