<template>
  <v-app id="app">
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
    <Snackbar />
  </v-app>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';

import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Snackbar from '@/components/Snackbar.vue';

@Component({
  components: { Navbar, Footer, Snackbar },
})
export default class App extends Vue {}
</script>

