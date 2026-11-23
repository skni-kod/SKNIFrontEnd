<template>
  <div>
    <PageHeader
      eyebrow="Panel administratora"
      :title="add ? 'Nowy sprzęt' : 'Edycja sprzętu'"
      :description="add || !hardware.serial_number ? undefined : `Numer seryjny: ${hardware.serial_number}`"
      :back="{ to: { name: 'hardwareList', params: { page: '1' } }, label: 'Cały sprzęt' }"
    />

    <LoadingState v-if="!loaded" class="page" />
    <div v-else class="page page--editor">
      <div class="container editor editor--single">
        <div class="editor__main">
          <FormCard title="Podstawowe informacje">
            <TextField v-model="hardware.name" label="Nazwa sprzętu" required :error="errors.name" :show-error="submitted" />
            <TextField v-model="hardware.serial_number" label="Numer seryjny" required :error="errors.serial" :show-error="submitted" />
          </FormCard>
          <FormCard title="Opis">
            <MarkdownEditor
              v-model="hardware.description"
              label="Treść opisu sprzętu"
              required
              :with-images="false"
              :error="errors.description"
              :show-error="submitted"
            />
          </FormCard>
        </div>
      </div>
    </div>

    <EditorActions
      v-if="loaded"
      :text="add ? 'Czy na pewno chcesz opuścić ekran dodawania nowego sprzętu bez zapisywania zmian?' : 'Czy na pewno chcesz wyjść z edycji sprzętu bez zapisywania zmian?'"
      :save-text="add ? 'Dodaj sprzęt' : 'Zapisz zmiany'"
      :discard-text="add ? 'Odrzuć' : 'Odrzuć zmiany'"
      @save-changes="add ? addHardware() : editHardware()"
      @discard-changes="returnFromEditor"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { HardwareService } from '@/services/HardwareService';
import PageHeader from '@/components/ui/PageHeader.vue';
import LoadingState from '@/components/ui/LoadingState.vue';
import TextField from '@/components/ui/TextField.vue';
import FormCard from '@/components/editor/FormCard.vue';
import MarkdownEditor from '@/components/editor/MarkdownEditor.vue';
import EditorActions from '@/components/editor/EditorActions.vue';
import { isValid, required, validate } from '@/utils/validation';

const route = useRoute();
const router = useRouter();
const store = useStore();
const hardwareService = new HardwareService();

const add = route.path.includes('add');
const hardware = ref<any>({ description: '' });
const status = ref<string>('Available');
const loaded = ref(add);
const submitted = ref(false);

const errors = computed(() => ({
  name: validate(hardware.value.name, [required]),
  serial: validate(hardware.value.serial_number, [required]),
  description: validate(hardware.value.description, [required]),
}));

function warnInvalid() {
  store.dispatch('warningMessage', 'Formularz nie został poprawnie wypełniony!');
}

function payload() {
  return {
    name: hardware.value.name,
    description: hardware.value.description,
    status: status.value,
    serial_number: hardware.value.serial_number,
  };
}

function addHardware() {
  submitted.value = true;
  if (!isValid(errors.value)) {
    warnInvalid();
    return;
  }
  hardwareService
    .addHardware(payload())
    .then((res: any) => {
      if (res.status === 201) {
        store.dispatch('successMessage', 'Sprzęt został dodany');
        router.replace({ name: 'hardwareList', params: { page: '1' } });
      }
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd poczas zapisywania sprzętu!');
    });
}

function editHardware() {
  submitted.value = true;
  if (!isValid(errors.value)) {
    warnInvalid();
    return;
  }
  hardwareService
    .editHardware(hardware.value.id, payload())
    .then((res: any) => {
      if (res.status === 200) {
        store.dispatch('successMessage', 'Sprzęt został zaktualizowany');
        returnFromEditor();
      }
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd poczas edycji sprzętu!');
    });
}

function returnFromEditor() {
  router.replace({ name: 'hardwareList', params: { page: '1' } });
}

onMounted(() => {
  if (!add) {
    hardwareService
      .getHardware(String(route.params.id))
      .then((res: any) => {
        hardware.value = res;
        status.value = res.status || 'Available';
        loaded.value = true;
      })
      .catch(() => {
        router.replace({ name: 'error404' });
      });
  }
});
</script>
