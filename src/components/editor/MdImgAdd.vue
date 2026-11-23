<template>
  <div class="img-add">
    <ImageUploader :service="galleryService" @img="img = $event" />
    <div v-if="img && generatedCode" class="img-add__result">
      <img :src="mediaUrl(img.image)" alt="" class="img-add__preview" />
      <div class="img-add__code">
        <label class="field__label" :for="codeId">Kod do wklejenia w treść</label>
        <textarea :id="codeId" class="input" readonly rows="3" :value="generatedCode"></textarea>
        <div class="img-add__actions">
          <button type="button" class="btn btn--soft btn--sm" @click="copy">
            <i class="mdi" :class="copied ? 'mdi-check' : 'mdi-content-copy'" aria-hidden="true"></i>
            {{ copied ? 'Skopiowano' : 'Kopiuj kod' }}
          </button>
          <button type="button" class="btn btn--ghost btn--sm" @click="img = undefined">Wyczyść</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import type { GalleryModelImage } from '@/models/GalleryModelImage';
import { GalleryService } from '@/services/GalleryService';
import ImageUploader from '@/components/editor/ImageUploader.vue';
import { MEDIA_URL, mediaUrl } from '@/utils/media';

const galleryService = new GalleryService();
const img = ref<GalleryModelImage>();
const copied = ref(false);
const codeId = useId();

const generatedCode = computed(() =>
  img.value ? `![Tekst alternatywny](${MEDIA_URL}${img.value.image})\n*Podpis*` : undefined,
);

async function copy() {
  if (!generatedCode.value) {
    return;
  }
  try {
    await navigator.clipboard.writeText(generatedCode.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch {
    copied.value = false;
  }
}
</script>

<style scoped>
.img-add {
  display: grid;
  gap: 16px;
}

.img-add__result {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 16px;
  align-items: start;
  padding: 16px;
  border-radius: var(--radius);
  background: var(--surface);
}

.img-add__preview {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

.img-add__code {
  display: grid;
  gap: 8px;
}

.img-add__code textarea {
  min-height: 0;
  font-family: var(--font-mono);
  font-size: 13px;
}

.img-add__actions {
  display: flex;
  gap: 8px;
}

@media (max-width: 560px) {
  .img-add__result {
    grid-template-columns: 1fr;
  }
}
</style>
