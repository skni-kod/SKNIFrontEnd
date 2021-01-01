<template>
  <v-card outlined class="ma-2">
    <v-card-text>
      <v-row
        no-gutters
        justify="space-around"
        v-if="Project.creation_date && Project.publication_date"
      >
        <v-col cols="12" sm="auto">
          <p>
            Data utworzenia:
            {{ Project.creation_date | moment('DD.MM.YYYY hh:mm:ss') }}
          </p>
        </v-col>
        <v-col cols="12" sm="auto">
          <p>
            Data publikacji:
            {{ Project.publication_date | moment('DD.MM.YYYY hh:mm:ss') }}
          </p>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-form v-model="inputValidated">
        <v-text-field clearable label="Tytuł projektu" v-model="Project.title" :rules="[required]"></v-text-field>
        <element-selector
          v-model="projAuthors"
          :items="users"
          itemtext="fullname"
          rules="true"
          label="Wyszukaj i wybierz autorów"
        ></element-selector>
        <element-selector
          v-model="Section"
          :items="allSections"
          itemtext="name"
          rules="true"
          label="Wybierz sekcję"
          :multiple=false
        ></element-selector>
        <link-list-input v-model="Links"></link-list-input>
        <markdown-editor v-model="Project.text" rules="true" label="Treść opisu projektu"></markdown-editor>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { ProjectModel } from '@/models/ProjectModel';
import { SectionModel } from '@/models/SectionModel';
import axios from '../axios';

@Component
export default class ProjectEditor extends Vue {
  @Prop({ required: true }) public readonly project!: ProjectModel;
  @Prop({ required: true }) public readonly authors!: number[];
  @Prop({ required: true }) public readonly section!: number;
  @Prop({ required: true }) public readonly links!: object[];
  @Prop({ required: true }) public readonly allSections!: SectionModel[];

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

  get Section() {
    return this.section;
  }

  set Section(val: number) {
    this.$emit('sectionUpdated', val);
  }

  get Links() {
    return this.links;
  }

  set Links(links: object[]) {
    this.$emit('linksEdited', links);
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