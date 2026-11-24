<template>
  <LoadingState v-if="!form" />
  <form v-else class="stack" @submit.prevent="save">
    <section class="card panel-card">
      <header class="panel-card__head">
        <h2 class="panel-card__title">Rejestracja</h2>
      </header>
      <div class="panel-card__body">
        <ToggleSwitch v-model="form.registration_open">
          <strong>Rejestracja nowych kont jest otwarta</strong>
          <span class="muted">Po wyłączeniu formularz rejestracji znika ze strony, a API odrzuca nowe konta.</span>
        </ToggleSwitch>
      </div>
    </section>

    <section class="card panel-card">
      <header class="panel-card__head">
        <h2 class="panel-card__title">Ogłoszenie na stronie głównej</h2>
      </header>
      <div class="panel-card__body form">
        <ToggleSwitch v-model="form.announcement_enabled">
          <strong>Pokazuj ogłoszenie</strong>
          <span class="muted">Pasek nad sekcją powitalną, np. termin najbliższego spotkania.</span>
        </ToggleSwitch>
        <TextField
          v-model="form.announcement_text"
          label="Treść ogłoszenia"
          multiline
          :rows="3"
          placeholder="Spotkanie organizacyjne: 10 marca, 18:00, sala F803"
          :error="errors.announcement"
          :show-error="submitted"
        />
        <TextField
          v-model="form.announcement_expires_at"
          class="expiry"
          label="Ukryj automatycznie"
          type="datetime-local"
          icon="clock-outline"
          hint="Opcjonalnie: dzień i godzina, o której pasek zniknie ze strony."
          :error="errors.expiry"
          :show-error="submitted"
        >
          <template #suffix>
            <button
              v-if="form.announcement_expires_at"
              type="button"
              class="btn btn--ghost btn--sm"
              @click="form.announcement_expires_at = ''"
            >
              Bez terminu
            </button>
          </template>
        </TextField>
        <p v-if="expiredNotice" class="alert alert--warning">
          <i class="mdi mdi-clock-alert-outline" aria-hidden="true"></i>
          <span>Termin ogłoszenia minął, więc pasek nie jest już wyświetlany.</span>
        </p>
      </div>
    </section>

    <div class="actions">
      <button type="submit" class="btn" :disabled="saving">
        <i class="mdi" :class="saving ? 'mdi-loading mdi-spin' : 'mdi-content-save-outline'" aria-hidden="true"></i>
        Zapisz ustawienia
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { SiteSettingsService } from '@/services/SiteSettingsService';
import { useSiteSettings } from '@/composables/useSiteSettings';
import LoadingState from '@/components/ui/LoadingState.vue';
import TextField from '@/components/ui/TextField.vue';
import ToggleSwitch from '@/components/ui/ToggleSwitch.vue';
import { isoToLocalInput, localInputToIso } from '@/utils/datetime-local';

const store = useStore();
const { settings, set, reload } = useSiteSettings();
const form = ref<{
  registration_open: boolean;
  announcement_enabled: boolean;
  announcement_text: string;
  announcement_expires_at: string;
} | null>(null);
const saving = ref(false);
const submitted = ref(false);

reload();

watch(
  settings,
  (value) => {
    if (value && !form.value) {
      form.value = {
        registration_open: value.registration_open,
        announcement_enabled: value.announcement_enabled,
        announcement_text: value.announcement_text,
        announcement_expires_at: isoToLocalInput(value.announcement_expires_at),
      };
    }
  },
  { immediate: true },
);

const errors = computed(() => {
  const expiresIso = localInputToIso(form.value?.announcement_expires_at);
  return {
    announcement:
      form.value && form.value.announcement_enabled && !form.value.announcement_text.trim()
        ? 'Podaj treść ogłoszenia albo wyłącz jego wyświetlanie'
        : undefined,
    expiry:
      form.value && form.value.announcement_expires_at && expiresIso && new Date(expiresIso) <= new Date()
        ? 'Ta data już minęła'
        : undefined,
  };
});

const expiredNotice = computed(
  () =>
    !!settings.value &&
    settings.value.announcement_enabled &&
    !!settings.value.announcement_expires_at &&
    new Date(settings.value.announcement_expires_at) <= new Date(),
);

async function save() {
  submitted.value = true;
  if (!form.value || errors.value.announcement || errors.value.expiry) {
    return;
  }
  saving.value = true;
  try {
    set(
      await new SiteSettingsService().update({
        ...form.value,
        announcement_expires_at: localInputToIso(form.value.announcement_expires_at),
      }),
    );
    store.dispatch('successMessage', 'Ustawienia zostały zapisane');
  } catch {
    store.dispatch('errorMessage', 'Nie udało się zapisać ustawień!');
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

.actions {
  display: flex;
  justify-content: flex-end;
}

.expiry {
  max-width: 460px;
}
</style>
