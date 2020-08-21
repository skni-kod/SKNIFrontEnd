<template>
  <v-row class="fill-height" align="center">
    <v-col cols="12">
      <v-row justify="center">
        <v-card class="elevation-12 ma-2" width="500">
          <v-toolbar color="primary">
            <v-toolbar-title class="white--text font-weight-bold">Zaloguj się</v-toolbar-title>
          </v-toolbar>
          <v-form v-model="inputValidated" @submit.prevent="loginUser()">
            <v-card-text>
              <v-text-field
                outlined
                hide-details
                v-model="login"
                prepend-icon="mdi-account"
                label="Login"
                color="primary"
                type="text"
                class="my-2"
              ></v-text-field>
              <v-text-field
                outlined
                hide-details
                v-model="password"
                prepend-icon="mdi-lock"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPass = !showPass"
                label="Hasło"
                color="primary"
                :type="showPass ? 'text' : 'password'"
                class="my-2"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
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
    };
  }
}
</script>
