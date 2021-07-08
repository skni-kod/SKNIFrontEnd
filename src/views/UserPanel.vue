<template>
  <v-row align="center" class="fill-height">
    <v-col class="py-0">
      <v-row align="center" justify="center" class="mx-2">
        <v-card width="600">
          <v-card-title
            class="white--text primary pb-2"
          >Witaj {{ user.first_name || 'Gal' }} {{ user.last_name || 'Anonim' }}!</v-card-title>
          <v-card-subtitle class="white--text primary">{{user.username}}</v-card-subtitle>
          <v-divider></v-divider>
          <v-row justify="center">
            <v-btn-cap color="primary" class="mt-10" :to="{name:'userProfile',params:{id:user.profile}}">
              <v-icon left>mdi-card-account-details</v-icon>
              <span>Mój profil</span>
            </v-btn-cap>
          </v-row>
          <p class="text-subtitle-1 font-weight-bold text-center mt-7">Opcje profilu</p>
          <v-row class="mx-2" justify="center">
            <v-btn-cap color="primary" class="ma-1" :to="{name:'UserEditChange'}">
              <v-icon left>mdi-text-account</v-icon>
              <span>Zmień opis profilu</span>
            </v-btn-cap>
            <v-btn-cap color="primary" class="ma-1" :to="{name:'UserPassChange'}">
              <v-icon left>mdi-lock-reset</v-icon>
              <span>Zmień hasło</span>
            </v-btn-cap>
            <v-btn-cap disabled color="primary" class="mt-1 ml-1">
              <v-icon left>mdi-email-edit</v-icon>
              <span>Zmień e-mail</span>
            </v-btn-cap>
            <v-btn-cap color="error" class="mb-10 mt-10" @click="logout">
              <v-icon left>mdi-logout</v-icon>
              <span>Wyloguj</span>
            </v-btn-cap>
          </v-row>
        </v-card>
      </v-row>
      <v-row align="center" justify="center" class="ma-10">
        <v-card width="1000">
          <v-card-title class="white--text primary">Opis profilu</v-card-title>
          <v-card-text class="py-1">
            <markdown-it-vue
              class="md-body text-left"
              :content="profile.description || '## <center>Brak opisu. Napisz coś o sobie :)</center>'"
              :options="markdownOptions"
            />
          </v-card-text>
        </v-card>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UserPanel extends Vue {

  get user() {
    return this.$store.getters.user;
  }

  get profile() {
    return this.$store.getters.profile;
  }

  private logout() {
    this.$store.dispatch('logout');
  }

  private data() {
    return {
      markdownOptions: {
        markdownIt: {
          html: true,
          linkify: true,
        },
        githubToc: {
          anchorLink: false,
        },
      },
    };
  }
}
</script>