<template>
  <v-row class="fill-height mx-1" align="center" justify="center">
    <v-col cols="12" sm="11" md="10" lg="8" xl="6">
      <v-row class="fill-height ma-2" align="center" justify="center">
        <v-card width="1200">
          <v-card-title class="white--text primary">Zmień opis profilu</v-card-title>
          <v-card-text class="py-0">
            <markdown-editor v-model="text" label="Opis profilu"></markdown-editor>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn-cap color="success" @click="editDescription">
              <v-icon left>mdi-content-save</v-icon>
              <span>Zapisz zmiany</span>
            </v-btn-cap>
            <v-btn-cap color="error" :to="'/user/panel'">
              <v-icon left>mdi-cancel</v-icon>
              <span>Anuluj edycję</span>
            </v-btn-cap>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import beAxios from '../axios';

@Component
export default class UserPasswordChange extends Vue {
  private created() {
    this.$data.text = this.profile.description;
  }

  private editDescription() {
    beAxios
      .patch(
        'api/profiles/' + this.profile.id + '/',
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
        this.$store.dispatch('fetchUserProfile');
        this.$store.dispatch('setSnackbarState', {
          state: true,
          msg: 'Opis profilu został zaktualizowany',
          color: 'success',
          timeout: 7500,
        });
        this.$router.push({name:'userPanel'});
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

  get profile() {
    return this.$store.getters.profile;
  }

  private data() {
    return {
      text: '',
    };
  }
}
</script>