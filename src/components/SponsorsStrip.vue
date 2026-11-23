<template>
  <div v-if="sponsors.length" class="sponsors">
    <a
      v-for="sponsor in sponsors"
      :key="sponsor.id"
      :href="sponsor.url"
      target="_blank"
      rel="noopener"
      class="sponsors__item"
      :title="sponsor.name"
    >
      <img :src="mediaUrl(sponsor.logo)" :alt="sponsor.name" loading="lazy" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { SponsorModel } from '@/models/SponsorModel';
import { SponsorsService } from '@/services/SponsorsService';
import { mediaUrl } from '@/utils/media';

const emit = defineEmits<{ loaded: [count: number] }>();
const sponsors = ref<SponsorModel[]>([]);

function shuffleArray<T>(array: T[]): T[] {
  let ctr = array.length;
  while (ctr > 0) {
    const index = Math.floor(Math.random() * ctr);
    ctr--;
    [array[ctr], array[index]] = [array[index], array[ctr]];
  }
  return array;
}

onMounted(async () => {
  try {
    const response = await new SponsorsService().getSponsors();
    if (response.status === 200) {
      sponsors.value = shuffleArray(response.data);
    }
  } catch {
    sponsors.value = [];
  }
  emit('loaded', sponsors.value.length);
});
</script>

<style scoped>
.sponsors {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.sponsors__item {
  display: grid;
  place-items: center;
  width: 220px;
  height: 120px;
  padding: 22px 28px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color var(--t), box-shadow var(--t), transform var(--t) var(--ease);
}

.sponsors__item:hover {
  border-color: var(--border-strong);
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.sponsors__item img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: grayscale(1);
  opacity: 0.75;
  transition: filter var(--t), opacity var(--t);
}

.sponsors__item:hover img {
  filter: none;
  opacity: 1;
}

@media (max-width: 520px) {
  .sponsors__item {
    width: calc(50% - 8px);
    height: 96px;
    padding: 16px;
  }
}
</style>
