<template>
  <div>
    <hardwares-list v-bind:hardwares="hardwares"></hardwares-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import HardwaresList from '@/components/HardwaresList.vue';
import { HardwaresService } from '@/services/HardwaresService';
import { HardwareModel } from '@/models/HardwareModel';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Hardware extends Vue {
  private hardwaresService!: HardwaresService;
  private hardwares!: HardwareModel[];

  constructor() {
    super();
    this.hardwaresService = new HardwaresService();
  }

  public async mounted() {
    this.hardwares = await this.hardwaresService.getAllHardware();
  }

  public data() {
    return { hardwares: this.hardwares };
  }
}
</script>