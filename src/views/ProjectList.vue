<template>
  <div>
    <PageHeader
      eyebrow="Projekty małe i duże"
      title="Nasze projekty"
      description="Gry, aplikacje i konstrukcje elektroniczne tworzone przez członków koła."
    >
      <template v-if="isAdministrator" #actions>
        <router-link :to="{ name: 'projectAdd' }" class="btn">
          <i class="mdi mdi-plus" aria-hidden="true"></i> Dodaj projekt
        </router-link>
      </template>
    </PageHeader>

    <div class="page">
      <div class="container">
        <LoadingState v-if="loading" />
        <template v-else-if="projects.length">
          <div class="projects">
            <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
          </div>
          <Pagination
            class="projects__pagination"
            :model-value="currentPageNumber"
            :length="Math.ceil(projectsCount / itemsPerPage)"
            @update:model-value="paginationClicked"
          />
        </template>
        <EmptyState v-else icon="folder-open-outline" title="Brak projektów" text="Nie dodano jeszcze żadnych projektów." />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import PageHeader from '@/components/ui/PageHeader.vue';
import LoadingState from '@/components/ui/LoadingState.vue';
import EmptyState from '@/components/ui/EmptyState.vue';
import Pagination from '@/components/ui/Pagination.vue';
import ProjectCard from '@/components/ProjectCard.vue';

const itemsPerPage = 10;
const store = useStore();
const route = useRoute();
const router = useRouter();

const currentPageNumber = computed(() => {
  const page = Number.parseInt(String(route.params.page), 10);
  return Number.isNaN(page) ? 1 : page;
});

const projects = computed(() => store.getters.paginatedProjects.projects[currentPageNumber.value] || []);

const loading = computed(() => {
  const list = store.getters.paginatedProjects.projects[currentPageNumber.value];
  if (list && list.length > 0) {
    return false;
  }
  return store.getters.paginatedProjects.loading;
});

const projectsCount = computed<number>(() => store.getters.paginatedProjects.count);
const isAdministrator = computed<boolean>(() => !!store.getters.isAdministrator);

function fetchProjects(page: number) {
  store.dispatch('getPaginatedProjects', { page, pageSize: itemsPerPage });
}

function paginationClicked(pageNumber: number) {
  router.replace({ name: 'projects', params: { page: String(pageNumber) } });
}

onMounted(() => fetchProjects(currentPageNumber.value));
</script>

<style scoped>
.projects {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.projects__pagination {
  margin-top: 48px;
}

@media (max-width: 1023px) {
  .projects {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .projects {
    grid-template-columns: 1fr;
  }
}
</style>
