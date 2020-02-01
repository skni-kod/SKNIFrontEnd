<template>
  <div id='app' class='main-container'>
    <Navbar/>
    <div id='nav'></div>

    <router-view/>
    <footer-main/>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';

import Navbar from '@/components/Navbar.vue';

@Component({
  components: {Navbar},
})

export default class App extends Vue {}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
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
.main-container {
  min-height: 100vh; /* will cover the 100% of viewport */
  overflow: hidden;
  display: block;
  position: relative;
  padding-bottom: 100px; /* height of your footer */
}

.section-title{
    font-size: 300%;
}
</style>
