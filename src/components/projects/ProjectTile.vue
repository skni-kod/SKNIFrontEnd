<template>
  <div class="project-tile" :style="`background-image: url(${project.image});`">
    <div class="tile-content">
      <h3 class="project-name">{{ project.name }}</h3>

      <div class="section">
        <apps-section-icon class="icon" v-if="project.section.id === 1" />
        <gamedev-section-icon class="icon" v-if="project.section.id === 2" />
        <retro-section-icon class="icon" v-if="project.section.id === 3" />

        <p class="name">{{ project.section.name }}</p>
      </div>

      <p class="project-description">{{ project.description }}</p>

      <div class="project-links">
        <router-link
          :to="{ name: 'editProject', params: { id: project.id } }"
          class="project-link"
          v-if="isAdministrator"
        >
          <edit-icon class="project-link-icon" />
        </router-link>

        <span class="project-link" @click="deleteDialogOpen = true" v-if="isAdministrator">
          <trash-icon class="project-link-icon" />
        </span>

        <router-link :to="{ name: 'project', params: { id: project.id } }" class="project-link">
          <arrow-right-icon class="project-link-icon" />
        </router-link>
      </div>
    </div>

    <confirmation-dialog
      v-if="deleteDialogOpen"
      @yes="deleteProject"
      @no="deleteDialogOpen = false"
      :text="`Czy chcesz usunąć projekt ${project.name}?`"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ProjectInfo } from '@/store/modules/projects';
import AppsSectionIcon from '@/assets/icons/apps.svg?inline';
import RetroSectionIcon from '@/assets/icons/retro.svg?inline';
import GamedevSectionIcon from '@/assets/icons/gamedev.svg?inline';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg?inline';
import EditIcon from '@/assets/icons/edit.svg?inline';
import TrashIcon from '@/assets/icons/trash.svg?inline';
import { ProjectsService } from '@/services/ProjectsService';

@Component({
  components: {
    AppsSectionIcon,
    GamedevSectionIcon,
    RetroSectionIcon,
    ArrowRightIcon,
    EditIcon,
    TrashIcon,
  },
})
export default class ProjectTile extends Vue {
  @Prop() project!: ProjectInfo;
  deleteDialogOpen = false;

  async deleteProject() {
    try {
      await new ProjectsService().deleteProject(this.project.id);
      this.$store.dispatch('successMessage', 'Projekt został usunięty');
      this.$store.dispatch('getPaginatedProjects', { page: 1, pageSize: 10 });
    } catch (error) {
      this.$store.dispatch('errorMessage', 'Błąd poczas usuwania projektu!');
    } finally {
      this.deleteDialogOpen = false;
    }
  }

  get isAdministrator(): boolean {
    return this.$store.getters.isAdministrator;
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/helpers' as *;
@use 'sass:color';

.project-tile {
  border-radius: 20px;
  width: 100%;
  height: 100%;
  min-height: 580px;
  background-size: cover;
  background-position: center;

  .tile-content {
    background-color: color.change($primary, $alpha: 0.8);
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 50px;
    color: $body-bg;
    border-radius: 20px;
    height: 100%;
    opacity: 1;
    transition: opacity 0.3s;

     @include media-breakpoint-down("sm") {
       padding: 20px;
     }
    .project-name {
      font-size: 45px;
      font-family: Montserrat;
      font-weight: 500;
    }

    .section {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;

      .name {
        flex: 1;
        font-weight: 700;
        font-size: 18px;
        margin: 0;
      }

      .icon {
        width: 40px;
        height: 40px;
        color: $body-bg;
      }
    }

    .project-description {
      margin: 0;
      font-size: 20px;
    }

    .project-links {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      & > * + * {
        margin-left: 30px;
      }
    }

    .project-link {
      align-self: flex-end;
      color: $body-bg;
      transition: color 0.3s;
      width: 30px;
      height: 30px;
      display: block;
      cursor: pointer;

      &:hover {
        color: $primary;
      }
    }
  }
}
</style>
