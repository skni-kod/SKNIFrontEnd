<template>
  <v-app id="app">
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';

import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: { Navbar, Footer },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  box-sizing: border-box;
}
*:before,
*:after {
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  position: relative;
}

.section-title {
  font-size: 300%;
}
</style>
