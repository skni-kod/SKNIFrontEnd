<template>
  <v-card outlined class="ma-2">
    <v-card-text>
      <v-form v-model="inputValidated">
        <v-text-field
          clearable
          label="Ikonka sekcji (używaj tych: https://materialdesignicons.com)"
          v-model="Section.icon"
          :rules="[required]"
        ></v-text-field>
        <v-text-field
          clearable
          label="Nazwa sekcji"
          v-model="Section.name"
          :rules="[required]"
        ></v-text-field>
        <element-selector
          v-model="sectionCoordinators"
          :items="users"
          itemtext="fullname"
          label="Wyszukaj i wybierz koordynatorów sekcji"
        ></element-selector>
        <markdown-editor
          v-model="Section.description"
          rules="true"
          label="Treść opisu sekcji"
        ></markdown-editor>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <gallery-editor v-model="Section.gallery"></gallery-editor>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import beAxios from '@/axios';

@Component
export default class SectionEditor extends Vue {
  @Prop({ required: true }) public readonly section!: number;

  private created() {
    this.getAllusers();
  }
  get Section() {
    return this.section;
  }

  set Section(val: number) {
    this.$emit('sectionUpdated', val);
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

  @Watch('$data.inputValidated')
  private validationchanged() {
    this.$emit('validation', this.$data.inputValidated);
  }

  private data() {
    return {
      sectionCoordinators: [],
      inputValidated: false,
      users: [],
      required: (value: string) => !!value || 'Pole wymagane',
    };
  }
}
</script>