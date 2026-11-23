<template>
  <article class="project-card">
    <div class="project-card__media">
      <img :src="project.image" :alt="project.name" loading="lazy" />
    </div>
    <div class="project-card__body">
      <span class="project-card__section">
        <i class="mdi" :class="iconClass(project.section.icon || sectionIcon(project.section.id))" aria-hidden="true"></i>
        {{ project.section.name }}
      </span>
      <h3 class="project-card__title">
        <router-link :to="{ name: 'project', params: { id: project.id } }" class="project-card__link">
          {{ project.name }}
        </router-link>
      </h3>
      <p class="project-card__description">{{ project.description }}</p>
      <footer class="project-card__footer">
        <span class="project-card__more">Szczegóły projektu <i class="mdi mdi-arrow-right" aria-hidden="true"></i></span>
        <div v-if="isAdministrator" class="project-card__admin">
          <router-link
            :to="{ name: 'editProject', params: { id: project.id } }"
            class="btn btn--ghost btn--icon btn--sm"
            aria-label="Edytuj projekt"
            title="Edytuj"
          >
            <i class="mdi mdi-pencil-outline"></i>
          </router-link>
          <button type="button" class="btn btn--danger-ghost btn--icon btn--sm" aria-label="Usuń projekt" title="Usuń" @click="deleteDialogOpen = true">
            <i class="mdi mdi-trash-can-outline"></i>
          </button>
        </div>
      </footer>
    </div>

    <ConfirmationDialog
      v-if="deleteDialogOpen"
      :text="`Czy chcesz usunąć projekt ${project.name}?`"
      @yes="deleteProject"
      @no="deleteDialogOpen = false"
    />
  </article>
</template>

<script setup lang="ts">
import { iconClass } from '@/utils/icons';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import type { ProjectInfo } from '@/store/modules/projects';
import { ProjectsService } from '@/services/ProjectsService';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import { sectionIcon } from '@/utils/sections';

const props = defineProps<{ project: ProjectInfo }>();
const store = useStore();
const deleteDialogOpen = ref(false);
const isAdministrator = computed<boolean>(() => !!store.getters.isAdministrator);

async function deleteProject() {
  try {
    await new ProjectsService().deleteProject(props.project.id);
    store.dispatch('successMessage', 'Projekt został usunięty');
    store.dispatch('getPaginatedProjects', { page: 1, pageSize: 10 });
  } catch (error) {
    store.dispatch('errorMessage', 'Błąd poczas usuwania projektu!');
  } finally {
    deleteDialogOpen.value = false;
  }
}
</script>

<style scoped>
.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xs);
  transition: box-shadow var(--t) var(--ease), transform var(--t) var(--ease), border-color var(--t);
}

.project-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
  border-color: var(--border-strong);
}

.project-card__media {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--surface-2);
}

.project-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms var(--ease);
}

.project-card:hover .project-card__media img {
  transform: scale(1.04);
}

.project-card__body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  padding: 22px 24px 18px;
}

.project-card__section {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--primary);
}

.project-card__section .mdi {
  font-size: 17px;
}

.project-card__title {
  font-size: 21px;
  line-height: 1.3;
}

.project-card__link {
  color: var(--text);
}

.project-card__link::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
}

.project-card__description {
  color: var(--text-muted);
  font-size: 15px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid var(--border);
  min-height: 50px;
}

.project-card__more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--primary);
  font-size: 14px;
  font-weight: 600;
}

.project-card__more .mdi {
  transition: transform var(--t) var(--ease);
}

.project-card:hover .project-card__more .mdi {
  transform: translateX(3px);
}

.project-card__admin {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 2px;
}
</style>
