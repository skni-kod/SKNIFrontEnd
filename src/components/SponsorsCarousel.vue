<template>
  <v-carousel
    cycle
    hide-delimiter-background
    show-arrows-on-hover
    v-if="sponsors"
    height="250"
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

  async mounted() {
    const response = await this.sponsorsService.getSponsors();
    if(response.status === 200) {
      this.sponsors = this.shuffleArray(response.data);
    }
    else {
      this.sponsors = [];
    }
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
  padding: 0 30px;
  justify-content: center;

  .image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    // display: block;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
