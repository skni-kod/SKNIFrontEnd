<template>
  <div class="stack">
    <section class="card panel-card">
      <header class="panel-card__head">
        <h2 class="panel-card__title">Linki</h2>
        <button v-if="!formOpen" type="button" class="btn btn--sm" @click="openNew">
          <i class="mdi mdi-plus" aria-hidden="true"></i> Dodaj link
        </button>
      </header>
      <div v-if="links.length" class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>Ikona</th>
              <th>Tytuł</th>
              <th>Adres</th>
              <th class="cell-actions"><span class="sr-only">Akcje</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="el in links" :key="el.id">
              <td><i class="mdi link-icon" :class="`mdi-${el.icon}`" aria-hidden="true"></i></td>
              <td><strong>{{ el.title }}</strong></td>
              <td><a :href="el.link" target="_blank" rel="noopener" class="url">{{ el.link }}</a></td>
              <td class="cell-actions">
                <button type="button" class="btn btn--ghost btn--icon btn--sm" aria-label="Edytuj" @click="showEditForm(el)">
                  <i class="mdi mdi-pencil-outline"></i>
                </button>
                <button type="button" class="btn btn--danger-ghost btn--icon btn--sm" aria-label="Usuń" @click="toDelete = el">
                  <i class="mdi mdi-trash-can-outline"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="panel-card__body">
        <EmptyState icon="link-variant-off" title="Brak linków" text="Dodaj linki do mediów społecznościowych koła." />
      </div>
    </section>

    <section v-if="formOpen" class="card panel-card">
      <header class="panel-card__head">
        <h2 class="panel-card__title">{{ edit ? 'Edycja linku' : 'Nowy link' }}</h2>
      </header>
      <form class="panel-card__body form" novalidate @submit.prevent="edit ? editLink() : addLink()">
        <div class="form-row">
          <TextField v-model="linkForm.title" label="Tytuł" required icon="format-title" :error="errors.title" :show-error="submitted" />
          <TextField v-model="linkForm.link" label="Adres URL" required icon="link-variant" :error="errors.link" :show-error="submitted" />
        </div>
        <div class="form-row">
          <TextField
            v-model="linkForm.icon"
            label="Ikona"
            required
            :icon="linkForm.icon || 'star-circle-outline'"
            hint="Nazwa z materialdesignicons.com, np. facebook"
            :error="errors.icon"
            :show-error="submitted"
          />
          <TextField v-model="linkForm.color" label="Kolor" required icon="palette-outline" :error="errors.color" :show-error="submitted" />
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn--secondary" @click="cancelEdit">Anuluj</button>
          <button type="submit" class="btn">
            <i class="mdi" :class="edit ? 'mdi-content-save-outline' : 'mdi-plus'" aria-hidden="true"></i>
            {{ edit ? 'Zapisz link' : 'Dodaj link' }}
          </button>
        </div>
      </form>
    </section>

    <ConfirmationDialog
      v-if="toDelete"
      :text="`Czy na pewno chcesz usunąć link ${toDelete.title}?`"
      @yes="deleteLink(toDelete.id)"
      @no="toDelete = null"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { FooterService } from '@/services/FooterService';
import TextField from '@/components/ui/TextField.vue';
import EmptyState from '@/components/ui/EmptyState.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import { iconName, isValid, maxLength, minLength, required, validLink, validate } from '@/utils/validation';

const store = useStore();
const footerService = new FooterService();
const links = ref<any[]>([]);
const linkForm = ref<any>({});
const addNew = ref(false);
const edit = ref(false);
const submitted = ref(false);
const toDelete = ref<any>(null);

const formOpen = computed(() => addNew.value || edit.value);

const errors = computed(() => ({
  title: validate(linkForm.value.title, [required, maxLength(128)]),
  link: validate(linkForm.value.link, [required, minLength(4), validLink]),
  icon: validate(linkForm.value.icon, [required, maxLength(64), iconName]),
  color: validate(linkForm.value.color, [required, maxLength(64)]),
}));

function getLinks() {
  footerService
    .getLinks()
    .then((res) => {
      links.value = res;
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd przy pobieraniu linków!');
    });
}

function openNew() {
  linkForm.value = { color: 'primary' };
  submitted.value = false;
  edit.value = false;
  addNew.value = true;
}

function cancelEdit() {
  addNew.value = false;
  edit.value = false;
  linkForm.value = {};
}

function addLink() {
  submitted.value = true;
  if (!isValid(errors.value)) {
    return;
  }
  footerService
    .addLink(linkForm.value)
    .then(() => {
      getLinks();
      store.dispatch('successMessage', 'Link został dodany');
      linkForm.value = {};
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd przy dodawaniu linku!');
    });
  addNew.value = false;
}

function showEditForm(data: any) {
  submitted.value = false;
  addNew.value = false;
  edit.value = true;
  linkForm.value = { ...data };
}

function editLink() {
  submitted.value = true;
  if (!isValid(errors.value)) {
    return;
  }
  footerService
    .editLink(linkForm.value.id, linkForm.value)
    .then(() => {
      getLinks();
      store.dispatch('successMessage', 'Link został zmieniony');
      store.dispatch('infoMessage', 'Zmiany będą widoczne po odświeżeniu strony');
      linkForm.value = {};
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd przy edycji linku!');
    });
  edit.value = false;
}

function deleteLink(id: number) {
  toDelete.value = null;
  footerService
    .deleteLink(id)
    .then(() => {
      getLinks();
      store.dispatch('successMessage', 'Link został usunięty');
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd przy usuwaniu linku!');
    });
}

onMounted(getLinks);
</script>

<style scoped>
.stack {
  display: grid;
  gap: 20px;
}

.link-icon {
  font-size: 22px;
  color: var(--primary);
}

.url {
  display: inline-block;
  max-width: 320px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
