<template>
  <article class="hw card">
    <header class="hw__head">
      <span class="hw__icon" aria-hidden="true"><i class="mdi mdi-chip"></i></span>
      <div class="hw__title-wrap">
        <h2 class="hw__title">{{ hardware.name }}</h2>
        <span v-if="serial" class="hw__serial">S/N {{ serial }}</span>
      </div>
      <div v-if="isAdministrator" class="hw__admin">
        <router-link
          :to="{ name: 'hardwareEdit', params: { id: hardware.id } }"
          class="btn btn--ghost btn--icon btn--sm"
          aria-label="Edytuj sprzęt"
        >
          <i class="mdi mdi-pencil-outline"></i>
        </router-link>
        <button type="button" class="btn btn--danger-ghost btn--icon btn--sm" aria-label="Usuń sprzęt" @click="dialog = true">
          <i class="mdi mdi-trash-can-outline"></i>
        </button>
      </div>
    </header>
    <MarkdownView v-if="hardware.description" class="hw__desc" :content="hardware.description" />
    <p v-else class="hw__desc muted">Brak opisu.</p>
    <ConfirmationDialog v-if="dialog" :text="dialogText" @yes="deleteHardware(hardware.id)" @no="dialog = false" />
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import type { HardwareModel } from '@/models/HardwareModel';
import { HardwareService } from '@/services/HardwareService';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import MarkdownView from '@/components/MarkdownView.vue';

const props = defineProps<{ hardware: HardwareModel }>();
const emit = defineEmits<{ deleted: [id: number] }>();

const store = useStore();
const router = useRouter();
const hardwareService = new HardwareService();
const dialog = ref(false);

const isAdministrator = computed<boolean>(() => !!store.getters.isAdministrator);
const serial = computed(() => (props.hardware as any).serial_number);
const dialogText = computed(() => `Czy na pewno chcesz usunąć sprzęt "${props.hardware.name}"?`);

function deleteHardware(id: number) {
  dialog.value = false;
  hardwareService
    .deleteHardware(id)
    .then((res) => {
      if (res.status === 204) {
        store.dispatch('successMessage', 'Sprzęt został usunięty');
        emit('deleted', id);
        router.replace({ name: 'hardwareList', params: { page: '1' } });
      }
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd poczas usuwania sprzętu!');
    });
}
</script>

<style scoped>
.hw {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 22px 24px;
}

.hw__head {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.hw__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  background: var(--primary-soft);
  color: var(--primary);
  font-size: 22px;
}

.hw__title-wrap {
  flex: 1;
  min-width: 0;
  display: grid;
  gap: 2px;
}

.hw__title {
  font-size: 18px;
  line-height: 1.3;
}

.hw__serial {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-subtle);
}

.hw__desc {
  font-size: 15px;
  color: var(--text-muted);
}

.hw__admin {
  display: flex;
  gap: 2px;
}
</style>
