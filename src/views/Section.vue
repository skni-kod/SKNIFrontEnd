<template>
  <div>
    <LoadingState v-if="!section" class="page" />
    <template v-else>
      <PageHeader :back="{ to: { name: 'home', hash: '#sections' }, label: 'Wszystkie sekcje' }" eyebrow="Sekcja SKNI KOD">
        <template #title>
          <span class="title">
            <span class="title__icon" aria-hidden="true"><i class="mdi" :class="iconClass(section.icon)"></i></span>
            {{ section.name }}
          </span>
        </template>
        <template v-if="role" #actions>
          <AdminActions
            :edit-to="{ name: 'sectionEdit', params: { id: section.id } }"
            :confirm-text="`Czy na pewno chcesz usunąć sekcję ${section.name}?`"
            @delete="deleteSection(section.id)"
          />
        </template>
      </PageHeader>

      <div class="page">
        <div class="container content">
          <MarkdownView class="content__text" :content="section.description" />

          <section v-if="projects.length" class="content__projects">
            <h2 class="content__heading">Projekty sekcji</h2>
            <div class="projects">
              <router-link
                v-for="project in projects"
                :key="project.id"
                :to="{ name: 'project', params: { id: project.id } }"
                class="project-link card"
              >
                <i class="mdi mdi-folder-outline" aria-hidden="true"></i>
                <span>{{ project.title }}</span>
                <i class="mdi mdi-arrow-right project-link__arrow" aria-hidden="true"></i>
              </router-link>
            </div>
          </section>

          <Gallery :imgs="section.gallery" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { iconClass } from '@/utils/icons';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { SectionsService } from '@/services/SectionsService';
import { ProjectsService } from '@/services/ProjectsService';
import type { SectionModel } from '@/models/SectionModel';
import type { ProjectModel } from '@/models/ProjectModel';
import PageHeader from '@/components/ui/PageHeader.vue';
import LoadingState from '@/components/ui/LoadingState.vue';
import MarkdownView from '@/components/MarkdownView.vue';
import Gallery from '@/components/Gallery.vue';
import AdminActions from '@/components/AdminActions.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();
const projectsService = new ProjectsService();
const sectionsService = new SectionsService();
const section = ref<SectionModel>();
const projects = ref<ProjectModel[]>([]);
const role = computed<boolean>(() => !!store.getters.isAdministrator);

function deleteSection(id: number) {
  sectionsService
    .deleteSection(id)
    .then((res) => {
      if (res.status === 204) {
        store.dispatch('successMessage', 'Sekcja została usunięta');
        router.replace({ name: 'sections' });
      }
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd poczas usuwania projektu!');
    });
}

onMounted(() => {
  if (!route.params.id) {
    router.replace({ name: 'sections' });
    return;
  }
  sectionsService
    .getSection(Number(route.params.id))
    .then((res) => {
      projectsService.getAllProjects().then((proj) => {
        projects.value = proj.filter((el: ProjectModel) => (el.section as SectionModel).name === res.data.name);
      });
      section.value = res.data;
      document.title = `${res.data.name} | SKNI KOD`;
    })
    .catch(() => {
      router.replace({ name: 'error404' });
    });
});
</script>

<style scoped>
.title {
  display: inline-flex;
  align-items: center;
  gap: 16px;
}

.title__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: var(--radius);
  background: var(--primary-soft);
  color: var(--primary);
  font-size: 28px;
}

.content {
  display: grid;
  gap: 56px;
}

.content__text {
  max-width: var(--container-narrow);
}

.content__projects {
  display: grid;
  gap: 20px;
}

.content__heading {
  font-size: 24px;
}

.projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  color: var(--text);
  font-weight: 600;
  transition: border-color var(--t-fast), box-shadow var(--t-fast);
}

.project-link:hover {
  border-color: var(--primary-soft-2);
  box-shadow: var(--shadow-sm);
}

.project-link .mdi {
  font-size: 20px;
  color: var(--primary);
}

.project-link__arrow {
  margin-left: auto;
  color: var(--text-subtle) !important;
  transition: transform var(--t) var(--ease);
}

.project-link:hover .project-link__arrow {
  transform: translateX(3px);
  color: var(--primary) !important;
}
</style>
