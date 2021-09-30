<template>
  <div>
    <v-app-bar dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn
          :exact="item.exact"
          text
          v-for="(item, i) in toolbarItems"
          :key="i"
          :to="item.link"
          >{{ item.title }}</v-btn
        >
        <v-btn text :to="{ name: 'hardwareList' }" v-if="auth">Hardware</v-btn>
        <v-btn text href="https://kod.prz.edu.pl/junior">Junior</v-btn>
      </v-toolbar-items>
      <v-toolbar-title v-else>SKNI KOD</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn text :to="{ name: 'login' }" v-if="!auth">Login</v-btn>
        <v-btn text :to="{ name: 'register' }" v-if="!auth">Rejestracja</v-btn>
        <v-menu dark offset-y v-if="auth">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon left>mdi-account-circle</v-icon>
              <span>Profil</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              @click="
                $router.push({
                  name: 'userProfile',
                  params: { id: profile.id },
                })
              "
            >
              <v-list-item-action>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-action>
              <v-list-item-title>Mój profil</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push({ name: 'userPanel' })">
              <v-list-item-action>
                <v-icon>mdi-cog</v-icon>
              </v-list-item-action>
              <v-list-item-title>Panel użytkownika</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="role" link :to="{ name: 'adminPanel' }">
              <v-list-item-action>
                <v-icon>mdi-duck</v-icon>
              </v-list-item-action>
              <v-list-item-title>Panel administratora</v-list-item-title>
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
    <nav-drawer
      :items="toolbarItems"
      :auth="auth"
      :role="role"
      @logout="logout"
    />
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
    {
      link: { name: 'home' },
      title: 'Strona główna',
      icon: 'mdi-home',
      exact: true,
    },
    {
      link: { name: 'about' },
      title: 'O nas',
      icon: 'mdi-account-group',
      exact: false,
    },
    {
      link: { name: 'articles', params: { page: 1 } },
      title: 'Artykuły',
      icon: 'mdi-text-box-multiple',
      exact: false,
    },
    {
      link: { name: 'sections' },
      title: 'Sekcje',
      icon: 'mdi-vector-intersection',
      exact: false,
    },
    {
      link: { name: 'projects' },
      title: 'Projekty',
      icon: 'mdi-cog',
      exact: false,
    },
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

  get role(): boolean {
    return this.$store.getters.isAdministrator;
  }

  get user() {
    return this.$store.getters.user;
  }

  get profile() {
    return this.$store.getters.profile;
  }

  private logout() {
    this.$store.dispatch('logout');
  }
}
</script>
