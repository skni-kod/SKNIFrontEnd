<template>
  <article class="section-card card">
    <header class="section-card__head">
      <span class="section-card__icon" aria-hidden="true"><i class="mdi" :class="`mdi-${section.icon || 'folder-outline'}`"></i></span>
      <h2 class="section-card__title">
        <router-link :to="{ name: 'section', params: { id: section.id } }">{{ section.name }}</router-link>
      </h2>
      <AdminActions
        v-if="isAdministrator"
        class="section-card__admin"
        :edit-to="{ name: 'sectionEdit', params: { id: section.id } }"
        :confirm-text="`Czy na pewno chcesz usunąć sekcję ${section.name}?`"
        @delete="$emit('delete', section.id)"
      />
    </header>
    <MarkdownView class="section-card__text" :content="section.description" />
    <div v-if="sectionProjects.length" class="section-card__projects">
      <span class="section-card__label">Projekty sekcji</span>
      <div class="section-card__chips">
        <router-link
          v-for="project in sectionProjects"
          :key="project.id"
          :to="{ name: 'project', params: { id: project.id } }"
          class="chip"
        >
          {{ project.title }}
        </router-link>
      </div>
    </div>
    <footer>
      <router-link :to="{ name: 'section', params: { id: section.id } }" class="btn btn--soft btn--sm">
        Zobacz sekcję <i class="mdi mdi-arrow-right" aria-hidden="true"></i>
      </router-link>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import type { SectionModel } from '@/models/SectionModel';
import MarkdownView from '@/components/MarkdownView.vue';
import AdminActions from '@/components/AdminActions.vue';

const props = defineProps<{ section: SectionModel; projects: any[] }>();
defineEmits<{ delete: [id: number] }>();

const store = useStore();
const isAdministrator = computed<boolean>(() => !!store.getters.isAdministrator);
const sectionProjects = computed(() =>
  props.projects.filter((el: any) => el.section && el.section.name === props.section.name),
);
</script>

<style scoped>
.section-card {
  display: grid;
  gap: 18px;
  padding: clamp(22px, 3vw, 32px);
}

.section-card__head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
}

.section-card__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: #fff;
  font-size: 24px;
}

.section-card__title {
  flex: 1;
  font-size: 21px;
}

.section-card__title a {
  color: var(--text);
}

.section-card__title a:hover {
  color: var(--primary);
}

.section-card__text {
  font-size: 16px;
  color: var(--text-muted);
}

.section-card__projects {
  display: grid;
  gap: 10px;
}

.section-card__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-subtle);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.section-card__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
