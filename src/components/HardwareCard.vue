<template>
  <v-card tile>
    <v-card-title class="grey lighten-4">
      <v-col cols="3" class="text-center">
        <h3 class="">{{ name }}</h3>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="3">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <h3 class="mx-5 grey--text" v-bind="attrs" v-on="on">
                Status:
                <v-icon :class="color()"
                  >mdi-record</v-icon
                >
              </h3>
            </template>
            <span> {{ tooltip }} </span>
          </v-tooltip>
      </v-col>
      <v-col cols="4">
      </v-col>
      <v-col cols='1'>
        <v-btn small plain rounded outlined v-if="availability">Wypożycz</v-btn>
        <v-btn small plain rounded outlined v-else-if="rent" disabled>Wypożycz</v-btn>
      </v-col>
    </v-card-title>
    <v-divider></v-divider>
    <v-img height="300" :src="require(`@/assets/${img}`)" contain>
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

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HardwareCard extends Vue {
  @Prop() public name!: string;
  @Prop() public is_rented!: string;
  @Prop({ default: false }) public to_rent!: boolean;
  @Prop() public img!: string;

  private color() {
    if (!this.to_rent) {
      this.$data.tooltip = 'Sprzęt nie jest wypożyczany.';
      return 'red--text text--lighten-2 text-h4';
    } else if (!this.is_rented) {
      this.$data.tooltip = 'Sprzęt został już wypożyczony.';
      return 'orange--text text--lighten-2 text-h4';
    } else {
      return 'green--text text--lighten-2 text-h4';
    }
  }

  private data() {
    return {
      tooltip: 'Sprzęt dostępny.',
    };
  }
}
</script>