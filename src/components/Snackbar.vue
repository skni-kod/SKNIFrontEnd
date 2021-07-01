<template>
  <v-snackbars :objects.sync="snackbars" timeout="5000" bottom>
    <template v-slot:action="{ close }">
      <v-btn text @click="close()">Zamknij</v-btn>
    </template>
  </v-snackbars>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import VSnackbars from 'v-snackbars/v-snackbars.vue';

@Component({
  components: {
    VSnackbars,
  },
})
export default class Snackbar extends Vue {
  get snackbars() {
    return this.$store.getters.snackbars;
  }
  set snackbars(value: object) {
    this.$store.dispatch('setSnackbars', value);
  }
}
</script>