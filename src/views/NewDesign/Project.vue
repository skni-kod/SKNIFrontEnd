<template>
  <div class="project-page">
    <section-header
      :title="project.title"
      :subtitle="project.section.name"
      v-if="project"
      class="project-title"
    />

    <toolbar v-if="isAdministrator">
      <toolbar-item
        text="Edytuj projekt"
        :link="{ name: 'editProject', params: { id: $route.params.id } }"
        :icon="require('@/assets/icons/edit.svg?inline')"
      />
      <toolbar-item
        text="Usuń projekt"
        @click="deleteDialogOpen = true"
        :icon="require('@/assets/icons/trash.svg?inline')"
      />
    </toolbar>

    <div class="project-info" v-if="project">
      <h2 class="authors-label" v-if="project.authors.length > 0">Autorzy</h2>
      <div class="authors" v-if="project.authors.length > 0">
        <v-chip label v-for="author in project.authors">
          <v-avatar left>
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
          <span>{{ author.first_name }} {{ author.last_name }}</span>
        </v-chip>
      </div>

      <markdown-it-vue
        class="project-description"
        :content="project.text"
        :options="markdownOptions"
      />

      <gallery breakpoints="xs6" :imgs="project.gallery" class="gallery" />
    </div>

    <div class="loading-wrapper" v-if="loading">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <confirmation-dialog
      v-if="deleteDialogOpen"
      @yes="deleteProject"
      @no="deleteDialogOpen = false"
      text="Czy na pewno chcesz usunąć ten artykuł?"
    />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ProjectsService } from '@/services/ProjectsService';
import { ProjectModel } from '@/models/ProjectModel';
import SectionHeader from '@/components/NewDesign/SectionHeader.vue';
import Gallery from '@/components/NewDesign/Gallery.vue';
import Toolbar from '@/components/NewDesign/Toolbar.vue';
import ToolbarItem from '@/components/NewDesign/ToolbarItem.vue';

@Component({
  components: {
    SectionHeader,
    Gallery,
    Toolbar,
    ToolbarItem
  }
})
export default class Project extends Vue {
  projectsService = new ProjectsService();
  project: ProjectModel | null = null;
  deleteDialogOpen = false;

  markdownOptions = {
    markdownIt: {
      html: true,
      linkify: true,
    },
    githubToc: {
      anchorLink: false,
    },
  }

  get loading() {
    return !this.project;
  }

  async mounted() {
    const projectId = Number.parseInt(this.$route.params.id);

    try {
      const project = await this.projectsService.getProject(projectId);
      this.project = project;
    } catch (error) {
      this.$router.replace({ name: 'error404' });
    }
  }

  get isAdministrator(): boolean {
    return this.$store.getters.isAdministrator;
  }

  async deleteProject() {
    if (this.project) {
      try {
        await this.projectsService.deleteProject(this.project.id);
        this.$store.dispatch('successMessage', 'Projekt został usunięty');
        this.$router.replace({ name: 'projects', params: { page: '1' } });
      } catch (error) {
        this.$store.dispatch('errorMessage', 'Błąd poczas usuwania projektu!');
      } finally {
        this.deleteDialogOpen = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/helpers' as *;

.project-page {
  @include responsiveLayout();

  margin-top: 50px;
  height: 100%;
  width: 100%;

  .project-title {
    margin-bottom: 50px;
  }

  .loading-wrapper {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .project-info {
    .authors-label {
      margin-bottom: 10px;
    }

    .authors {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 50px;

      & > * + * {
        margin-left: 10px;
      }
    }

    .project-description {
      margin-bottom: 50px;
    }
  }
}
</style>