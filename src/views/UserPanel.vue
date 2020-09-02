<template>
  <v-row class="fill-height ma-2" align="center" justify="center">
    <v-card width="600">
      <v-card-title class="white--text primary pb-2">Witaj {{user.first_name}} {{user.last_name}}!</v-card-title>
      <v-card-subtitle class="white--text primary">{{user.username}}</v-card-subtitle>
      <v-divider></v-divider>
      <v-row wrap justify="center">
        <v-btn color="primary" class="ma-2">
          <v-icon left>mdi-menu</v-icon>
          <span>Moje artykuły</span>
        </v-btn>
      </v-row>
      <p class="text-subtitle-1 font-weight-bold text-center ma-1">Opcje profilu</p>
      <v-row wrap class="mx-2" justify="center">
        <v-btn color="primary" class="ma-2" to="/user/passwordchange">
          <v-icon left>mdi-lock-reset</v-icon>
          <span>Zmień hasło</span>
        </v-btn>
        <v-btn disabled color="primary" class="ma-2">
          <v-icon left>mdi-email-edit</v-icon>
          <span>Zmień e-mail</span>
        </v-btn>
        <v-btn color="error" class="ma-2" @click="logout">
          <v-icon left>mdi-logout</v-icon>
          <span>wyloguj</span>
        </v-btn>
      </v-row>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UserPanel extends Vue {
  private route(link: string) {
    this.$router.push(link);
  }

  get user() {
    return this.$store.getters.user;
  }

  private logout() {
    this.$store.dispatch('logout');
  }

  private data() {
    return {};
  }
}
</script>