<template>
  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-items v-if="$vuetify.breakpoint.smAndUp">
        <v-btn v-for="item in toolbarItems" :key="item.link" :to="item.link">{{item.title}}</v-btn>
      </v-toolbar-items>

      <v-menu v-else>
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item v-for="item in toolbarItems" :key="item.link">
            <v-list-item-content>
              <v-btn text :to="item.link">{{ item.title }}</v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-spacer />
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class extends Vue {
  private toolbarItems = [
    { link: '/', title: 'Strona główna' },
    { link: '/about', title: 'O nas' },
    { link: '/articles', title: 'Artykuły' },
    { link: '/sections', title: 'Sekcje' },
    { link: '/projects', title: 'Projekty' },
    // { link: '/hardware', title: 'Hardware' },
    // { link: '/profiles', title: 'Profile' },
  ];
}
</script>