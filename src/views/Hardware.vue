<template>
  <div>
    <LoadingState v-if="loading || !hardware" class="page" />
    <template v-else>
      <PageHeader :back="{ to: { name: 'hardwareList', params: { page: '1' } }, label: 'Cały sprzęt' }" :title="hardware.name">
        <template #meta>
          <span class="badge" :class="`badge--${status.tone}`">{{ status.label }}</span>
        </template>
        <template v-if="isAdministrator" #actions>
          <AdminActions
            :edit-to="{ name: 'hardwareEdit', params: { id: hardware.id } }"
            :confirm-text="dialogText"
            @delete="deleteHardware(hardware.id)"
          />
        </template>
      </PageHeader>

      <div class="page">
        <div class="container layout">
          <MarkdownView :content="hardware.description" />
          <aside class="card card--pad spec">
            <dl class="spec__list">
              <div>
                <dt>Status</dt>
                <dd><span class="badge" :class="`badge--${status.tone}`">{{ status.label }}</span></dd>
              </div>
              <div>
                <dt>Numer seryjny</dt>
                <dd class="mono">{{ hardware.serial_number || '–' }}</dd>
              </div>
            </dl>
            <p class="spec__hint">{{ status.hint }}</p>
            <button type="button" class="btn btn--block" disabled title="Funkcja w przygotowaniu">
              <i class="mdi mdi-dolly" aria-hidden="true"></i> Wypożycz
            </button>
            <small class="spec__soon">Wypożyczenia online będą dostępne wkrótce.</small>
          </aside>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { HardwareService } from '@/services/HardwareService';
import PageHeader from '@/components/ui/PageHeader.vue';
import LoadingState from '@/components/ui/LoadingState.vue';
import MarkdownView from '@/components/MarkdownView.vue';
import AdminActions from '@/components/AdminActions.vue';
import { hardwareStatus } from '@/utils/hardware';

const store = useStore();
const route = useRoute();
const router = useRouter();
const hardwareService = new HardwareService();
const hardware = ref<any>(null);
const loading = ref(true);

const isAdministrator = computed<boolean>(() => !!store.getters.isAdministrator);
const status = computed(() => hardwareStatus(hardware.value?.status));
const dialogText = computed(() => `Czy na pewno chcesz usunąć sprzęt "${hardware.value?.name}"?`);

function deleteHardware(id: number) {
  hardwareService
    .deleteHardware(id)
    .then((res) => {
      if (res.status === 204) {
        store.dispatch('successMessage', 'Sprzęt został usunięty');
        router.replace({ name: 'hardwareList', params: { page: '1' } });
      }
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd poczas usuwania sprzętu!');
    });
}

onMounted(() => {
  hardwareService
    .getHardware(String(route.params.id))
    .then((result) => {
      hardware.value = result;
      loading.value = false;
    })
    .catch(() => {
      router.replace({ name: 'error404' });
    });
});
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 48px;
  align-items: start;
}

.spec {
  position: sticky;
  top: calc(var(--header-h) + 24px);
  display: grid;
  gap: 16px;
}

.spec__list {
  display: grid;
  gap: 14px;
  margin: 0;
}

.spec__list div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.spec__list dt {
  color: var(--text-muted);
  font-size: 14px;
}

.spec__list dd {
  margin: 0;
  font-weight: 600;
}

.mono {
  font-family: var(--font-mono);
  font-size: 14px;
}

.spec__hint {
  padding-top: 14px;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 14px;
}

.spec__soon {
  color: var(--text-subtle);
  font-size: 13px;
  text-align: center;
}

@media (max-width: 860px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .spec {
    position: static;
  }
}
</style>
