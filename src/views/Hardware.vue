<template>
  <div class="hardware">
    <h1>Our hardware</h1>
    <ul id="example-1">
      <li v-for="hardware in hardwares">{{ hardware.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
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