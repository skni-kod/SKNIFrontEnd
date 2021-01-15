<template>
  <v-btn
    v-bind="{ ...$attrs }"
    v-on="$listeners"
    class="custom-transform-class text-none"
  >
    <slot></slot>
  </v-btn>
</template>
 
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  inheritAttrs: false,
})
export default class VBtnCapitalize extends Vue {}
</script>