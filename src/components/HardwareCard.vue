<template>
  <v-card tile>
    <v-card-title class="grey lighten-4">
      <v-col cols="2" class="text-right">
        <h3 class="mr-5">Arduino</h3>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="8">
        <h3 class="mx-5 grey--text">
          Status:
          <v-icon class="red--text text--lighten-2 text-h4">mdi-record</v-icon>
        </h3>
      </v-col>
      <v-col>
        <v-btn small plain rounded outlined disabled>Wypożycz</v-btn>
      </v-col>
    </v-card-title>
    <v-divider></v-divider>
    <v-img height="300px" src="../assets/strona_bg.png">
      <v-row
        align="end"
        style="height: 100%"
        class="card-text ma-0 white--text"
      >
        <v-col cols="12">
          <v-card-actions class="pa-5">
            <v-spacer />
            <v-btn small rounded outlined dark class="warning"
              >Zobacz więcej</v-btn
            >
          </v-card-actions>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>