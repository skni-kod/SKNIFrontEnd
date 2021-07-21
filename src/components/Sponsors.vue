<template>
  <v-card class="ma-2">
    <v-card-title
      class="text-h4 justify-center white--text font-weight-bold primary py-1"
      >Nasi partnerzy</v-card-title
    >
    <v-card-text>
      <v-carousel
        :cycle="cycle"
        :interval="cycleTime"
        progress
        height="200"
        hide-delimiters
        show-arrows-on-hover
      >
        <div v-if="$vuetify.breakpoint.mdAndUp">
          <v-carousel-item
            v-for="(i, index) in Math.ceil(items.length / 4)"
            :key="index"
          >
            <v-row
              no-gutters
              justify="center"
              align="center"
              class="px-4 fill-height"
            >
              <v-col
                :cols="3"
                v-for="(j, jindex) in items.length > 3 ? 4 : items.length"
                :key="jindex"
              >
                <v-img
                  :src="items[i * 4 + j - 5].src"
                  :alt="items[i * 4 + j - 5].alt"
                  width="200"
                  class="mx-auto"
                  @click.native="open(items[i * 4 + j - 5].link)"
                  style="cursor: pointer"
                />
              </v-col>
            </v-row>
          </v-carousel-item>
        </div>
        <div v-else>
          <v-carousel-item
            v-for="(item, index) in items"
            :key="index"
            @click.native="open(item.link)"
            style="cursor: pointer"
          >
            <v-row align="center" justify="center" class="px-4 fill-height">
              <v-col cols="auto">
                <v-img :src="item.src" :alt="item.alt" />
              </v-col>
            </v-row>
          </v-carousel-item>
        </div>
      </v-carousel>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Sponsors extends Vue {
  private created() {
    if (this.$data.random) {
      this.shuffleArray(this.$data.items);
    }
  }

  private shuffleArray(array: any) {
    let ctr = array.length;
    let temp;
    let index;
    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = array[ctr];
      array[ctr] = array[index];
      array[index] = temp;
    }
    return array;
  }

  private open(link: string) {
    window.open(link, '_blank');
  }

  private data() {
    return {
      // USTAWIENIA
      random: true,
      cycle: true,
      cycleTime: 5000,
      items: [
        // OBRAZKI
        {
          src: 'https://www.ideo.pl/szablony/ideo/images/logo.png',
          alt: 'IDEO',
          link: 'https://www.ideo.pl/',
          text: 'IDEO',
        },
      ],
    };
  }
}
</script>