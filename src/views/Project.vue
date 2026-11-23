<template>
  <div>
    <LoadingState v-if="loading" class="page" />
    <template v-else-if="project">
      <PageHeader :back="{ to: { name: 'projects' }, label: 'Wszystkie projekty' }" :title="project.title">
        <template #meta>
          <span v-if="section" class="chip chip--primary">
            <i class="mdi" :class="iconClass(section.icon || sectionIcon(section.id))" aria-hidden="true"></i>
            {{ section.name }}
          </span>
          <span v-if="project.creation_date" class="meta-item">
            <i class="mdi mdi-calendar-blank-outline" aria-hidden="true"></i>
            {{ formatDate(project.creation_date) }}
          </span>
        </template>
        <template v-if="isAdministrator" #actions>
          <AdminActions
            :edit-to="{ name: 'editProject', params: { id: project.id } }"
            :confirm-text="dialogText"
            @delete="deleteProject"
          />
        </template>
      </PageHeader>

      <div class="page">
        <div class="container layout">
          <MarkdownView class="layout__main" :content="project.text" />

          <aside class="layout__aside">
            <div v-if="authors.length" class="card card--pad side-card">
              <h2 class="side-card__title">Autorzy</h2>
              <ul class="people">
                <li v-for="author in authors" :key="author.id">
                  <router-link :to="{ name: 'userProfile', params: { id: profileId(author) } }" class="person">
                    <UserAvatar :first-name="author.first_name" :last-name="author.last_name" :username="author.username" :size="36" />
                    <span>{{ [author.first_name, author.last_name].filter(Boolean).join(' ') || author.username }}</span>
                  </router-link>
                </li>
              </ul>
            </div>
            <div v-if="links.length" class="card card--pad side-card">
              <h2 class="side-card__title">Linki</h2>
              <ul class="links">
                <li v-for="link in links" :key="link.url">
                  <a :href="link.url" target="_blank" rel="noopener" class="ext-link">
                    <i class="mdi" :class="linkIcon(link.type)" aria-hidden="true"></i>
                    <span>{{ link.type || 'Link' }}</span>
                    <i class="mdi mdi-arrow-top-right ext-link__arrow" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          <Gallery class="layout__full" :imgs="project.gallery" />
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
import { ProjectsService } from '@/services/ProjectsService';
import type { ProjectModel } from '@/models/ProjectModel';
import PageHeader from '@/components/ui/PageHeader.vue';
import LoadingState from '@/components/ui/LoadingState.vue';
import UserAvatar from '@/components/ui/UserAvatar.vue';
import MarkdownView from '@/components/MarkdownView.vue';
import Gallery from '@/components/Gallery.vue';
import AdminActions from '@/components/AdminActions.vue';
import { formatDate } from '@/utils/date';
import { sectionIcon } from '@/utils/sections';

const LINK_ICONS: Record<string, string> = {
  Github: 'mdi-github',
  Gitlab: 'mdi-gitlab',
  Bitbucket: 'mdi-bitbucket',
  Blog: 'mdi-post-outline',
  Portfolio: 'mdi-folder-multiple-outline',
};

const store = useStore();
const route = useRoute();
const router = useRouter();
const projectsService = new ProjectsService();
const project = ref<ProjectModel | null>(null);

const loading = computed(() => !project.value);
const isAdministrator = computed<boolean>(() => !!store.getters.isAdministrator);
const section = computed<any>(() => (project.value && typeof project.value.section === 'object' ? project.value.section : null));
const authors = computed<any[]>(() => ((project.value?.authors as any[]) || []).filter((a) => a && typeof a === 'object'));
const links = computed<{ url: string; type?: string }[]>(() => {
  const raw = (project.value as any)?.links;
  return Array.isArray(raw)
    ? raw.map((l: any) => ({ url: l.link || l.text, type: l.link_type || l.type })).filter((l) => !!l.url)
    : [];
});
const dialogText = computed(() => `Czy na pewno chcesz usunąć projekt "${project.value?.title}"?`);

function profileId(author: any) {
  return (author.profile && author.profile.id) || author.id;
}

function linkIcon(type?: string) {
  return (type && LINK_ICONS[type]) || 'mdi-link-variant';
}

async function deleteProject() {
  if (!project.value) {
    return;
  }
  try {
    await projectsService.deleteProject(project.value.id);
    store.dispatch('successMessage', 'Projekt został usunięty');
    router.replace({ name: 'projects', params: { page: '1' } });
  } catch (error) {
    store.dispatch('errorMessage', 'Błąd poczas usuwania projektu!');
  }
}

onMounted(async () => {
  const projectId = Number.parseInt(String(route.params.id), 10);
  try {
    project.value = await projectsService.getProject(projectId);
    document.title = `${project.value.title} | SKNI KOD`;
  } catch (error) {
    router.replace({ name: 'error404' });
  }
});
</script>

<style scoped>
.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 48px;
  align-items: start;
}

.layout__full {
  grid-column: 1 / -1;
}

.layout__aside {
  position: sticky;
  top: calc(var(--header-h) + 24px);
  display: grid;
  gap: 16px;
}

.layout__aside:empty {
  display: none;
}

.side-card {
  display: grid;
  gap: 14px;
}

.side-card__title {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

.people,
.links {
  display: grid;
  gap: 6px;
  list-style: none;
}

.person,
.ext-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 8px;
  margin-inline: -8px;
  border-radius: var(--radius-sm);
  color: var(--text);
  font-size: 15px;
  font-weight: 500;
  transition: background-color var(--t-fast);
}

.person:hover,
.ext-link:hover {
  background: var(--surface);
}

.ext-link .mdi {
  font-size: 20px;
  color: var(--text-muted);
}

.ext-link__arrow {
  margin-left: auto;
  font-size: 16px !important;
}

@media (max-width: 960px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .layout__aside {
    position: static;
    grid-row: 1;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
}
</style>
