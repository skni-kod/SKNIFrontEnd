<template>
  <v-row class="fill-height" align="center" justify="center">
    <v-card width="600">
      <v-card-title class="white--text primary">Zmiana hasła</v-card-title>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UserPasswordChange extends Vue {
  private route(link: string) {
    this.$router.push(link);
  }

  get user() {
    return this.$store.getters.user;
  }

  private data() {
    return {};
  }
}
</script>