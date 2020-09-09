<template>
  <v-autocomplete
    v-model="selected"
    :items="items"
    clearable
    chips
    hide-selected
    :hide-details="!rules"
    :rules="rules ? [required] : []"
    :label="label"
    :item-text="itemtext"
    :item-value="itemvalue"
    multiple
  >
    <template v-slot:selection="data">
      <v-chip small close @click:close="remove(data.item[itemvalue])">{{ data.item[itemtext] }}</v-chip>
    </template>
    <template v-slot:item="data">
      <v-list-item-content>
        <v-list-item-title>{{ data.item[itemtext] }}</v-list-item-title>
      </v-list-item-content>
    </template>
    <template v-slot:no-data>
      <v-alert type="info" class="ma-0">Brak wyników!</v-alert>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component
export default class ElementSelector extends Vue {
  @Prop({ default: '' }) public readonly label!: string;
  @Prop({ required: true }) public readonly value!: number[];
  @Prop({ required: true }) public readonly items!: object[];
  @Prop({ required: true }) public readonly itemtext!: string;
  @Prop({ default: 'id' }) public readonly itemvalue!: string;
  @Prop({ default: false }) public readonly rules!: any;

  get selected() {
    return this.value;
  }

  set selected(data: number[]) {
    this.$emit('input', data);
  }

  private data() {
    return {
      required: (value: number[]) => value.length > 0 || 'Pole wymagane',
      users: [],
    };
  }

  private remove(item: any) {
    const index = this.selected.indexOf(item);
    if (index >= 0) {
      this.selected.splice(index, 1);
    }
  }
}
</script>