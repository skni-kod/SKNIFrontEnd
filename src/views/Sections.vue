<template>
  <div class="sections">
    <h1>TOur sections</h1>
    <ul id="example-1">
      <li v-for="section in sections">{{ section.name + " " + section.description}}</li>
</ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import { SectionsService } from '@/services/SectionsService';
import { SectionModel } from '@/models/SectionModel';
@Component({
  components: {
    HelloWorld,
  },
})
export default class Section extends Vue {
  private sectionsService!: SectionsService;
  private sections!: SectionModel[];
  constructor() {
    super();
    this.sectionsService = new SectionsService();
  }
  public async mounted() {
    this.sections = await this.sectionsService.getAllSections();
  }
  public data() {
    return { sections: this.sections };
  }
}
</script>