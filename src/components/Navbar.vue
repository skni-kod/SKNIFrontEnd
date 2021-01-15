<template>
  <div>
    <v-app-bar dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn text v-for="item in toolbarItems" :key="item.link" :to="item.link">{{ item.title }}</v-btn>
      </v-toolbar-items>
      <v-toolbar-title v-else>SKNI KOD</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn text to="/login" v-if="!auth">Login</v-btn>
        <v-btn text to="/register" v-if="!auth">Rejestracja</v-btn>
        <v-menu dark offset-y v-if="auth">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon left>mdi-account-circle</v-icon>
              <span>Profil</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$router.push('/user/profile/' + user.id)">
              <v-list-item-action>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-action>
              <v-list-item-title>Mój profil</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/user/panel')">
              <v-list-item-action>
                <v-icon>mdi-cog</v-icon>
              </v-list-item-action>
              <v-list-item-title>Panel użytkownika</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-action>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-action>
              <v-list-item-title>Wyloguj</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
    <nav-drawer :items="toolbarItems" :auth="auth" @logout="logout" />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import NavDrawer from './NavbarDrawer.vue';
import store from '@/store';
import Vue from 'vue';

@Component({
  components: {
    NavDrawer,
  },
})
export default class Navbar extends Vue {
  private toolbarItems = [
    { link: '/', title: 'Strona główna', icon: 'mdi-home' },
    { link: '/about', title: 'O nas', icon: 'mdi-account-group' },
    { link: '/articles/1', title: 'Artykuły', icon: 'mdi-text-box-multiple' },
    { link: '/sections', title: 'Sekcje', icon: 'mdi-vector-intersection' },
    { link: '/projects', title: 'Projekty', icon: 'mdi-cog' },
    { link: '/hardwares', title: 'Hardware', icon: 'mdi-expansion-card' },
  ];
  get drawer(): boolean {
    return this.$store.getters.navDrawer;
  }
  set drawer(value: boolean) {
    this.$store.dispatch('setNavDrawerState', value);
  }

  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  get user() {
    return this.$store.getters.user;
  }

  private logout() {
    this.$store.dispatch('logout');
  }
}
</script>
