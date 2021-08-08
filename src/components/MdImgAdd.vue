<template>
  <v-card outlined tile>
    <v-card-subtitle>Dodaj obrazek do tekstu</v-card-subtitle>
    <v-card-text>
      <image-uploader
        :service="galleryService"
        @img="receiveImage($event)"
      ></image-uploader>
      <v-row align="center" justify="center" v-if="generatedCode !== undefined">
        <v-col cols="auto">
          <v-img
            contain
            width="300"
            :src="be + img.image"
            aspect-ratio="1"
          ></v-img>
        </v-col>
        <v-col>
          <v-textarea
            outlined
            readonly
            hide-details
            label="Skopiuj kod wgranego obrazka"
            :value="generatedCode"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions v-if="img">
      <v-btn block class="error" @click="img = undefined">
        <span>Wyczyść</span>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { GalleryModelImage } from '@/models/GalleryModelImage';
import { GalleryService } from '@/services/GalleryService';

@Component
export default class MdImgAdd extends Vue {
  private galleryService!: GalleryService;

  private created() {
    this.galleryService = new GalleryService();
  }

  private receiveImage(img: GalleryModelImage) {
    this.$data.img = img;
  }

  get be() {
    return process.env.VUE_APP_MEDIA_URL;
  }

  get generatedCode() {
    if (this.$data.img) {
      return (
        '![Tekst alternatywny](' +
        this.be +
        this.$data.img.image +
        ')\n*Podpis*'
      );
    } else {
      return undefined;
    }
  }

  private data() {
    return {
      img: undefined,
    };
  }
}
</script>
