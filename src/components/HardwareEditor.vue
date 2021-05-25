<template>
  <v-card outlined class="ma-2">
    <v-card-text>
      <v-form v-model="inputValidated">
        <v-text-field
          clearable
          label="Nazwa sprzętu"
          v-model="hardware.name"
          :rules="[required]"
        ></v-text-field>
        <element-selector
          v-model="Status"
          :items="allStatus"
          rules="true"
          itemtext="name"
          label="Wyszukaj i wybierz status"
          class="mt-4"
          :multiple="false"
        ></element-selector>
        <v-text-field
          clearable
          label="Numer seryjny"
          v-model="hardware.serial_number"
          :rules="[required]"
        ></v-text-field>
        <markdown-editor
          v-model="hardware.description"
          rules="true"
          label="Treść opisu sprzętu"
        ></markdown-editor>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { HardwareModel } from '@/models/HardwareModel';
import beAxios from '../axios';

@Component
export default class HardwareEditor extends Vue {
  @Prop({ required: true }) public readonly hardware!: HardwareModel;
  @Prop({ required: true }) public readonly status!: object;

  get Hardware() {
    return this.hardware;
  }
  set Hardware(hardware: HardwareModel) {
    this.$emit('hardwareEdited', hardware);
  }
  get Status() {
    return this.status;
  }
  set Status(status:object) {
    this.$emit('statusEdited', status);
  }
  @Watch('$data.inputValidated')
  private validationchanged() {
    this.$emit('validation', this.$data.inputValidated);
  }

  private data() {
    return {
      inputValidated: false,
      required: (value: string) => !!value || 'Pole wymagane',
      allStatus: [
        { name: 'Available' },
        { name: 'Rented' },
        { name: 'Unavailable' },
      ],
    };
  }
}
</script>