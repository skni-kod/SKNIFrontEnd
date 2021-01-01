<template>
  <div class="my-2">
    <v-row justify="center" v-for="section in sections" :key="section.title">
      <v-col>
        <v-card class="mx-auto bg-gradient" dark max-width="800">
          <v-card-title>
            <v-row class="mx-auto">
              <v-col cols="auto" class="text-center py-0">
                <v-row justify="center" class="flex-column ma-0 fill-height">
                  <v-icon x-large left>{{ section.icon }}</v-icon>
                </v-row>
              </v-col>
              <v-col class="pa-0">
                <v-row justify="center" class="flex-column ma-0 fill-height">
                  <p
                    class="text-left text-h6 font-weight-bold my-auto"
                    style="word-break: break-word"
                  >
                    {{ section.name }}
                  </p>
                </v-row>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text class="headline">{{ section.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { SectionsService } from '@/services/SectionsService';
import { SectionModel } from '@/models/SectionModel';

@Component
export default class SectionList extends Vue {
  private sectionsService!: SectionsService;
  private sections!: SectionModel[];
  constructor() {
    super();
    this.sectionsService = new SectionsService();
  }
  public mounted() {
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
    return { sections: this.sections };
  }
}
</script>

<style <style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(#aecad5, #2e5d71);
}
</style>
