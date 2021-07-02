<template>
  <v-card outlined tile>
    <v-card-title>Edytor galerii</v-card-title>
    <v-card-text>
      <v-row align="center">
        <v-col>
          <v-file-input
            solo
            clearable
            hide-details
            label="Dodaj obrazek"
            accept=".jpg, .jpeg, .png, .bmp"
            v-model="file"
          ></v-file-input>
        </v-col>
        <v-col cols="auto">
          <v-btn-cap :disabled="!file" :loading="uploadState" class="success" @click="upload()">
            <span>Wgraj</span>
            <v-icon right>mdi-upload</v-icon>
          </v-btn-cap>
        </v-col>
      </v-row>
      <v-progress-linear
        height="25"
        striped
        dark
        class="rounded-xl my-2"
        color="primary"
        :value="progress"
        v-if="progress"
      >
        <strong>Wgrywanie: {{ progress }}%</strong>
      </v-progress-linear>
      <gallery :imgs="images" v-if="images" class="my-2"></gallery>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { GalleryModelImage } from '@/models/GalleryModelImage';
import { GalleryService } from '@/services/GalleryService';
import axiosBe from '@/axios';

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

  private upload() {
    this.$data.uploadState = true;
    this.$data.progress = 0;
    this.galleryService
      .upload(this.$data.file, (event: any) => {
        this.$data.progress = Math.round((100 * event.loaded) / event.total);
      })
      .then((res) => {
        if(res.status === 201) {
          this.images.push(res.data);
          this.$store.dispatch('successMessage', 'Wgrano obrazek');
          this.$data.file = undefined;
          this.$data.progress = undefined;
        }
      })
      .catch((err) => {
        this.$store.dispatch('errorMessage', 'Błąd przy wgrywaniu obrazka!');
      }).then(() => this.$data.uploadState = false);
  }

  private data() {
    return {
      file: undefined,
      progress: undefined,
      uploadState: false,
    };
  }
}
</script>
