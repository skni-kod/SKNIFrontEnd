<template>
  <div class="ma-2">
    <v-row justify="center" v-for="section in sections" :key="section.name">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <section-card class="my-2" :section="section" :projects="projects">
        </section-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { SectionsService } from '@/services/SectionsService';
import { SectionModel } from '@/models/SectionModel';
import SectionCard from '@/components/SectionCard.vue';
import { ProjectsService } from '@/services/ProjectsService';

@Component({
  components: {
    SectionCard,
  },
})
export default class SectionList extends Vue {
  private sectionsService!: SectionsService;
  private sections!: SectionModel[];
  private projectsService!: ProjectsService;
  constructor() {
    super();
    this.sectionsService = new SectionsService();
    this.projectsService = new ProjectsService();
  }
  public created() {
    this.projectsService.getAllProjects().then((res) => {
      this.$data.projects = res;
    });
    this.sectionsService.getAllSections().then((p) => {
      this.sections = p;
      for (let i = 0; i < this.sections.length; ) {
        if (this.sections[i].isVisible === false) {
          this.sections.splice(i, 1);
        } else {
          i++;
        }
      }
    });
  }
  public data() {
    return { sections: this.sections, projects: [] };
  }
}
</script>
