<template>
  <div>
    <v-container fluid>
      <v-row wrap>
        <v-flex xs12 v-for="section in sections" :key="section.title">
          <v-card class="mx-auto my-2 bg-gradient" dark max-width="800">
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
                      style="word-break: break-word;"
                    >{{ section.name }}</p>
                  </v-row>
                </v-col>
              </v-row>
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
</style>
