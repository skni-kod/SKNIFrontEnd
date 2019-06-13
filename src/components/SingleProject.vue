<template>
  <div v-if="project != undefined" class="projectContainer">
    <h3 class="display-2">{{ project.title }}</h3>

    <div class="projectDate">
      <p>Data wykonania: <b>{{ project.publication_date.split('Z')[0].replace('T', ' ') }}</b></p>
    </div>
    
    <div v-if="project.repository_link" class="projectRepo">
      <p style="margin-right: 10px;">Repozytorium:</p>
      <img class="github" src="../assets/github.png" />
      <a :href="project.repository_link">{{ project.repository_link }}</a>
    </div>

    <vue-markdown class='text-shadow-paragraph projectText'>{{project.text}}</vue-markdown>
    
    <div class="sectionContainer">
      <p class="sectionName">
        Made with <span class="heart">❤</span> by 
        <b>{{ project.creator.user.first_name }} {{ project.creator.user.last_name }}
        </b> at <b>{{ project.section.name }}</b>
      </p>
    </div>
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

<style scoped>
.projectContainer {
  width: 80%;
  margin: 50px auto 0 auto;
  text-align: left;
}

.projectText {
  margin: 40px 0 20px 0;
  width: 100%;
  font-size: 1.2em;
  line-height: 1.7em;
  text-align: justify;
  display: flex;
  flex-direction: column;
}

.github {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.projectDate {
  font-size: 1.2em;
  margin-top: 20px;
}

.sectionContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  padding-left: 0;
  margin-top: 40px;
  justify-content: center;
}

.sectionIcon {
  width: 30px;
  height: 30px;
}

.sectionName {
  margin: 0;
  font-size: 1em;
}

.heart {
  color: red;
  font-size: 1.5em;
}

.projectRepo {
  display: flex;
  flex-direction: row;
  font-size: 1.2em;
  margin-top: 20px;
}
</style>
