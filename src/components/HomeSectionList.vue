<template>
  <v-card tile elevation="0">
    <v-card-title class="text-h3 justify-center py-1"
      >Nasze sekcje</v-card-title
    >
    <v-card-text class="pa-0">
      <v-row no-gutters justify="center">
        <v-col
          class="pa-1"
          cols="12"
          md="6"
          lg="4"
          v-for="section in sections"
          :key="section.title"
        >
          <v-card outlined height="100%">
            <v-card-title>
              <v-row class="mx-auto">
                <v-col cols="auto" class="text-center py-0">
                  <v-row justify="center" class="flex-column ma-0 fill-height">
                    <v-icon x-large left color="primary">{{
                      section.icon
                    }}</v-icon>
                  </v-row>
                </v-col>
                <v-col class="pa-0">
                  <v-row justify="center" class="flex-column ma-0 fill-height">
                    <p
                      class="text-left text-h6 font-weight-thin my-auto"
                      style="word-break: break-word"
                    >
                      {{ section.name }}
                    </p>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text class="text-xs-justify text-left">{{
              section.description
            }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SectionModel } from '@/models/SectionModel';
@Component
export default class HomeSectionsList extends Vue {
  @Prop() public sections!: SectionModel[];
}
</script>
