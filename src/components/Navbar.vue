<template>
  <v-main>
    <v-toolbar dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn v-for="item in toolbarItems" :key="item.link" :to="item.link">
          {{
          item.title
          }}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-title v-else class="text-center">SKNI KOD</v-toolbar-title>
    </v-toolbar>
    <nav-drawer :items="toolbarItems" />
  </v-main>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import NavDrawer from './NavbarDrawer.vue';
import store from '@/store';
import Vue from 'vue';

@Component({
  components: {
    NavDrawer,
  },
})
export default class extends Vue {
  private toolbarItems = [
    { link: '/', title: 'Strona główna', icon: 'mdi-home' },
    { link: '/about', title: 'O nas', icon: 'mdi-account-group' },
    { link: '/articles', title: 'Artykuły', icon: 'mdi-text-box-multiple' },
    { link: '/sections', title: 'Sekcje', icon: 'mdi-vector-intersection' },
    { link: '/projects', title: 'Projekty', icon: 'mdi-cog' },
    // { link: '/hardware', title: 'Hardware', icon: "mdi-expansion-card" },
    // { link: '/profiles', title: 'Profile', icon: "mdi-account" },
  ];
  get drawer(): boolean {
    return this.$store.getters.navDrawer;
  }
  set drawer(value: boolean) {
    this.$store.dispatch('setNavDrawerState', value);
  }
}
</script>
