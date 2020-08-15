<template>
  <v-row align="center" style="height: 100%;">
    <v-col cols="12">
      <h1 class="text-h1 font-weight-black">404</h1>
      <h1 class="text-h2 font-weight-bold">Strona nie istnieje!</h1>
      <v-container class="pt-5 px-1">
        <v-layout row wrap justify-space-between>
          <v-flex xs12 :md6="$router.history.length > 0" class="mx-2">
            <v-btn class="primary" router :to="{name: 'home'}">
              <v-icon left>mdi-home</v-icon>
              <span>Powrót na stronę główną</span>
            </v-btn>
          </v-flex>
          <v-flex v-if="$router.history.length > 0" xs12 md6 class="mx-2">
            <v-btn class="primary" @click="$router.go(-1);">
              <v-icon left>mdi-keyboard-return</v-icon>
              <span>Powrót na poprzednią stronę</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class Page404 extends Vue {}
</script>
