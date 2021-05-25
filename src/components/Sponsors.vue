<template>
  <div>
    <v-carousel
      cycle
      height="500"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Sponsors extends Vue {
  private data() {
    return {
      items: [
        {
          src:
            'C:UsersDawidDesktopSKNIFrontSKNIFrontEndsrcassetslogo_color.png',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src:
            'https://news.clemson.edu/wp-content/uploads/2020/12/Deloitte-Logo-FEATURE.jpg',
        },
        {
          src:
            'https://www.ideoagency.com/gfx/ideo-2015/en/ogimage/logo_ideo_kolor_invertrgb_kwadrat.png',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
    };
  }
}
</script>