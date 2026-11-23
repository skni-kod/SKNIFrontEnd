<template>
  <article class="hw card">
    <header class="hw__head">
      <span class="hw__icon" aria-hidden="true"><i class="mdi mdi-chip"></i></span>
      <div class="hw__title-wrap">
        <h2 class="hw__title">
          <router-link :to="{ name: 'hardware', params: { id: hardware.id } }" class="hw__link">{{ hardware.name }}</router-link>
        </h2>
        <span v-if="serial" class="hw__serial">S/N {{ serial }}</span>
      </div>
      <span class="badge" :class="`badge--${status.tone}`" :title="status.hint">{{ status.label }}</span>
    </header>
    <p class="hw__desc">{{ excerpt }}</p>
    <footer class="hw__footer">
      <span class="hw__more">Szczegóły <i class="mdi mdi-arrow-right" aria-hidden="true"></i></span>
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
    </footer>
    <ConfirmationDialog v-if="dialog" :text="dialogText" @yes="deleteHardware(hardware.id)" @no="dialog = false" />
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import removeMarkdown from 'remove-markdown';
import type { HardwareModel } from '@/models/HardwareModel';
import { HardwareService } from '@/services/HardwareService';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import { hardwareStatus } from '@/utils/hardware';

const props = defineProps<{ hardware: HardwareModel }>();
const emit = defineEmits<{ deleted: [id: number] }>();

const store = useStore();
const router = useRouter();
const hardwareService = new HardwareService();
const dialog = ref(false);

const isAdministrator = computed<boolean>(() => !!store.getters.isAdministrator);
const status = computed(() => hardwareStatus(props.hardware.status));
const serial = computed(() => (props.hardware as any).serial_number);
const excerpt = computed(() => {
  const text = removeMarkdown(props.hardware.description || '').replace(/\s+/g, ' ').trim();
  return text.length > 200 ? `${text.slice(0, 200).trim()}…` : text || 'Brak opisu.';
});
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
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
  padding: 22px 24px 18px;
  transition: box-shadow var(--t) var(--ease), border-color var(--t), transform var(--t) var(--ease);
}

.hw:hover {
  transform: translateY(-2px);
  border-color: var(--border-strong);
  box-shadow: var(--shadow);
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

.hw__link {
  color: var(--text);
}

.hw__link::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
}

.hw__serial {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-subtle);
}

.hw__desc {
  color: var(--text-muted);
  font-size: 15px;
  line-height: 1.6;
}

.hw__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

.hw__more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--primary);
  font-size: 14px;
  font-weight: 600;
}

.hw__admin {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 2px;
}
</style>
