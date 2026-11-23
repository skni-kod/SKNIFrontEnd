<template>
  <div class="uploader">
    <div class="uploader__row">
      <FileField v-model="file" class="uploader__field" />
      <button type="button" class="btn" :disabled="!file || uploadState" @click="upload">
        <i class="mdi" :class="uploadState ? 'mdi-loading mdi-spin' : 'mdi-upload'" aria-hidden="true"></i>
        Wgraj
      </button>
    </div>
    <div v-if="progress !== undefined" class="progress" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
      <span class="progress__bar" :style="{ width: `${progress}%` }"></span>
      <span class="progress__label">Wgrywanie: {{ progress }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import type { GalleryModelImage } from '@/models/GalleryModelImage';
import type { GalleryService } from '@/services/GalleryService';
import FileField from '@/components/ui/FileField.vue';

const props = defineProps<{ service: GalleryService }>();
const emit = defineEmits<{ img: [img: GalleryModelImage] }>();

const store = useStore();
const file = ref<File>();
const progress = ref<number>();
const uploadState = ref(false);

function upload() {
  if (!file.value) {
    return;
  }
  uploadState.value = true;
  progress.value = 0;
  props.service
    .upload(file.value, (event: any) => {
      progress.value = Math.round((100 * event.loaded) / (event.total || 1));
    })
    .then((res) => {
      if (res.status === 201) {
        emit('img', res.data);
        store.dispatch('successMessage', 'Wgrano obrazek');
        store.dispatch('warningMessage', 'Pamiętaj o zapisaniu zmian, aby zachować zmiany w galerii!');
        file.value = undefined;
        progress.value = undefined;
      }
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd przy wgrywaniu obrazka!');
      progress.value = undefined;
    })
    .finally(() => {
      uploadState.value = false;
    });
}
</script>

<style scoped>
.uploader {
  display: grid;
  gap: 12px;
}

.uploader__row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.uploader__field {
  flex: 1;
}

.progress {
  position: relative;
  height: 28px;
  overflow: hidden;
  border-radius: var(--radius-pill);
  background: var(--surface-2);
}

.progress__bar {
  position: absolute;
  inset: 0 auto 0 0;
  background: linear-gradient(90deg, var(--primary), var(--sky));
  transition: width var(--t) var(--ease);
}

.progress__label {
  position: relative;
  display: grid;
  place-items: center;
  height: 100%;
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}

@media (max-width: 560px) {
  .uploader__row {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
