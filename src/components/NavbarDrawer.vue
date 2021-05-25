<template>
  <v-navigation-drawer app left disable-resize-watcher v-model="drawer" width="300px">
    <v-toolbar text dark class="px-3" height="64px">
      <v-btn large block text outlined @click="drawer = !drawer">
        Zamknij
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- Menu -->
    <v-list subheader shaped>
      <v-subheader>Nawigacja</v-subheader>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        router
        :to="item.link"
        @click="drawer = !drawer"
      >
        <v-list-item-action>
          <v-icon large class="primary--text">{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list subheader shaped>
      <v-subheader>Użytkownik</v-subheader>
      <v-list-item router @click="drawer = !drawer" to="/login" v-if="!auth">
        <v-list-item-action>
          <v-icon large class="primary--text">mdi-login</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item router @click="drawer = !drawer" to="/register" v-if="!auth">
        <v-list-item-action>
          <v-icon large class="primary--text">mdi-database-plus</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Rejestracja</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item router @click="drawer = !drawer" :to="'/user/profile/' + user.id" v-if="auth">
        <v-list-item-action>
          <v-icon large class="primary--text">mdi-account-circle</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Mój profil</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item router @click="drawer = !drawer" to="/user/panel" v-if="auth">
        <v-list-item-action>
          <v-icon large class="primary--text">mdi-cog</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Panel użytkownika</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
       <v-list-item router @click="drawer = !drawer" to="/admin/panel" v-if="role">
        <v-list-item-action>
          <v-icon large class="primary--text">mdi-duck</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Panel administratora</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="logout(); drawer = !drawer" v-if="auth">
        <v-list-item-action>
          <v-icon large class="primary--text">mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Wyloguj</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class NavbarDrawer extends Vue {
  @Prop({ type: Array }) public readonly items!: object[];
  @Prop() public readonly auth!: boolean;
  @Prop() public readonly role!: boolean;
  get drawer(): boolean {
    return this.$store.getters.navDrawer;
  }

  set drawer(value: boolean) {
    this.$store.dispatch('setNavDrawerState', value);
  }

  get user() {
    return this.$store.getters.user;
  }

  private logout() {
    this.$emit('logout');
  }
}
</script>
