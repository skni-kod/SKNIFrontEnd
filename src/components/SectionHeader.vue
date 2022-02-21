<template>
  <div class="section-header">
    <span class="section-subtitle" v-if="subtitle">{{ subtitle }}</span>
    <h2 class="section-title" v-html="title"></h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({})
export default class SectionHeader extends Vue {
  @Prop({ required: true }) title!: string;
  @Prop() subtitle: string | undefined;
}
</script>

<style lang="scss" scoped>
@use '@/styles/helpers' as *;

.section-header {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .section-subtitle {
    font-weight: 700;
    font-size: 16px;
    color: $primary;
    text-transform: uppercase;
  }

  .section-title {
    font-family: "Montserrat";
    font-weight: 500;
    font-size: clamp(35px, 3vw, 41px);
    line-height: 1.2;
  }
}
</style>
