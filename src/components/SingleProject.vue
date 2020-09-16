<template>
  <div v-if="project != undefined">
    <v-layout class="ma-2">
      <v-flex xs12 sm10 md8 lg6 offset-sm1 offset-md2 offset-lg3>
        <v-card tile elevation="0">
          <v-card-title style="word-break: break-word;">
            <p class="text-h2 text-left mb-0">{{ project.title }}</p>
          </v-card-title>
          <v-card-subtitle class="text-left pb-0">
            <v-chip label>
              <v-avatar left>
                <v-icon>mdi-account-circle</v-icon>
              </v-avatar>
              <span>{{ project.creator.user.username }}</span>
            </v-chip>
            <p class="mb-0">
              Data publikacji:
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
            <markdown-it-vue
              class="md-body text-left"
              :content="project.text"
              :options="markdownOptions"
            />
          </v-card-text>
        </v-card>
        <gallery breakpoints="xs6" :imgs="project.gallery" />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 md10 offset-md1 class="text-center">
        <p>
          Made with
          <v-icon color="red">mdi-heart</v-icon>by
        </p>
        <div v-for="author in project.authors" :key="author.user.username">
          <p>
            <b>{{ author.user.first_name }} {{ author.user.last_name }}</b>
          </p>
        </div>
        <p>
          at
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
  public data() {
    return {
      markdownOptions: {
        markdownIt: {
          html: true,
          linkify: true,
        },
        githubToc: {
          anchorLink: false,
        },
      },
    };
  }
}
</script>
