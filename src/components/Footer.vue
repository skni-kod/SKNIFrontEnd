<template>
  <v-footer elevation="5" height="auto" color="#EEF4F9" class="main-footer">
    <v-img class="img" src="../assets/logo_color.png" />
    <v-layout class="rights" justify-center row wrap>
      <p>
        <strong>SKNI KOD</strong>
        &nbsp; &copy;{{ new Date().getFullYear() }}
      </p>
    </v-layout>
    <v-layout>
      <v-btn text small color="#64b5f6" class="font-weight-bold">strona główna</v-btn>
      <v-btn text small color="#64b5f6" class="font-weight-bold">o nas</v-btn>
      <v-btn text small color="#64b5f6" class="font-weight-bold">kontakt</v-btn>
      <v-btn
        href="https://www.facebook.com/skni.kod/"
        small
        icon
        text
        color="#64b5f6"
        class="font-weight-bold"
      >
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
    </v-layout>
  </v-footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
.main-footer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  .rights {
    color: gray;
    margin: 10px 0 10px 0;
  }
  .img {
    width: 120px;
  }
}
</style>
