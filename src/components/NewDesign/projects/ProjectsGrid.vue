<template>
  <section class="projects-grid">
    <section-header
      class="grid-header"
      subtitle="Nasze projekty"
      title="Prowadzimy wiele ciekawych projektów"
    />

    <project-tile class="project-tile" v-for="project in projects" :project="project" :key="project.id"/>

    <div class="grid-footer">
      <p class="projects-count">
        Mamy ich już ponad
        <strong>{{ projectsCount }}</strong>
      </p>
      <link-button :to="{ name: 'projects' }" class="projects-button">Zobacz wszystkie!</link-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import LinkButton from '../base/LinkButton.vue';
import SectionHeader from '@/components/NewDesign/SectionHeader.vue';
import { ProjectInfo } from '@/store/modules/projects';
import ProjectTile from '@/components/NewDesign/projects/ProjectTile.vue';

@Component({
  components: {
    LinkButton,
    SectionHeader,
    ProjectTile,
  },
})
export default class ProjectsGrid extends Vue {
  @Prop() projects!: ProjectInfo[];
  @Prop(Number) projectsCount!: number;
}
</script>

<style lang="scss" scoped>
@use '@/styles/helpers' as *;
@use 'sass:color';

.projects-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 6fr 2fr 6fr auto;
  gap: 50px;
  margin: 50px 0;
  .grid-header {
    grid-column: 1;
  }

  .project-tile {
    grid-row-end: span 2;
  }

  .grid-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    grid-row: 5;
    grid-column: 2;

    .projects-count {
      font-family: Montserrat;
      font-weight: 500;
      font-size: 30px;
      display: flex;
      flex-direction: column;
      margin: 0;

      strong {
        font-size: 65px;
        color: $primary;
        font-weight: 500;
        line-height: 1.2;
      }
    }
  }

  @include media-breakpoint-down("md") {
    grid-template-columns: 1fr;
    grid-template-rows: unset;

    .grid-header,
    .project-tile,
    .grid-footer {
      grid-column: 1;
      grid-row: auto;
    }
  }

  @include media-breakpoint-down("sm") {
    .grid-footer {
      flex-direction: column;
      gap: 20px;
      text-align: center;

      .projects-button {
        width: 100%;
      }
    }
  }
}
</style>
