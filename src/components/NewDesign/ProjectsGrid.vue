<template>
  <section class="projects-grid">
    <section-header
      class="grid-header"
      subtitle="Nasze projekty"
      title="Prowadzimy wiele ciekawych projektów"
    />

    <div
      class="project-tile"
      v-for="project in projects"
      :style="`background-image: url(${project.image});`"
    >
      <div class="tile-content">
        <h3 class="project-name">{{ project.name }}</h3>

        <div class="section">
          <p class="name">{{ project.section.name }}</p>
        </div>

        <p class="project-description">{{ project.description }}</p>

        <router-link :to="{ name: 'project', params: { id: project.id } }" class="project-link">LINK</router-link>
      </div>
    </div>

    <div class="grid-footer">
      <p class="projects-count">
        Mamy ich już ponad
        <strong>{{ projectsCount - 1 }}</strong>
      </p>
      <link-button :to="{ name: 'projects' }" class="projects-button">Zobacz wszystkie!</link-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import LinkButton from './base/LinkButton.vue';
import SectionHeader from '@/components/NewDesign/SectionHeader.vue';
import { ProjectInfo } from '@/store/modules/projects';

@Component({
  components: {
    LinkButton,
    SectionHeader
  }
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
    border-radius: 20px;
    width: 100%;
    height: 100%;
    min-height: 580px;
    grid-row-end: span 2;
    background-size: cover;
    background-position: center;

    &:hover {
      .tile-content {
        opacity: 1;
      }
    }

    .tile-content {
      background-color: color.change($primary, $alpha: 0.8);
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 50px;
      color: $body-bg;
      border-radius: 20px;
      height: 100%;
      opacity: 0;
      transition: opacity 0.3s;

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
        }
      }

      .project-description {
        margin: 0;
        font-size: 20px;
      }

      .project-link {
        width: 50px;
        height: 50px;
        align-self: flex-end;
        color: $body-bg;
        transition: color 0.3s;

        &:hover {
          color: $primary;
        }
      }
    }
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
