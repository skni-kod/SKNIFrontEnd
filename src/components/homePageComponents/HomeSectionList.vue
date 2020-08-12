<template>
  <v-container grid-list-md text-xs-center>
    <h2 class="display-2">Nasze sekcje</h2>
    <v-layout align-space-between justify-center row fill-height wrap>
      <v-flex xs12 md6 lg4 v-for="section in sections" :key="section.title">
        <v-card class="elevation-0 tile">
          <v-card-title>
            <v-row class="mx-auto">
              <v-col cols="auto" class="text-center py-0">
                <v-row justify="center" class="flex-column ma-0 fill-height">
                  <v-icon x-large left color="primary">{{section.icon}}</v-icon>
                </v-row>
              </v-col>
              <v-col class="pa-0">
                <v-row justify="center" class="flex-column ma-0 fill-height">
                  <p
                    class="text-left text-h6 font-weight-thin my-auto" style="word-break: break-word;"
                  >{{ section.name }}</p>
                </v-row>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text class="text-xs-justify">{{section.description}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SectionModel } from '@/models/SectionModel';
@Component
export default class HomeSectionsList extends Vue {
  @Prop() public sections!: SectionModel[];
}
</script>
