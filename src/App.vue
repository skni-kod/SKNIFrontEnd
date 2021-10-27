<template>
  <!-- <v-app id="app">
    <Navbar />
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
    <Footer />
    <Snackbars />
  </v-app>-->

  <v-app id="app" class="app">
    <app-header />
    <main class="main">
      <router-view :key="$route.fullPath" />
    </main>
    <app-footer></app-footer>
    <Snackbars />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import '@/styles/global.scss';

import AppHeader from '@/components/NewDesign/AppHeader.vue';
import AppFooter from '@/components/NewDesign/AppFooter.vue';

const Snackbars = () =>
  import( // tslint:disable-next-line
    /* webpackChunkName: "ComponentSnackbar" */ '@/components/Snackbar.vue'
  );

@Component({
  components: { AppHeader, AppFooter, Snackbars },
})
export default class App extends Vue {
  private created() {
    this.$store.dispatch('autoLogin');
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/helpers' as *;

/* TODO: Change to .app after removing Vuetify */
.app.app {
  background-color: $body-bg;
  background-image: url("~@/assets/page-footer.png");
  background-position: bottom;
  background-repeat: no-repeat;

  @include media-breakpoint-down("md") {
    background-position-x: 60%;
  }
}

.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
