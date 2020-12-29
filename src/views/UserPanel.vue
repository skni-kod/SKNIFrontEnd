<template>
  <v-row align="center" class="fill-height">
    <v-col class="py-0">
      <v-row align="center" justify="center" class="mx-2">
        <v-card width="600">
          <v-card-title
            class="white--text primary pb-2"
          >Witaj {{user.first_name}} {{user.last_name}}!</v-card-title>
          <v-card-subtitle class="white--text primary">{{user.username}}</v-card-subtitle>
          <v-divider></v-divider>
          <v-row wrap justify="center">
            <v-btn color="primary" class="mt-10" :to="'/user/profile/' + user.id">
              <v-icon left>mdi-card-account-details</v-icon>
              <span>Mój profil</span>
            </v-btn>
          </v-row>
          <p class="text-subtitle-1 font-weight-bold text-center mt-7">Opcje profilu</p>
          <v-row wrap class="mx-2" justify="center">
            <v-btn color="primary" class="ma-1" to="/user/descriptionchange">
              <v-icon left>mdi-text-account</v-icon>
              <span>Zmień opis profilu</span>
            </v-btn>
            <v-btn color="primary" class="ma-1" to="/user/passwordchange">
              <v-icon left>mdi-lock-reset</v-icon>
              <span>Zmień hasło</span>
            </v-btn>
            <v-btn disabled color="primary" class="mt-1 ml-1">
              <v-icon left>mdi-email-edit</v-icon>
              <span>Zmień e-mail</span>
            </v-btn>
            <v-btn color="error" class="my-10" @click="logout">
              <v-icon left>mdi-logout</v-icon>
              <span>wyloguj</span>
            </v-btn>
          </v-row>
        </v-card>
      </v-row>
      <v-row align="center" justify="center" class="ma-10">
        <v-card width="1000">
          <v-card-title class="white--text primary">Opis profilu</v-card-title>
          <v-card-text class="py-1">
            <markdown-it-vue
              class="md-body text-left pa-3"
              :content="user.profile.description || '## <center>Brak opisu. Napisz coś o sobie :)</center>'"
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