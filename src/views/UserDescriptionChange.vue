<template>
  <v-row class="fill-height" align="center">
    <v-col cols="12" class="pa-0">
      <v-row class="fill-height ma-2" align="center" justify="center">
        <v-card width="1200">
          <v-card-title class="white--text primary">Zmień opis profilu</v-card-title>
          <v-card-text class="py-0">
            <markdown-editor v-model="text"></markdown-editor>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="success" @click="editDescription">
              <v-icon left>mdi-content-save</v-icon>
              <span>Zapisz zmiany</span>
            </v-btn>
            <v-btn color="error" :to="'/user/panel'">
              <v-icon left>mdi-cancel</v-icon>
              <span>Anuluj edycję</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from '../axios';

@Component
export default class UserPasswordChange extends Vue {
  private created() {
    this.$data.text = this.user.profile.description;
  }

  get user() {
    return this.$store.getters.user;
  }

  private editDescription() {
    axios
      .patch(
        'api/profiles/' + this.user.profile.id + '/',
        {
          description: this.$data.text,
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.token,
          },
        },
      )
      .then(() => {
        this.$store.dispatch('fetchUserData');
        this.$store.dispatch('setSnackbarState', {
          state: true,
          msg: 'Opis profilu został zaktualizowany',
          color: 'success',
          timeout: 7500,
        });
        this.$router.push('/user/panel');
      })
      .catch(() => {
        this.$store.dispatch('setSnackbarState', {
          state: true,
          msg: 'Błąd przy aktualizacji profilu!',
          color: 'error',
          timeout: 7500,
        });
      });
  }

  private data() {
    return {
      text: '',
    };
  }
}
</script>