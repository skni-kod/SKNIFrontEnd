<template>
  <v-card outlined class="ma-2">
    <v-card-text>
      <v-form v-model="inputValidated">
        <v-text-field
          clearable
          label="Ikonka sekcji (https://materialdesignicons.com)"
          v-model="Section.icon"
          :rules="[required]"
        ></v-text-field>
        <v-text-field
          clearable
          label="Nazwa sekcji"
          v-model="Section.name"
          :rules="[required]"
        ></v-text-field>
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
import { SectionModel } from '@/models/SectionModel';
import beAxios from '@/axios';

@Component
export default class SectionEditor extends Vue {
  @Prop({ required: true }) public readonly value!: SectionModel;

  private created() {
    if (this.Section.gallery === undefined) {
      this.Section.gallery = [];
    }
  }
  get Section() {
    return this.value;
  }

  set Section(val: SectionModel) {
    this.$emit('input', val);
  }

  @Watch('$data.inputValidated')
  private validationchanged() {
    this.$emit('validation', this.$data.inputValidated);
  }

  private data() {
    return {
      inputValidated: false,
      required: (value: string) => !!value || 'Pole wymagane',
    };
  }
}
</script>