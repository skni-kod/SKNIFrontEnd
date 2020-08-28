<template>
  <v-footer id="footer" elevation="5" height="auto" color="#EEF4F9" class="pa-0">
    <v-col class="pa-0">
      <v-img width="120" src="../assets/logo_color.png" class="ma-auto" />
      <v-layout justify-center row wrap>
        <p class="grey--text ma-0">
          <strong>SKNI KOD</strong>
          &nbsp; &copy;{{ new Date().getFullYear() }}
        </p>
      </v-layout>
      <v-layout justify-center>
        <v-btn text small color="primary" class="font-weight-bold">strona główna</v-btn>
        <v-btn text small color="primary" class="font-weight-bold">o nas</v-btn>
        <v-btn text small color="primary" class="font-weight-bold">kontakt</v-btn>
        <v-btn
          href="https://www.facebook.com/skni.kod/"
          small
          icon
          text
          color="primary"
          class="font-weight-bold"
          target="_blank"
        >
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
      </v-layout>
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>
