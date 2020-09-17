<template>
  <v-card outlined class="ma-2">
    <v-card-text>
      <v-form v-model="inputValidated">
        <v-layout
          v-if="Project.creation_date && Project.publication_date"
          wrap
          justify-space-between
        >
          <v-flex xs12 sm6>
            <p
              class="text-center"
            >Data utworzenia: {{ Project.creation_date | moment("DD.MM.YYYY hh:mm:ss") }}</p>
          </v-flex>
          <v-flex xs12 sm6>
            <p
              class="text-center"
            >Data publikacji: {{ Project.publication_date | moment("DD.MM.YYYY hh:mm:ss") }}</p>
          </v-flex>
        </v-layout>
        <v-divider v-if="Project.creation_date && Project.publication_date" />
        <v-text-field clearable label="Tytuł projektu" v-model="Project.title" :rules="[required]"></v-text-field>
        <element-selector
          v-model="projAuthors"
          :items="users"
          itemtext="fullname"
          rules="true"
          label="Wyszukaj i wybierz autorów"
          class="mt-4"
        ></element-selector>
        <markdown-editor v-model="Project.text" rules="true" label="Treść opisu projektu"></markdown-editor>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { ProjectModel } from '@/models/ProjectModel';
import axios from '../axios';

@Component
export default class ArticleEditor extends Vue {
  @Prop() public readonly project!: ProjectModel;
  @Prop() public readonly authors!: number[];

  private created() {
    this.getAllusers();
  }

  get Project() {
    return this.project;
  }

  set Project(project: ProjectModel) {
    this.$emit('projectEdited', project);
  }

  get projAuthors() {
    return this.authors;
  }

  set projAuthors(data: number[]) {
    this.$emit('authorsEdited', data);
  }

  private getAllusers() {
    axios.get('api/users/').then((res) => {
      this.$data.users = res.data;
      this.$data.users.forEach((element: any) => {
        element.fullname =
          element.first_name +
          ' "' +
          element.username +
          '" ' +
          element.last_name;
      });
    });
  }

  @Watch('$data.inputValidated')
  private validationchanged() {
    this.$emit('validation', this.$data.inputValidated);
  }

  private data() {
    return {
      inputValidated: false,
      users: [],
      required: (value: string) => !!value || 'Pole wymagane',
    };
  }
}
</script>