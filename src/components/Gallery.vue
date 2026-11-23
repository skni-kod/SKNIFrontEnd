<template>
  <section v-if="imgs && imgs.length > 0" class="gallery">
    <h2 v-if="title" class="gallery__title">{{ title }}</h2>
    <div class="gallery__grid">
      <button
        v-for="(img, n) in imgs"
        :key="img.id ?? n"
        type="button"
        class="gallery__item"
        :class="{ 'is-delete': deleteMode }"
        :aria-label="deleteMode ? `Usuń zdjęcie ${n + 1}` : `Powiększ zdjęcie ${n + 1}`"
        @click="imgClicked(n)"
      >
        <img :src="mediaUrl(img.thumbnail || img.image)" alt="" loading="lazy" />
        <span class="gallery__hover" aria-hidden="true">
          <i class="mdi" :class="deleteMode ? 'mdi-trash-can-outline' : 'mdi-magnify-plus-outline'"></i>
        </span>
      </button>
    </div>

    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="current !== null" class="lightbox" role="dialog" aria-modal="true" aria-label="Galeria" @click.self="close">
          <button type="button" class="lightbox__btn lightbox__close" aria-label="Zamknij" @click="close">
            <i class="mdi mdi-close"></i>
          </button>
          <button v-if="imgs.length > 1" type="button" class="lightbox__btn lightbox__prev" aria-label="Poprzednie" @click="step(-1)">
            <i class="mdi mdi-chevron-left"></i>
          </button>
          <figure class="lightbox__figure" @click.self="close">
            <img :src="mediaUrl(imgs[current].image)" alt="" />
            <figcaption>{{ current + 1 }} / {{ imgs.length }}</figcaption>
          </figure>
          <button v-if="imgs.length > 1" type="button" class="lightbox__btn lightbox__next" aria-label="Następne" @click="step(1)">
            <i class="mdi mdi-chevron-right"></i>
          </button>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { GalleryModelImage } from '@/models/GalleryModelImage';
import { mediaUrl } from '@/utils/media';

const props = withDefaults(defineProps<{ imgs?: GalleryModelImage[]; title?: string; deleteMode?: boolean }>(), {
  imgs: () => [],
  title: 'Galeria',
  deleteMode: false,
});
const emit = defineEmits<{ delete: [index: number] }>();

const current = ref<number | null>(null);

function imgClicked(n: number) {
  if (props.deleteMode) {
    emit('delete', n);
  } else {
    current.value = n;
  }
}

function close() {
  current.value = null;
}

function step(delta: number) {
  if (current.value === null) {
    return;
  }
  const count = props.imgs.length;
  current.value = (current.value + delta + count) % count;
}

function onKey(event: KeyboardEvent) {
  if (current.value === null) {
    return;
  }
  if (event.key === 'Escape') {
    close();
  } else if (event.key === 'ArrowLeft') {
    step(-1);
  } else if (event.key === 'ArrowRight') {
    step(1);
  }
}

onMounted(() => document.addEventListener('keydown', onKey));
onBeforeUnmount(() => document.removeEventListener('keydown', onKey));
</script>

<style scoped>
.gallery {
  display: grid;
  gap: 20px;
}

.gallery__title {
  font-size: 24px;
}

.gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}

.gallery__item {
  position: relative;
  aspect-ratio: 1;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: var(--radius);
  background: var(--surface-2);
}

.gallery__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms var(--ease);
}

.gallery__item:hover img {
  transform: scale(1.06);
}

.gallery__hover {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(7, 18, 38, 0.45);
  color: #fff;
  font-size: 30px;
  opacity: 0;
  transition: opacity var(--t) var(--ease);
}

.gallery__item:hover .gallery__hover,
.gallery__item:focus-visible .gallery__hover {
  opacity: 1;
}

.gallery__item.is-delete .gallery__hover {
  background: rgba(198, 40, 40, 0.7);
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 400;
  display: grid;
  grid-template-columns: 72px 1fr 72px;
  align-items: center;
  background: rgba(3, 8, 20, 0.92);
}

.lightbox__figure {
  grid-column: 2;
  display: grid;
  justify-items: center;
  gap: 12px;
  margin: 0;
  padding: 48px 0;
  height: 100vh;
  align-content: center;
}

.lightbox__figure img {
  max-width: 100%;
  max-height: calc(100vh - 140px);
  object-fit: contain;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-lg);
}

.lightbox__figure figcaption {
  color: var(--text-inverse-muted);
  font-size: 14px;
}

.lightbox__btn {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 28px;
  justify-self: center;
  transition: background-color var(--t-fast);
}

.lightbox__btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.lightbox__close {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 24px;
}

.lightbox__prev {
  grid-column: 1;
  grid-row: 1;
}

.lightbox__next {
  grid-column: 3;
  grid-row: 1;
}

@media (max-width: 640px) {
  .lightbox {
    grid-template-columns: 0 1fr 0;
  }

  .lightbox__figure {
    padding: 64px 12px;
  }

  .lightbox__prev,
  .lightbox__next {
    position: absolute;
    bottom: 20px;
  }

  .lightbox__prev {
    left: calc(50% - 60px);
  }

  .lightbox__next {
    left: calc(50% + 12px);
  }
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity var(--t) var(--ease);
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
