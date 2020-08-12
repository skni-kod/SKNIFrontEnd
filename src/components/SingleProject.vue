<template>
  <div v-if="project != undefined">
    <v-layout class="ma-2">
      <v-flex xs12 sm10 md8 lg6 offset-sm1 offset-md2 offset-lg3>
        <v-card tile elevation="0">
          <v-card-title style="word-break: break-word;">
            <p class="text-h2 text-left mb-0">{{ project.title }}</p>
          </v-card-title>
          <v-card-subtitle class="text-left pb-0">
            <p class="mb-0">
              Data wykonania:
              <b>{{ project.publication_date | moment("YYYY-MM-DD HH:mm:ss") }}</b>
            </p>
          </v-card-subtitle>
          <v-card-actions v-if="project.repository_link" class="py-0 ml-2">
            <v-btn
              class="purple darken-2 white--text"
              :href="project.repository_link"
              target="_blank"
            >
              <v-icon left class>mdi-github</v-icon>
              <span>Repozytorium</span>
            </v-btn>
            <v-spacer />
          </v-card-actions>
          <v-card-text>
            <markdown-it-vue class="md-body text-left" :content="project.text" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 md10 offset-md1>
        <p>
          Made with
          <v-icon color="red">mdi-heart</v-icon>by
          <b>{{ project.creator.user.first_name }} {{ project.creator.user.last_name }}</b> at
          <b>{{ project.section.name }}</b>
        </p>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProjectModel } from '@/models/ProjectModel';

@Component
export default class SingleProject extends Vue {
  @Prop() public project!: ProjectModel;
}
</script>
