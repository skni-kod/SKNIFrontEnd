<template>
  <a :href="model.url" class="sponsor">
    <img :src="model.image" :alt="model.name" class="image" />
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { SponsorModel } from '@/models/SponsorModel';

@Component
export default class Sponsor extends Vue {
  @Prop(Object) model!: SponsorModel;
}
</script>

<style lang="scss" scoped>
@use '@/styles/helpers' as *;
@use '@/styles/components/buttons';

.sponsor {
  max-width: 300px;
  padding: 0 30px;

  .image {
    max-width: 100%;
    width: auto;
    height: 60px;
    object-fit: contain;
    display: block;
  }
}
</style>
