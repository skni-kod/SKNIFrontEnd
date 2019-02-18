<template>
  <div id="app" class="main-container">
    <v-toolbar dark color="primary">
      <v-toolbar-items>
        <v-btn to="/">Home</v-btn>

        <v-btn to="/about">About</v-btn>

        <v-btn to="/articles">Articles</v-btn>

        <v-btn to="/sections">Sekcje</v-btn>

        <v-btn to="/hardware">Hardware</v-btn>
      </v-toolbar-items>
      <v-spacer/>
      <v-btn icon to="/login">
        <v-icon>person</v-icon>
      </v-btn>
    </v-toolbar>
    <div id="nav"></div>

    <router-view/>

    <v-footer height="auto" color="primary" style="position: absolute; bottom: 0; width: 100%">
      <v-layout justify-center row wrap>
        &copy;2019 —
        <strong>SKNI KOD. Wszystkie kaczki zastrzeżone</strong>
      </v-layout>
    </v-footer>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
</style>
