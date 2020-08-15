<template>
  <v-layout>
    <v-flex xs12 sm10 md8 lg6 offset-sm1 offset-md2 offset-lg3 class="my-2">
      <v-card v-for="project in projects" :key="project.id" class="mx-1">
        <v-card-title primary-title>
          <h3 class="headline">{{ project.title }}</h3>
        </v-card-title>
        <v-divider />
        <v-card-text class="text-left">
          <markdown-it-vue class="md-body" :content="project.text.substring(0, 300) + '...'" />
        </v-card-text>
        <v-divider />
        <v-card-text class="pa-0 primary">
          <v-row class="mx-auto">
            <v-col cols="auto" class="text-center py-0">
              <v-row justify="center" class="flex-column ma-0 fill-height">
                <v-icon x-large left class="white--text">{{project.section.icon}}</v-icon>
              </v-row>
            </v-col>
            <v-col class="pa-0">
              <v-row justify="center" class="flex-column ma-0 fill-height">
                <p
                  class="white--text text-left text-h6 font-weight-black my-auto"
                >{{ project.section.name }}</p>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn depressed block color="warning" :to="'/project/'+ project.id">Zobacz więcej</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProjectModel } from '@/models/ProjectModel';
@Component
export default class ProjectsList extends Vue {
  @Prop() public projects!: ProjectModel[];
}
</script>
