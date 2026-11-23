<template>
  <div class="stack">
    <section class="card panel-card">
      <header class="panel-card__head">
        <h2 class="panel-card__title">Dodaj tag</h2>
      </header>
      <form class="panel-card__body add" @submit.prevent="addTag">
        <TextField v-model="newTagName" icon="tag-plus-outline" placeholder="Nazwa nowego tagu" class="add__field" />
        <button type="submit" class="btn" :disabled="!newTagName.trim()">
          <i class="mdi mdi-plus" aria-hidden="true"></i> Dodaj
        </button>
      </form>
    </section>

    <section class="card panel-card">
      <header class="panel-card__head">
        <h2 class="panel-card__title">Wszystkie tagi</h2>
        <span class="muted">{{ tags.length }}</span>
      </header>
      <div class="panel-card__body">
        <div v-if="tags.length" class="tags">
          <span v-for="tag in tags" :key="tag.id" class="tag">
            <i class="mdi mdi-pound" aria-hidden="true"></i>{{ tag.name }}
            <button type="button" class="tag__remove" :aria-label="`Usuń tag ${tag.name}`" @click="toDelete = tag">
              <i class="mdi mdi-close"></i>
            </button>
          </span>
        </div>
        <EmptyState v-else icon="tag-off-outline" title="Brak tagów" text="Dodaj pierwszy tag powyżej." />
      </div>
    </section>

    <ConfirmationDialog
      v-if="toDelete"
      :text="`Czy na pewno chcesz usunąć tag ${toDelete.name}?`"
      @yes="deleteTag(toDelete.id)"
      @no="toDelete = null"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { TagsService } from '@/services/TagsService';
import TextField from '@/components/ui/TextField.vue';
import EmptyState from '@/components/ui/EmptyState.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';

const store = useStore();
const tagService = new TagsService();
const tags = ref<any[]>([]);
const newTagName = ref('');
const toDelete = ref<any>(null);

function getTags() {
  tagService
    .getAllTags()
    .then((res) => {
      tags.value = res.data;
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd przy pobieraniu tagów!');
    });
}

function addTag() {
  const name = newTagName.value.trim();
  if (!name) {
    return;
  }
  tagService
    .addTag(name)
    .then(() => {
      getTags();
      store.dispatch('successMessage', 'Tag został dodany');
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd przy dodawaniu tagu!');
    });
  newTagName.value = '';
}

function deleteTag(id: number) {
  toDelete.value = null;
  tagService
    .deleteTag(id)
    .then(() => {
      getTags();
      store.dispatch('successMessage', 'Tag został usunięty');
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd przy usuwaniu tagu!');
    });
}

onMounted(getTags);
</script>

<style scoped>
.stack {
  display: grid;
  gap: 20px;
}

.add {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.add__field {
  flex: 1;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 6px 5px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  background: #fff;
  font-size: 14px;
  font-weight: 500;
}

.tag > .mdi {
  color: var(--text-subtle);
  font-size: 14px;
}

.tag__remove {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  margin-left: 4px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--text-subtle);
}

.tag__remove:hover {
  background: var(--danger-soft);
  color: var(--danger);
}
</style>
