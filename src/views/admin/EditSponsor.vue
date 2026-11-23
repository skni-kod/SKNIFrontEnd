<template>
  <div>
    <PageHeader
      eyebrow="Panel administratora"
      :title="modifing ? 'Edycja sponsora' : 'Nowy sponsor'"
      :back="{ to: { name: 'adminPanel', params: { module: 'sponsors' } }, label: 'Sponsorzy' }"
    />
    <LoadingState v-if="!sponsor" class="page" />
    <div v-else class="page">
      <div class="container container--narrow">
        <form class="card card--pad form" novalidate @submit.prevent="add">
          <TextField v-if="modifing" :model-value="String(sponsor.id)" label="ID" readonly />
          <TextField v-model="sponsor.name" label="Nazwa" required :error="errors.name" :show-error="submitted" />
          <TextField v-model="sponsor.url" label="Link" required icon="link-variant" :error="errors.url" :show-error="submitted" />
          <div v-if="sponsor.logo" class="current-logo">
            <span class="field__label">Obecne logo</span>
            <img :src="mediaUrl(sponsor.logo)" :alt="sponsor.name" />
          </div>
          <FileField v-model="image" :label="sponsor.logo ? 'Nowe logo (opcjonalnie)' : 'Logo'" />
          <div class="form-actions">
            <router-link :to="{ name: 'adminPanel', params: { module: 'sponsors' } }" class="btn btn--secondary">Anuluj</router-link>
            <button type="submit" class="btn" :disabled="loading">
              <i class="mdi" :class="loading ? 'mdi-loading mdi-spin' : 'mdi-content-save-outline'" aria-hidden="true"></i>
              {{ modifing ? 'Zaktualizuj' : 'Dodaj' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import type { AxiosResponse } from 'axios';
import { SponsorModel } from '@/models/SponsorModel';
import { SponsorsService } from '@/services/SponsorsService';
import PageHeader from '@/components/ui/PageHeader.vue';
import LoadingState from '@/components/ui/LoadingState.vue';
import TextField from '@/components/ui/TextField.vue';
import FileField from '@/components/ui/FileField.vue';
import { mediaUrl } from '@/utils/media';
import { isValid, required, validate } from '@/utils/validation';

const route = useRoute();
const router = useRouter();
const store = useStore();
const service = new SponsorsService();

const sponsor = ref<SponsorModel>();
const image = ref<File>();
const modifing = ref(false);
const loading = ref(false);
const submitted = ref(false);

const errors = computed(() => ({
  name: validate(sponsor.value?.name, [required]),
  url: validate(sponsor.value?.url, [required]),
}));

function add() {
  submitted.value = true;
  if (!sponsor.value || !isValid(errors.value)) {
    return;
  }
  loading.value = true;

  let response: Promise<AxiosResponse<any>>;
  if (modifing.value) {
    response = service.modifySponsor(sponsor.value, image.value);
  } else {
    response = service.addSponsor(sponsor.value.name, sponsor.value.url, image.value as File);
  }

  response
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        router.replace({ name: 'adminPanel', params: { module: 'sponsors' } });
        loading.value = false;
      }
    })
    .catch((error) => {
      if (error.response) {
        store.dispatch('errorMessage', 'Nie udało się dodać/zmodyfikować sponsora! Kod błędu: ' + error.response.status);
      } else {
        store.dispatch('errorMessage', 'Nie udało się dodać/zmodyfikować sponsora! ' + error.message);
      }
      loading.value = false;
    });
}

onMounted(() => {
  if (route.path.includes('add')) {
    sponsor.value = new SponsorModel();
  } else {
    service
      .getSponsor(String(route.params.id))
      .then((res) => {
        if (res.status === 200) {
          sponsor.value = res.data;
          modifing.value = true;
        }
      })
      .catch(() => {
        store.dispatch('errorMessage', 'Nie udało się pobrać danych!');
      });
  }
});
</script>

<style scoped>
.current-logo {
  display: grid;
  gap: 8px;
}

.current-logo img {
  max-width: 240px;
  max-height: 120px;
  object-fit: contain;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
