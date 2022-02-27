<template>
  <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
    v-if="sponsors"
  >
    <v-carousel-item
      v-for="(item, i) in sponsors"
      :key="i"
    >
      <Sponsor :model="item"/>
    </v-carousel-item>
  
  </v-carousel>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Sponsor from './Sponsor.vue'
import { SponsorModel } from '@/models/SponsorModel';
import { SponsorsService } from '@/services/SponsorsService'

@Component({
  components: {
    Sponsor,
  },
})
export default class Sponsors extends Vue {
  
  sponsors!: SponsorModel[];
  sponsorsService!: SponsorsService;

  beforeCreate() {
    this.sponsorsService = new SponsorsService();
  }
  
  created() {
    // this.shuffleArray(this.$data.sponsors);
  }

  mounted() {
    this.sponsorsService.getSponsors().then((models: SponsorModel[]) => {
      this.sponsors = models;
    })
  }

  shuffleArray(array: any) {
    let ctr = array.length;

    while (ctr > 0) {
      let index = Math.floor(Math.random() * ctr);

      ctr--;

      let temp = array[ctr];
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
      sponsors: this.sponsors,
    };
  }
}
</script>