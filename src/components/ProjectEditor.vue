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
        <v-text-field
          clearable
          label="Tytuł projektu"
          v-model="Project.title"
          :rules="[required]"
        ></v-text-field>
        <element-selector
          v-model="Project.authors"
          :items="users"
          itemtext="fullname"
          rules="true"
          label="Wyszukaj i wybierz autorów"
        ></element-selector>
        <element-selector
          v-model="Project.section"
          :items="sections"
          itemtext="name"
          rules="true"
          label="Wybierz sekcję"
          :multiple="false"
        ></element-selector>
        <link-list-input v-model="Project.links"></link-list-input>
        <markdown-editor
          v-model="Project.text"
          rules="true"
          label="Treść opisu projektu"
        ></markdown-editor>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <gallery-editor v-model="Project.gallery"></gallery-editor>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { SectionsService } from '@/services/SectionsService';
import { ProjectModel } from '@/models/ProjectModel';
import { SectionModel } from '@/models/SectionModel';
import { ProfileModel } from '@/models/ProfileModel';
import beAxios from '@/axios';

@Component
export default class ProjectEditor extends Vue {
  @Prop({ required: true }) public readonly value!: ProjectModel;

  private sectionsService!: SectionsService;

  private created() {
    this.sectionsService = new SectionsService();
    this.getAllusers();
    this.getAllSections();
    this.cleanData();
  }

  get Project() {
    return this.value;
  }

  set Project(project: ProjectModel) {
    this.$emit('input', project);
  }

  private getAllusers() {
    beAxios
      .get('api/users/', {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.token,
        },
      })
      .then((res) => {
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

  private getAllSections() {
    this.sectionsService.getAllSections().then((res) => {
      this.$data.sections = res.data;
    });
  }

  private cleanData() {
    if (this.Project.authors !== undefined) {
      this.Project.authors = (this.Project.authors as ProfileModel[]).map(
        (el: ProfileModel) => {
          return el.id;
        },
      );
    }
    if (this.Project.section !== undefined) {
      this.Project.section = (this.Project.section as SectionModel).id;
    }
    if (this.Project.gallery === undefined) {
      this.Project.gallery = [];
    }
  }

  @Watch('$data.inputValidated')
  private validationchanged() {
    this.$emit('validation', this.$data.inputValidated);
  }

  private data() {
    return {
      inputValidated: false,
      users: [],
      sections: [],
      required: (value: string) => !!value || 'Pole wymagane',
    };
  }
}
</script>