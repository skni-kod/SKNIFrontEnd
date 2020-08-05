<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="project" v-for="project in projects" :key="project.id">
        <v-card-title primary-title>
          <h3 class="headline mb-0">{{ project.title }}</h3>
        </v-card-title>

        <v-card-text class="projectText">
          <markdown-it-vue class="md-body" :content="project.text.substring(0, 200)" />
        </v-card-text>

        <div class="cardFooter">
          <div class="sectionContainer">
            <v-icon x-large class="blue--text text--lighten-2">{{project.section.icon}}</v-icon>
            <!--<img :src="project.section.icon" class="sectionIcon" />-->
            <p class="sectionName">{{ project.section.name }}</p>
          </div>

          <v-card-actions>
            <v-btn text color="orange" :to="'/project/'+ project.id">Zobacz</v-btn>
          </v-card-actions>
        </div>
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

<style scoped>
.project {
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: left;
}

.projectText {
  padding-top: 0;
  padding-bottom: 0;
}

.sectionIcon {
  width: 20px;
  height: 20px;
}

.sectionName {
  margin: 0;
  margin-left: 10px;
  font-size: 0.8em;
}

.sectionContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
}

.cardFooter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
