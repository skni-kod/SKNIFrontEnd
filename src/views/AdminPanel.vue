<template>
  <div class="content">
    <component v-if="module" :is="module"></component>
    <v-navigation-drawer
      dark
      absolute
      :permanent="!module"
      height="100%"
      width="300"
      v-model="menu"
    >
      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="amber">mdi-duck</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Panel Administratora</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item
          v-for="(module, i) in modules"
          :key="i"
          link
          :to="{ name: 'adminPanel', params: { module: module.module } }"
        >
          <v-list-item-icon>
            <v-icon>{{ module.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ module.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-btn
      fab
      fixed
      bottom
      left
      class="primary"
      @click="menu = true"
      v-if="!menu"
    >
      <v-icon large>mdi-duck</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import beAxios from '@/axios';

@Component({
  components: {
    settings: () =>
      import( // tslint:disable-next-line
        /* webpackChunkName: "AdminPanelSettings" */ '@/components/admin/Settings.vue'
      ),
    users: () =>
      import( // tslint:disable-next-line
        /* webpackChunkName: "AdminPanelUsers" */ '@/components/admin/Users.vue'
      ),
    rentals: () =>
      import( // tslint:disable-next-line
        /* webpackChunkName: "AdminPanelRentals" */ '@/components/admin/Rentals.vue'
      ),
    history: () =>
      import( // tslint:disable-next-line
        /* webpackChunkName: "AdminPanelHistory" */ '@/components/admin/History.vue'
      ),
    sponsors: () =>
      import( // tslint:disable-next-line
        /* webpackChunkName: "AdminPanelSponsors" */ '@/components/admin/Sponsors.vue'
      ),
    tags: () =>
      import( // tslint:disable-next-line
        /* webpackChunkName: "AdminPanelTags" */ '@/components/admin/Tags.vue'
      ),
    footerlinks: () =>
      import( // tslint:disable-next-line
        /* webpackChunkName: "AdminPanelFooter" */ '@/components/admin/Footer.vue'
      ),
    anothers: () =>
      import( // tslint:disable-next-line
        /* webpackChunkName: "AdminPanelAnothers" */ '@/components/admin/Anothers.vue'
      ),
  },
})
export default class AdminPanel extends Vue {
  private created() {
    if (this.$route.params.module === undefined) {
      this.$data.menu = true;
    }
  }

  get module() {
    return this.$route.params.module;
  }

  private data() {
    return {
      menu: false,
      modules: [
        {
          icon: 'mdi-cog',
          title: 'Ustawienia witryny',
          module: 'settings',
        },
        {
          icon: 'mdi-account-group',
          title: 'Zarządzanie użytkownikami',
          module: 'users',
        },
        {
          icon: 'mdi-expansion-card',
          title: 'Zarządzanie wypożyczeniami',
          module: 'rentals',
        },
        {
          icon: 'mdi-book-education',
          title: 'Historia koła',
          module: 'history',
        },
        {
          icon: 'mdi-account-cash',
          title: 'Sponsorzy',
          module: 'sponsors',
        },
        {
          icon: 'mdi-tag',
          title: 'Zarządzanie tagami',
          module: 'tags',
        },
        {
          icon: 'mdi-page-layout-footer',
          title: 'Zarządzanie stopką',
          module: 'footerlinks',
        },
        {
          icon: 'mdi-pencil',
          title: 'Inne opcje',
          module: 'anothers',
        },
      ],
    };
  }
}
</script>

<style scoped>
.content {
  width: 80%;
}
</style>