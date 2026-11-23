<template>
  <div>
    <PageHeader
      eyebrow="Struktura koła"
      title="Sekcje"
      description="Każda sekcja skupia się na innej dziedzinie. Wybierz tę, która najbardziej Cię interesuje."
    >
      <template v-if="isAdministrator" #actions>
        <router-link :to="{ name: 'sectionAdd' }" class="btn">
          <i class="mdi mdi-plus" aria-hidden="true"></i> Dodaj sekcję
        </router-link>
      </template>
    </PageHeader>
    <div class="page">
      <div class="container container--narrow">
        <LoadingState v-if="loading" />
        <div v-else-if="sections.length" class="list">
          <SectionCard
            v-for="section in sections"
            :key="section.id"
            :section="section"
            :projects="projects"
            @delete="deleteSection"
          />
        </div>
        <EmptyState v-else icon="shape-outline" title="Brak sekcji" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { SectionsService } from '@/services/SectionsService';
import { ProjectsService } from '@/services/ProjectsService';
import type { SectionModel } from '@/models/SectionModel';
import PageHeader from '@/components/ui/PageHeader.vue';
import LoadingState from '@/components/ui/LoadingState.vue';
import EmptyState from '@/components/ui/EmptyState.vue';
import SectionCard from '@/components/SectionCard.vue';

const store = useStore();
const sectionsService = new SectionsService();
const projectsService = new ProjectsService();
const sections = ref<SectionModel[]>([]);
const projects = ref<any[]>([]);
const loading = ref(true);
const isAdministrator = computed<boolean>(() => !!store.getters.isAdministrator);

function deleteSection(id: number) {
  sectionsService
    .deleteSection(id)
    .then((res) => {
      if (res.status === 204) {
        store.dispatch('successMessage', 'Sekcja została usunięta');
        sections.value = sections.value.filter((el) => el.id !== id);
      }
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd poczas usuwania secji!');
    });
}

onMounted(() => {
  projectsService.getAllProjects().then((res) => {
    projects.value = res;
  });
  sectionsService
    .getAllSections()
    .then((res) => {
      sections.value = (res.data as SectionModel[]).filter((s) => s.isVisible !== false);
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>

<style scoped>
.list {
  display: grid;
  gap: 20px;
}
</style>
