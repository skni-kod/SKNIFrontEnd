<template>
  <v-row class="fill-height" align="center">
    <v-col cols="12">
      <v-row justify="center">
        <v-card class="elevation-12 ma-2" width="500">
          <v-toolbar color="primary">
            <v-toolbar-title class="white--text font-weight-bold">Zaloguj się</v-toolbar-title>
          </v-toolbar>
          <v-form v-model="inputValidated" @submit.prevent="loginUser()">
            <v-card-text class="pb-0">
              <v-text-field
                outlined
                v-model="login"
                prepend-icon="mdi-account"
                :rules="[rules.required, rules.counterLogin]"
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
                :rules="[rules.required, rules.counterPass]"
                label="Hasło"
                color="primary"
                :type="showPass ? 'text' : 'password'"
                class="my-2"
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!inputValidated || !login.length >= 3 || !password.length >= 8"
                color="primary"
                type="submit"
              >
                <span class="font-weight-bold">Zaloguj</span>
                <v-icon right>mdi-key</v-icon>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <p class="my-auto">Nie masz konta?</p>
        </v-col>
        <v-col cols="auto">
          <v-btn outlined text color="primary" @click="$router.push('/register')">
            <v-icon left>mdi-database-plus</v-icon>
            <span>Zarejestruj się!</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { login } from '../helpers/auth';
import Axios from 'axios';

@Component
export default class Login extends Vue {
  private login: string = '';
  private password: string = '';

  private async loginUser() {
    const res = await login(this.login, this.password);
    if (res.status === 200) {
      this.$forceUpdate();
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
        counterLogin: (value: string) => value.length >= 3 || 'Minimum 3 znaki',
        counterPass: (value: string) => value.length >= 8 || 'Minimum 8 znaków',
      },
    };
  }
}
</script>
