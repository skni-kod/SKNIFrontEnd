<template>
  <div class="gallery-editor">
    <ImageUploader :service="galleryService" @img="receiveImage" />
    <Gallery v-if="images && images.length" :imgs="images" title="" :delete-mode="true" @delete="removeImg" />
    <p v-if="images && images.length" class="field__hint">Kliknij zdjęcie, aby je usunąć.</p>
    <p v-else class="field__hint">Galeria jest pusta. Pierwsze zdjęcie będzie miniaturą na liście.</p>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import type { GalleryModelImage } from '@/models/GalleryModelImage';
import { GalleryService } from '@/services/GalleryService';
import ImageUploader from '@/components/editor/ImageUploader.vue';
import Gallery from '@/components/Gallery.vue';

const images = defineModel<GalleryModelImage[]>({ required: true });
const store = useStore();
const galleryService = new GalleryService();

function receiveImage(img: GalleryModelImage) {
  if (images.value !== undefined) {
    images.value.push(img);
  } else {
    images.value = [img];
  }
}

function removeImg(index: number) {
  galleryService
    .deleteImage(images.value[index].id)
    .then((res) => {
      if (res.status === 204) {
        images.value.splice(index, 1);
        store.dispatch('successMessage', 'Obrazek został usunięty');
      }
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Wystapił problem z usunięciem obrazka!');
    });
}
</script>

<style scoped>
.gallery-editor {
  display: grid;
  gap: 16px;
}
</style>
