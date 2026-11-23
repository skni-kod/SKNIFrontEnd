<template>
  <LoadingState v-if="!entries" />
  <div v-else class="stack">
    <p class="muted">Wpisy wyświetlają się na stronie „O nas” w kolejności lat.</p>

    <section v-for="(entry, i) in entries" :key="entry.key" class="card panel-card">
      <header class="panel-card__head">
        <h2 class="panel-card__title">{{ entry.year || 'Nowy wpis' }}<span v-if="entry.title">: {{ entry.title }}</span></h2>
        <button type="button" class="btn btn--danger-ghost btn--sm" @click="entries.splice(i, 1)">
          <i class="mdi mdi-trash-can-outline" aria-hidden="true"></i> Usuń
        </button>
      </header>
      <div class="panel-card__body form">
        <div class="row">
          <TextField
            v-model.number="entry.year"
            label="Rok"
            type="number"
            required
            :error="validate(entry.year, [required, validYear])"
            :show-error="submitted"
          />
          <TextField
            v-model="entry.title"
            label="Tytuł"
            required
            :error="validate(entry.title, [required, maxLength(200)])"
            :show-error="submitted"
          />
        </div>
        <TextField v-model="entry.text" label="Opis" multiline :rows="4" />
      </div>
    </section>

    <div class="actions">
      <button type="button" class="btn btn--secondary" @click="add">
        <i class="mdi mdi-plus" aria-hidden="true"></i> Dodaj wpis
      </button>
      <button type="button" class="btn" :disabled="saving" @click="save">
        <i class="mdi" :class="saving ? 'mdi-loading mdi-spin' : 'mdi-content-save-outline'" aria-hidden="true"></i>
        Zapisz historię
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { SiteSettingsService } from '@/services/SiteSettingsService';
import { useSiteSettings } from '@/composables/useSiteSettings';
import LoadingState from '@/components/ui/LoadingState.vue';
import TextField from '@/components/ui/TextField.vue';
import { maxLength, required, validate, type Rule } from '@/utils/validation';

interface Entry {
  key: number;
  year: number | null;
  title: string;
  text: string;
}

const validYear: Rule = (v) => (Number.isInteger(v) && v >= 1900 && v <= 2100) || 'Podaj rok z zakresu 1900–2100';

const store = useStore();
const { settings, set, reload } = useSiteSettings();
const entries = ref<Entry[] | null>(null);
const saving = ref(false);
const submitted = ref(false);
let nextKey = 1;

reload();

watch(
  settings,
  (value) => {
    if (value && !entries.value) {
      entries.value = value.history.map((h) => ({ key: nextKey++, year: h.year, title: h.title, text: h.text }));
    }
  },
  { immediate: true },
);

function add() {
  entries.value?.push({ key: nextKey++, year: new Date().getFullYear(), title: '', text: '' });
}

async function save() {
  submitted.value = true;
  if (!entries.value) {
    return;
  }
  const invalid = entries.value.some((e) => validate(e.year, [required, validYear]) || validate(e.title, [required, maxLength(200)]));
  if (invalid) {
    store.dispatch('warningMessage', 'Uzupełnij rok i tytuł w każdym wpisie');
    return;
  }
  saving.value = true;
  try {
    const result = await new SiteSettingsService().update({
      history: entries.value.map((e) => ({ year: Number(e.year), title: e.title.trim(), text: e.text.trim() })),
    });
    set(result);
    entries.value = result.history.map((h) => ({ key: nextKey++, year: h.year, title: h.title, text: h.text }));
    store.dispatch('successMessage', 'Historia koła została zapisana');
  } catch {
    store.dispatch('errorMessage', 'Nie udało się zapisać historii!');
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
.stack {
  display: grid;
  gap: 20px;
}

.row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 16px;
}

.actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

@media (max-width: 560px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
