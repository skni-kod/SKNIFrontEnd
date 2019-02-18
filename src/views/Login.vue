<template>
  <v-container>
    <v-layout row class='text-xs-center'>
      <v-flex xs4 class='grey lighten-4'>
        <v-container class='text-xs-center'>
          <v-card flat>
            <v-card-title primary-title>
              <h4>Login</h4>
            </v-card-title>
            <v-form>
              <v-text-field prepend-icon='person' name='Username' label='Username' v-model='login'></v-text-field>
              <v-text-field
                prepend-icon='lock'
                name='Password'
                label='Password'
                type='password'
                v-model='password'
              ></v-text-field>
              <v-card-actions>
                <v-btn primary large block @click='loginUser()'>Login</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-btn primary large block @click='logout()'>Logout</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-btn primary large block @click='refresh()'>Token</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-btn primary large block @click='testToken()'>Add thing</v-btn>
              </v-card-actions>
            </v-form>

            <div v-if='isLogged()'>Kappa</div>
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
export default class Login extends Vue {
  private login: string = '';
  private password: string = '';

  private async loginUser() {
    const res = await login(this.login, this.password);
    if (res.status === 200) {
      this.$forceUpdate();
    }
  }

  private logout(): void {
    logout();
    this.$forceUpdate();
  }

  private isLogged(): boolean {
    const a = isLoggedIn();
    return a;
  }

  private refresh() {
    refreshToken();
  }

  private testToken() {
    const header = createAuthHeader();

    Axios.post(
      'http://localhost:8000/tags/',
      { name: 'Kappa' },
      { headers: header },
    ).then((res) => {
      console.log(res.status + ' -> Refresh token');
    });
  }
}
</script>
