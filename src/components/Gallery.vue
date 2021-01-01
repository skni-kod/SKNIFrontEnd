<template>
  <div v-if="imgs.length > 0" class="my-1">
    <v-card outlined :dark="dark" :color="color">
      <v-card-title class="text-h4 font-weight-bold justify-center pa-0">{{
        title
      }}</v-card-title>
      <v-divider></v-divider>
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
            <v-img
              class="clickable"
              style="cursor: pointer;"
              :src="img.thumbnail"
              aspect-ratio="1"
              @click.native="
                dialog = true;
                img_num = n;
              "
            >
              <template v-slot:placeholder>
                <v-layout fill-height align-center justify-center ma-0>
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-layout>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog max-width="100%" v-model="dialog" content-class="elevation-0">
      <v-card color="rgba(0,0,0,0)" flat>
        <v-carousel hide-delimiters height="75vh" v-model="img_num">
          <v-carousel-item v-for="(img, i) in imgs" :key="i">
            <v-img
              contain
              :src="img.image"
              aspect-ratio="1.7778"
              height="75vh"
            ></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-card>
      <v-btn
        fab
        fixed
        top
        right
        dark
        color="red"
        @click="dialog = false"
      >
        <v-icon large>mdi-close</v-icon>
      </v-btn>
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

  public data() {
    return {
      dialog: false,
      img_num: 0,
    };
  }
}
</script>
