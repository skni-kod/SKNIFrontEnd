<template>
  <div class="toolbar">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Toolbar extends Vue { }
</script>

<style lang="scss" scoped>
@use '@/styles/helpers' as *;

.toolbar {
  background-color: $primary;
  width: 100%;
  margin-bottom: 50px;
  border-radius: 10px;
  padding: 10px 20px;
  display: flex;
  flex-wrap: wrap;

  .link:not(:last-child) {
    margin-right: 20px;
  }

  .link {
    margin: 10px 0;
  }
}
</style>