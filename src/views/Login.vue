<template>
  <v-row class="login-section fill-height pa-4" align="center">
    <v-col cols="12" class="pa-0">
      <v-row no-gutters justify="center">
        <v-card class="elevation-12" width="500">
          <v-toolbar color="primary">
            <v-toolbar-title class="white--text font-weight-bold"
              >Zaloguj się</v-toolbar-title
            >
          </v-toolbar>
          <v-form v-model="inputValidated" @submit.prevent="loginUser()">
            <v-card-text class="pb-0">
              <v-text-field
                autofocus
                outlined
                v-model="login"
                prepend-icon="mdi-account"
                :rules="[rules.required, rules.counter(login, 3, 'i')]"
                label="Login"
                color="primary"
                type="text"
                class="my-2"
              ></v-text-field>
              <v-text-field
                outlined
                v-model="password"
                prepend-icon="mdi-lock"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPass = !showPass"
                :rules="[rules.required, rules.counter(password, 8, 'ów')]"
                label="Hasło"
                color="primary"
                :type="showPass ? 'text' : 'password'"
                class="my-2"
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-spacer></v-spacer>
              <v-btn-cap
                :disabled="!inputValidated"
                color="primary"
                type="submit"
              >
                <span class="font-weight-bold">Zaloguj</span>
                <v-icon right>mdi-key</v-icon>
              </v-btn-cap>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-row>
      <!-- <v-row justify="center"> TODO
        <v-btn-cap disabled class="white--text mt-4 mb-2 mx-2" color="purple">
          <v-icon left>mdi-github</v-icon>
          <span>Zaloguj się poprzez GitHub</span>
        </v-btn-cap>
      </v-row> -->
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <p class="my-auto">Nie masz konta?</p>
        </v-col>
        <v-col cols="auto">
          <v-btn-cap
            text
            color="primary"
            @click="$router.push({ name: 'register' })"
          >
            <v-icon left>mdi-database-plus</v-icon>
            <span>Zarejestruj się!</span>
          </v-btn-cap>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import beAxios from 'axios';

@Component
export default class Login extends Vue {
  private async loginUser() {
    if (this.$data.inputValidated) {
      this.$store.dispatch('login', {
        login: this.$data.login,
        password: this.$data.password,
      });
    }
  }

  private data() {
    return {
      inputValidated: false,
      login: '',
      password: '',
      showPass: false,
      rules: {
        required: (value: string) => !!value || 'Pole wymagane',
        counter: (value: string, num: number, end: string) =>
          value.length >= num || 'Minimum ' + num + ' znak' + end,
      },
    };
  }
}
</script>

<style lang="scss" scoped>

</style>
