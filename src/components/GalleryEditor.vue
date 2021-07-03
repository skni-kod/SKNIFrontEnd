<template>
  <v-card outlined tile>
    <v-card-title>Edytor galerii</v-card-title>
    <v-card-text>
      <image-uploader :service="galleryService" @img="receiveImage($event)"></image-uploader>
      <gallery
        :imgs="images"
        :deleteMode="true"
        @delete="removeImg($event)"
        v-if="images"
        class="my-2"
      ></gallery>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { GalleryModelImage } from '@/models/GalleryModelImage';
import { GalleryService } from '@/services/GalleryService';

@Component
export default class GalleryEditor extends Vue {
  @Prop({ required: true }) private value!: GalleryModelImage[];

  private galleryService!: GalleryService;

  private created() {
    this.galleryService = new GalleryService();
  }

  get images() {
    return this.value;
  }

  set images(imgs: GalleryModelImage[]) {
    this.$emit('input', imgs);
  }

  private receiveImage(img: GalleryModelImage) {
    this.images.push(img);
  }

  private removeImg(id: number) {
    this.galleryService
      .deleteImage(this.images[id].id)
      .then((res) => {
        if (res.status === 204) {
          this.images.splice(id, 1);
          this.$store.dispatch('successMessage', 'Obrazek został usunięty');
        }
      })
      .catch(() => {
        this.$store.dispatch(
          'errorMessage',
          'Wystapił problem z usunięciem obrazka!',
        );
      });
  }
}
</script>
