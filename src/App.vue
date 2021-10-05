<template>
  <!-- <v-app id="app">
    <Navbar />
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
    <Footer />
    <Snackbars />
  </v-app>-->

  <v-app id="app">
    <main>
      <router-view :key="$route.fullPath" />
    </main>
    <footer></footer>
  </v-app>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import '@/styles/global.scss';


@Component({
  components: { Navbar, Footer, Snackbars },
})
export default class App extends Vue {
  private created() {
    this.$store.dispatch('autoLogin');
  }
}
</script>

