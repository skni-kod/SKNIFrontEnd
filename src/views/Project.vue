<template>
  <single-project :project="project"></single-project>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ProjectsService } from '@/services/ProjectsService';
import { ProjectModel } from '@/models/ProjectModel';

@Component
export default class Project extends Vue {
  private projectsService!: ProjectsService;
  private project!: ProjectModel;

  private beforeCreate() {
    this.projectsService = new ProjectsService();
  }

  private mounted() {
    this.projectsService.getProject(+this.$route.params.id).then((project) => {
      this.project = project;
    }).catch(() => {
      this.$router.replace('/404');
    });
  }

  private data() {
    return {
      project: this.project,
    };
  }
}
</script>
