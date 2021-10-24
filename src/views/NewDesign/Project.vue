<template>
  <div class="project-page">
    <section-header
      :title="project.title"
      :subtitle="project.section.name"
      v-if="project"
      class="project-title"
    />

    <div class="project-toolbar" v-if="isAdministrator">
      <router-link :to="{ name: 'editProject', params: { id: $route.params.id } }" class="link">
        <edit-icon class="icon" />
        <span class="text">Edytuj projekt</span>
      </router-link>

      <span class="link" @click="deleteDialogOpen = true">
        <trash-icon class="icon" />
        <span class="text">Usuń projekt</span>
      </span>
    </div>

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
import EditIcon from '@/assets/icons/edit.svg?inline';
import TrashIcon from '@/assets/icons/trash.svg?inline';
import Gallery from '@/components/NewDesign/Gallery.vue';

@Component({
  components: {
    SectionHeader,
    EditIcon,
    TrashIcon,
    Gallery
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

  margin-top: 200px;
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

  .project-toolbar {
    background-color: $primary;
    width: 100%;
    margin-bottom: 50px;
    border-radius: 10px;
    padding: 10px 20px;
    display: flex;
    height: min-content;

    & > * + * {
      margin-left: 20px;
    }

    .link {
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon {
        width: 30px;
        height: 30px;
        color: $body-bg;
        display: block;
        margin-right: 10px;
      }

      .text {
        font-weight: 600;
        color: $body-bg;
        text-decoration: none;
        display: block;
      }
    }
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