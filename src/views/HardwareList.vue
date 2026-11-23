<template>
  <div>
    <PageHeader
      eyebrow="Zaplecze koła"
      title="Sprzęt"
      description="Sprzęt, z którego członkowie koła mogą korzystać przy swoich projektach."
    >
      <template v-if="isAdministrator" #actions>
        <router-link :to="{ name: 'hardwareAdd' }" class="btn">
          <i class="mdi mdi-plus" aria-hidden="true"></i> Dodaj sprzęt
        </router-link>
      </template>
    </PageHeader>
    <div class="page">
      <div class="container">
        <LoadingState v-if="loading" />
        <template v-else-if="hardware.length">
          <div class="grid">
            <HardwareCard v-for="item in hardware" :key="item.id" :hardware="item" @deleted="onDeleted" />
          </div>
          <Pagination
            class="grid__pagination"
            :model-value="pagination.currentPage"
            :length="pagination.pageCount"
            @update:model-value="paginationClicked"
          />
        </template>
        <EmptyState v-else icon="chip" title="Brak sprzętu" text="Nie dodano jeszcze żadnego sprzętu." />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { HardwareService } from '@/services/HardwareService';
import type { HardwareModel } from '@/models/HardwareModel';
import { PaginationModel } from '@/models/PaginationModel';
import PageHeader from '@/components/ui/PageHeader.vue';
import LoadingState from '@/components/ui/LoadingState.vue';
import EmptyState from '@/components/ui/EmptyState.vue';
import Pagination from '@/components/ui/Pagination.vue';
import HardwareCard from '@/components/HardwareCard.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();
const hardwareService = new HardwareService();
const pagination = reactive(new PaginationModel(1, 3, 6));
const hardware = ref<HardwareModel[]>([]);
const loading = ref(true);
const isAdministrator = computed<boolean>(() => !!store.getters.isAdministrator);

function paginationClicked(pageNumber: number) {
  router.replace({ name: 'hardwareList', params: { page: String(pageNumber) } });
}

function getHardware() {
  const pageNumber = Number(route.params.page);
  if (!pageNumber || Number.isNaN(pageNumber) || pageNumber < 1) {
    paginationClicked(1);
    return;
  }

  pagination.currentPage = pageNumber;
  hardwareService
    .getHardwareByPage(pageNumber, pagination.itemsPerPage, false)
    .then((container) => {
      hardware.value = container.results;
      if (!hardware.value.length && pageNumber !== 1) {
        paginationClicked(1);
        return;
      }
      pagination.itemCount = container.count;
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
}

function onDeleted(id: number) {
  hardware.value = hardware.value.filter((item) => item.id !== id);
}

onMounted(getHardware);
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.grid__pagination {
  margin-top: 40px;
}

@media (max-width: 1023px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
