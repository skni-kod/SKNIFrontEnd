<template>
  <v-app id="app">
    <Navbar />
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
    <Footer />
    <Snackbars />
  </v-app>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
const Snackbars = () =>
  import(
    /* webpackChunkName: "ComponentSnackbar" */ '@/components/Snackbar.vue'
  );

@Component({
  components: { Navbar, Footer, Snackbars },
})
export default class App extends Vue {}
</script>

