<template>
  <div>
    <v-row justify="space-around" class="ma-2">
      <v-hover v-slot="{ hover }" class="my-1">
        <v-card
          ripple
          width="300"
          :class="hover ? 'primary' : ''"
          :to="{ name: 'articleAdd' }"
        >
          <v-card-title class="font-weight-bold justify-center">
            Dodaj artykuł
            <v-icon right>mdi-database-plus</v-icon>
          </v-card-title>
        </v-card>
      </v-hover>
      <v-hover v-slot="{ hover }" class="my-1">
        <v-card
          ripple
          width="300"
          :class="hover ? 'primary' : ''"
          :to="{ name: 'sectionAdd' }"
        >
          <v-card-title class="font-weight-bold justify-center">
            Dodaj sekcję
            <v-icon right>mdi-database-plus</v-icon>
          </v-card-title>
        </v-card>
      </v-hover>
      <v-hover v-slot="{ hover }" class="my-1">
        <v-card
          ripple
          width="300"
          :class="hover ? 'primary' : ''"
          :to="{ name: 'projectAdd' }"
        >
          <v-card-title class="font-weight-bold justify-center">
            Dodaj projekt
            <v-icon right>mdi-database-plus</v-icon>
          </v-card-title>
        </v-card>
      </v-hover>
      <v-hover v-slot="{ hover }" class="my-1">
        <v-card
          ripple
          width="300"
          :class="hover ? 'primary' : ''"
          :to="{ name: 'hardwareAdd' }"
        >
          <v-card-title class="font-weight-bold justify-center">
            Dodaj sprzęt
            <v-icon right>mdi-database-plus</v-icon>
          </v-card-title>
        </v-card>
      </v-hover>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AdminPanelAnothers extends Vue {}
</script>