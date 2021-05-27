<template>
  <v-footer id="footer" height="auto" class="pa-0">
    <v-col class="pa-0">
      <v-img width="120" src="../assets/logo_color.png" class="ma-auto" />
      <v-row justify="center">
        <p class="ma-0">
          <strong>SKNI KOD</strong>
          &nbsp; &copy;{{ new Date().getFullYear() }}
        </p>
        <v-btn
          href="https://www.facebook.com/skni.kod/"
          small
          icon
          text
          color="primary"
          class="font-weight-bold mx-2"
          target="_blank"
        >
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
      </v-row>
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>
