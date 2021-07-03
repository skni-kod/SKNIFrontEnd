<template>
  <div>
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
        <v-btn-cap
          :disabled="!file"
          :loading="uploadState"
          class="success"
          @click="upload()"
        >
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { GalleryModelImage } from '@/models/GalleryModelImage';
import { GalleryService } from '@/services/GalleryService';

@Component
export default class ImageUploader extends Vue {
  @Prop({ required: true }) private service!: GalleryService;

  private imgReady(img: GalleryModelImage) {
    this.$emit('img', img);
  }

  private upload() {
    this.$data.uploadState = true;
    this.$data.progress = 0;
    this.service
      .upload(this.$data.file, (event: any) => {
        this.$data.progress = Math.round((100 * event.loaded) / event.total);
      })
      .then((res) => {
        if (res.status === 201) {
          this.imgReady(res.data);
          this.$store.dispatch('successMessage', 'Wgrano obrazek');
          this.$store.dispatch(
            'warningMessage',
            'Pamiętaj o zapisaniu zmian, aby zachować zmiany w galerii!',
          );
          this.$data.file = undefined;
          this.$data.progress = undefined;
        }
      })
      .catch((err) => {
        this.$store.dispatch('errorMessage', 'Błąd przy wgrywaniu obrazka!');
      })
      .then(() => (this.$data.uploadState = false));
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
