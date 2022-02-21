<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank" class="button">
    <slot />
  </a>

  <router-link
    v-else
    v-bind="$props"
    custom
    class="button"
  >
      <slot />
  </router-link>
</template>
 
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  inheritAttrs: false,
})
export default class LinkButton extends Vue {
  @Prop([String, Object]) readonly to: string | object | undefined;

  get isExternalLink() {
    return typeof this.to === 'string' && this.to.startsWith('http');
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/helpers' as *;
@use '@/styles/components/buttons';

.button {
  @include buttons.button-theme($primary, $body-bg);
}
</style>

<style lang="scss">
@use '@/styles/helpers' as *;
@use '@/styles/components/buttons';

.btn.primary,
.btn-primary {
  @include buttons.button-theme($primary, $body-bg);
}
</style>