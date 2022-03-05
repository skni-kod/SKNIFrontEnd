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
      <a :href="item.url" class="sponsor">
        <img :src="mediaURL + item.logo" :alt="item.name" class="image" />
      </a>
    </v-carousel-item>
  
  </v-carousel>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { SponsorModel } from '@/models/SponsorModel';
import { SponsorsService } from '@/services/SponsorsService'

@Component({
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
    console.log(this.sponsors);

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

  get mediaURL() {
    return process.env.VUE_APP_MEDIA_URL;
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

<style lang="scss" scoped>
@use '@/styles/helpers' as *;
@use '@/styles/components/buttons';

.sponsor {
  max-width: 300px;
  padding: 0 30px;

  .image {
    max-width: 100%;
    width: auto;
    height: 60px;
    object-fit: contain;
    display: block;
  }
}
</style>
