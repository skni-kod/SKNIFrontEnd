<template>
  <div>
    <v-container fluid>
      <v-row wrap>
        <v-flex xs12 v-for="section in sections" :key="section.title">
          <v-card class="mx-auto my-2 bg-gradient" dark max-width="800">
            <v-card-title>
              <v-icon large left>{{ section.icon }}</v-icon>
              <span class="title break font-weight-bold">{{ section.name }}</span>
            </v-card-title>
            <v-card-text class="headline">{{ section.description }}</v-card-text>
          </v-card>
        </v-flex>
      </v-row>
    </v-container>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SectionModel } from '@/models/SectionModel';
@Component
export default class SectionsList extends Vue {
  @Prop() public sections!: SectionModel[];
}
</script>

<style <style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(#aecad5, #2e5d71);
}
.break {
  word-break: break-word;
}
</style>
