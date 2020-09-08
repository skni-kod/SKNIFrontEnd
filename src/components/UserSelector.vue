<template>
  <v-autocomplete
    v-model="selected"
    :items="users"
    clearable
    chips
    hide-selected
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
      <v-alert type="info" class="ma-0">Wszyscy uzytkownicy zostali wybrani!</v-alert>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from '../axios';

@Component
export default class UserSelector extends Vue {
  private data() {
    return {
      users: [],
      selected: [],
    };
  }

  private created() {
    this.getAllusers();
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
    const index = this.$data.selected.indexOf(item.id);
    if (index >= 0) {
      this.$data.selected.splice(index, 1);
    }
  }
}
</script>