<template>
  <v-container>
    <v-layout row class='text-xs-center'>
      <v-flex xs4 class='grey lighten-4'>
        <v-container class='text-xs-center'>
          <v-card flat>
            <v-card-title primary-title>
              <h4>Register</h4>
            </v-card-title>
            <v-form>
              <v-text-field prepend-icon='email' name='Email' label='E-mail' v-model='login'></v-text-field>
              <v-text-field prepend-icon='person' name='Username' label='Username' v-model='login'></v-text-field>
              <v-text-field
                prepend-icon='lock'
                name='Password'
                label='Password'
                type='password'
                v-model='password'
              ></v-text-field>

              <v-card-actions>
                <v-btn primary large block @click='registerUser()'>Register</v-btn>
              </v-card-actions>

            </v-form>

          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import {
  login,
  logout,
  isLoggedIn,
  refreshToken,
  createAuthHeader,
} from '../helpers/auth';
import Axios from 'axios';

@Component
export default class Register extends Vue {
  private login: string = '';
  private password: string = '';

  private async registerUser() {

  }

}
</script>
