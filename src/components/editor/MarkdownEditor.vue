<template>
  <div class="md-editor field" :class="{ 'field--invalid': visibleError }">
    <div class="md-editor__top">
      <span class="field__label">
        {{ label }}<span v-if="required" class="req" aria-hidden="true">*</span>
      </span>
      <div class="tabs" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          type="button"
          role="tab"
          class="tabs__btn"
          :class="{ 'is-active': mode === tab.value, 'tabs__btn--split': tab.value === 'split' }"
          :aria-selected="mode === tab.value"
          @click="mode = tab.value"
        >
          <i class="mdi" :class="tab.icon" aria-hidden="true"></i> {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="md-editor__panes" :class="`is-${mode}`">
      <textarea
        v-show="mode !== 'preview'"
        :id="id"
        v-model="markdown"
        class="input md-editor__input"
        :aria-label="label"
        placeholder="Treść w formacie Markdown…"
        @blur="touched = true"
      ></textarea>
      <div v-show="mode !== 'write'" class="md-editor__preview">
        <MarkdownView v-if="preview" :content="preview" />
        <p v-else class="md-editor__empty">Podgląd pojawi się tutaj, gdy zaczniesz pisać.</p>
      </div>
    </div>

    <p v-if="visibleError" class="field__error">{{ visibleError }}</p>

    <details class="md-help">
      <summary><i class="mdi mdi-help-circle-outline" aria-hidden="true"></i> Wskazówki dotyczące edytora</summary>
      <ul>
        <li>
          Edytor obsługuje Markdown, jego podstawy znajdziesz
          <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank" rel="noopener">tutaj</a>.
        </li>
        <li>Można używać również składni HTML (niebezpieczne elementy, np. skrypty, są usuwane).</li>
        <li>Do bloków kodu warto dodać nazwę języka, np. <code>```cpp</code>, aby włączyć podświetlanie składni.</li>
        <li>
          <strong>W artykułach, sekcjach i projektach dodaj znacznik <code>---readmore---</code></strong>: tekst przed nim
          trafi do podglądu na liście. Składnia Markdown w podglądzie zostanie usunięta.
        </li>
      </ul>
    </details>

    <div v-if="withImages" class="md-editor__images">
      <span class="field__label">Dodaj obrazek do treści</span>
      <MdImgAdd />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue';
import MarkdownView from '@/components/MarkdownView.vue';
import MdImgAdd from '@/components/editor/MdImgAdd.vue';

const props = withDefaults(
  defineProps<{ label?: string; required?: boolean; error?: string; showError?: boolean; withImages?: boolean }>(),
  { label: 'Treść', withImages: true },
);

const markdown = defineModel<string | undefined>({ default: '' });

type Mode = 'write' | 'split' | 'preview';
const tabs: { value: Mode; label: string; icon: string }[] = [
  { value: 'write', label: 'Edycja', icon: 'mdi-pencil-outline' },
  { value: 'split', label: 'Podział', icon: 'mdi-view-split-vertical' },
  { value: 'preview', label: 'Podgląd', icon: 'mdi-eye-outline' },
];

const id = useId();
const mode = ref<Mode>('split');
const touched = ref(false);
const preview = ref(markdown.value || '');
let timer: ReturnType<typeof setTimeout> | undefined;

watch(markdown, (value) => {
  clearTimeout(timer);
  timer = setTimeout(() => (preview.value = value || ''), 250);
});

const visibleError = computed(() => ((touched.value || props.showError) && props.error) || '');
</script>

<style scoped>
.md-editor {
  gap: 10px;
}

.md-editor__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.tabs {
  display: inline-flex;
  padding: 3px;
  border-radius: var(--radius-sm);
  background: var(--surface-2);
}

.tabs__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 600;
}

.tabs__btn.is-active {
  background: #fff;
  color: var(--text);
  box-shadow: var(--shadow-xs);
}

.md-editor__panes {
  display: grid;
  gap: 12px;
}

.md-editor__panes.is-split {
  grid-template-columns: 1fr 1fr;
}

.md-editor__input {
  min-height: 420px;
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.65;
}

.md-editor__preview {
  min-height: 420px;
  max-height: 720px;
  overflow: auto;
  padding: 16px 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
}

.md-editor__preview :deep(.prose) {
  font-size: 15px;
}

.md-editor__empty {
  color: var(--text-subtle);
  font-size: 14px;
}

.md-help {
  border-radius: var(--radius-sm);
  background: var(--primary-soft);
  color: var(--primary-strong);
  font-size: 14px;
}

.md-help summary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  font-weight: 600;
  cursor: pointer;
  list-style: none;
}

.md-help summary::-webkit-details-marker {
  display: none;
}

.md-help ul {
  display: grid;
  gap: 6px;
  padding: 0 16px 14px 36px;
  line-height: 1.55;
}

.md-help a {
  font-weight: 600;
  text-decoration: underline;
}

.md-help code {
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 1px 5px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.7);
}

.md-editor__images {
  display: grid;
  gap: 8px;
  margin-top: 6px;
}

@media (max-width: 860px) {
  .md-editor__panes.is-split {
    grid-template-columns: 1fr;
  }

  .tabs__btn--split {
    display: none;
  }
}
</style>
