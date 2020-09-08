<template>
  <v-autocomplete
    v-model="authors"
    :items="users"
    clearable
    chips
    hide-selected
    :hide-details="!rules"
    :rules="rules ? [required] : []"
    :label="label"
    item-text="fullname"
    item-value="id"
    multiple
  >
    <template v-slot:selection="data">
      <v-chip small close @click:close="remove(data.item.id)">{{ data.item.fullname }}</v-chip>
    </template>
    <template v-slot:item="data">
      <v-list-item-content>
        <v-list-item-title>{{ data.item.fullname }}</v-list-item-title>
      </v-list-item-content>
    </template>
    <template v-slot:no-data>
      <v-alert type="info" class="ma-0">Brak wyników!</v-alert>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import axios from '../axios';

@Component
export default class UserSelector extends Vue {
  @Prop({ default: '' }) public readonly label!: string;
  @Prop({ required: true }) public readonly value!: number[];
  @Prop({ default: false }) public readonly rules!: any;

  private created() {
    this.getAllusers();
  }

  get authors() {
    return this.value;
  }

  set authors(data: number[]) {
    this.$emit('input', data);
  }

  private data() {
    return {
      required: (value: number[]) => value.length || 'Pole wymagane',
      users: [],
    };
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

  private remove(item: any) {
    const index = this.authors.indexOf(item);
    if (index >= 0) {
      this.authors.splice(index, 1);
    }
  }
}
</script>