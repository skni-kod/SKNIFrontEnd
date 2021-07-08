<template>
  <v-row justify="center" class="text-h3 font-weight-black ma-2">TODO</v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import beAxios from '@/axios';

@Component
export default class AdminPanelSettings extends Vue {
  private data() {
    return {};
  }
}
</script>