<template>
  <div v-if="imgs.length > 0" class="my-1 gallery">
    <v-card outlined :dark="dark" :color="color">
      <v-card-title class="text-h4 font-weight-bold justify-center pa-0 mb-5">{{
        title
      }}</v-card-title>
      <v-card-text class="pa-0">
        <v-row no-gutters justify="center">
          <v-col
            class="pa-1"
            :cols="bCols"
            :sm="bSm"
            :md="bMd"
            :lg="bLg"
            :xl="bXl"
            v-for="(img, n) in imgs"
            :key="n"
          >
            <v-hover v-slot="{ hover }">
              <v-img
                class="clickable image"
                style="cursor: pointer"
                :src="be + img.thumbnail"
                aspect-ratio="1"
                @click.native="imgClicked(n)"
              >
                <template v-slot:placeholder>
                  <v-layout fill-height align-center justify-center ma-0>
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </v-layout>
                </template>
                <v-overlay absolute color="error" v-if="deleteMode && hover">
                  <v-row align="center" justify="center">
                    <v-col>
                      <v-avatar color="error">
                        <v-icon x-large>mdi-delete</v-icon>
                      </v-avatar>
                    </v-col>
                  </v-row>
                </v-overlay>
              </v-img>
            </v-hover>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog max-width="100%" v-model="dialog" content-class="elevation-0">
      <v-card color="rgba(0,0,0,0)" flat>
        <v-carousel align="center" justify="center"
        class="carousel-content"
          hide-delimiters
          :show-arrows="imgs.length > 1"
          height="75vh"
          v-model="img_num"
        >
          <v-carousel-item align="center" justify="center" v-for="(img, i) in imgs" :key="i">
            <img class="gallery-image" :src="be + img.image" aspect-ratio="1.7778"/>
          </v-carousel-item>
        </v-carousel>
      </v-card>
      <v-btn-cap fab fixed top right dark color="red" @click="dialog = false">
        <v-icon large>mdi-close</v-icon>
      </v-btn-cap>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { GalleryModelImage } from '@/models/GalleryModelImage';
@Component
export default class Gallery extends Vue {
  @Prop({ default: 'Galeria' }) public readonly title!: undefined;
  @Prop({ default: '' }) public readonly color!: string;
  @Prop({ default: false }) public readonly dark!: boolean;
  @Prop({ default: [] }) public readonly imgs!: GalleryModelImage[];
  @Prop({ default: 12 }) public readonly bCols!: number;
  @Prop({ default: 6 }) public readonly bSm!: number;
  @Prop({ default: 4 }) public readonly bMd!: number;
  @Prop({ default: undefined }) public readonly bLg!: number;
  @Prop({ default: undefined }) public readonly bXl!: number;
  @Prop({ default: false }) public readonly deleteMode!: boolean;

  get be() {
    return process.env.VUE_APP_MEDIA_URL;
  }

  private imgClicked(num: number) {
    if (this.deleteMode) {
      this.$emit('delete', num);
    } else {
      this.$data.dialog = true;
      this.$data.img_num = num;
    }
  }

  private data() {
    return {
      dialog: false,
      img_num: 0,
    };
  }
}
</script>

<style scoped lang="scss">



img.gallery-image{
    margin: auto;
    width: 100%;
    max-width: 800px;
    object-fit: contain;
    height: 100%;
}
.gallery {
  margin: 50px 0;



  .v-image {
    max-width: 300px;
    margin: auto;

  }
  .image {
    transition: filter 0.3s;
    &:hover {
      filter: brightness(0.5);
    }
  }

  .theme--light.v-sheet--outlined {
    background: transparent;
    padding: 20px 0;
  }
}
</style>
