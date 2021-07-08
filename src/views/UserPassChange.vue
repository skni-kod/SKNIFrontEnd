<template>
  <v-row class="fill-height" align="center">
    <v-col cols="12" class="pa-0">
      <v-row class="fill-height ma-2" align="center" justify="center">
        <v-card width="600">
          <v-card-title class="white--text primary">Zmiana hasła</v-card-title>
          <v-form v-model="inputValidated" @submit.prevent="changePasswd()">
            <v-card-text>
              <v-row align="center" justify="center" class="mx-0">
                <v-col class="pa-0">
                  <v-text-field
                    outlined
                    v-model="password1"
                    prepend-icon="mdi-lock"
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPass = !showPass"
                    :rules="[rules.required, passwdValid]"
                    label="Hasło"
                    color="primary"
                    :type="showPass ? 'text' : 'password'"
                    class="my-2"
                    @focus="passwdFocus = true"
                    @blur="passwdFocus = false"
                  ></v-text-field>
                </v-col>
                <v-col class="py-0 pr-0">
                  <v-text-field
                    outlined
                    v-model="password2"
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPass = !showPass"
                    :rules="[rules.required, rules.identical(password1, password2)]"
                    label="Powtórz hasło"
                    color="primary"
                    :type="showPass ? 'text' : 'password'"
                    class="my-2"
                  ></v-text-field>
                </v-col>
              </v-row>
              <div v-if="passwdFocus">
                <password-validator :password="password1" @validation="passwdValid = $event"></password-validator>
              </div>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-spacer></v-spacer>
              <v-btn-cap :disabled="!inputValidated" color="primary" type="submit">
                <span class="font-weight-bold">Zmień hasło</span>
                <v-icon right>mdi-lock-reset</v-icon>
              </v-btn-cap>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-row>
      <v-row align="center" justify="center" class="ma-5">
        <v-btn-cap outlined color="error" @click="$router.push({name:'userPanel'})">
          <v-icon left>mdi-cancel</v-icon>
          <span>Anuluj zmianę hasła</span>
        </v-btn-cap>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UserPassChange extends Vue {

  get user() {
    return this.$store.getters.user;
  }

  private changePasswd() {
    if (this.$data.inputValidated) {
      this.$store.dispatch('changeUserPassword', {
        password1: this.$data.password1,
        password2: this.$data.password2,
      });
    }
  }

  private data() {
    return {
      inputValidated: false,
      password1: '',
      password2: '',
      showPass: false,
      passwdFocus: false,
      passwdValid: false,
      rules: {
        required: (value: string) => !!value || 'Pole wymagane',
        identical: (value1: string, value2: string) =>
          value1 === value2 || 'Hasła nie są identyczne',
        counter: (value: string, num: number, end: string) =>
          value.length >= num || 'Minimum ' + num + ' znak' + end,
      },
    };
  }
}
</script>