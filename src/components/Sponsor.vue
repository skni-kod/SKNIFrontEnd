<template>
  <a :href="link" class="sponsor">
    <img :src="image" :alt="name" class="image" />
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Section extends Vue {
  @Prop(String) link!: string;
  @Prop(String) name!: string;
  @Prop(String) image!: string;
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
