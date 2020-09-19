<template>
  <v-card>
    <v-card-text >
      <v-row align="center" v-for="(item, i) in list" :key="i">
        <v-col>
          <v-text-field clearable></v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-btn @click="list.splice(i - 1, 1)">Usuń</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="list.push('')">Dodaj</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class StringListInput extends Vue {
  @Prop({ required: true }) public readonly value!: any;

  get list() {
    return this.value;
  }

  set list(data: any) {
    this.$emit('input', data);
  }
}
</script>