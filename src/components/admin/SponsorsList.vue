<template>
  <section class="card panel-card">
    <header class="panel-card__head">
      <h2 class="panel-card__title">Sponsorzy</h2>
      <router-link :to="{ name: 'sponsorsAdd' }" class="btn btn--sm">
        <i class="mdi mdi-plus" aria-hidden="true"></i> Dodaj sponsora
      </router-link>
    </header>
    <div v-if="sponsors.length" class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Nazwa</th>
            <th>Strona</th>
            <th class="cell-actions"><span class="sr-only">Akcje</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sponsors" :key="item.id">
            <td><img :src="mediaUrl(item.logo)" :alt="item.name" class="logo" /></td>
            <td><strong>{{ item.name }}</strong></td>
            <td>
              <a :href="item.url" target="_blank" rel="noopener" class="url">{{ item.url }}</a>
            </td>
            <td class="cell-actions">
              <router-link
                :to="{ name: 'sponsorsEdit', params: { id: item.id } }"
                class="btn btn--ghost btn--icon btn--sm"
                aria-label="Edytuj"
              >
                <i class="mdi mdi-pencil-outline"></i>
              </router-link>
              <button type="button" class="btn btn--danger-ghost btn--icon btn--sm" aria-label="Usuń" @click="selected = item">
                <i class="mdi mdi-trash-can-outline"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="panel-card__body">
      <EmptyState icon="handshake-outline" title="Brak sponsorów" text="Dodaj pierwszego partnera koła." />
    </div>

    <ConfirmationDialog
      v-if="selected !== null"
      :text="`Czy na pewno chcesz usunąć ${selected.name}?`"
      @yes="deleteSponsor(selected)"
      @no="selected = null"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import type { SponsorModel } from '@/models/SponsorModel';
import { SponsorsService } from '@/services/SponsorsService';
import EmptyState from '@/components/ui/EmptyState.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import { mediaUrl } from '@/utils/media';

const store = useStore();
const sponsorsService = new SponsorsService();
const sponsors = ref<SponsorModel[]>([]);
const selected = ref<SponsorModel | null>(null);

async function getSponsors() {
  try {
    const response = await sponsorsService.getSponsors();
    if (response.status === 200) {
      sponsors.value = response.data;
    }
  } catch (error: any) {
    if (error.response) {
      store.dispatch('errorMessage', 'Nie udało się pobrać listy sponsorów! Kod: ' + error.response.status);
    } else {
      store.dispatch('errorMessage', 'Nie udało się pobrać listy sponsorów! ' + error.message);
    }
  }
}

async function deleteSponsor(sponsor: SponsorModel) {
  await sponsorsService.deleteSponsor(sponsor);
  selected.value = null;
  getSponsors();
}

onMounted(getSponsors);
</script>

<style scoped>
.logo {
  width: 72px;
  height: 40px;
  object-fit: contain;
}

.url {
  display: inline-block;
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
</style>
