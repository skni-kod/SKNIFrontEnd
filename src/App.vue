<template>
  <div id="app">
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
        <v-icon> person </v-icon>
      </v-btn>
    </v-toolbar>
    <div id="nav"></div>
    <router-view/>
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
</style>
