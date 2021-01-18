<template>
  <div>
    <!--<v-row justify="center" v-for="hardware in hardwares" :key="hardware.title">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <project-card class="my-2" :project="hardware"></project-card>
      </v-col>
    </v-row>
    <v-pagination
      v-model="pagination.currentPage"
      :length="pagination.pageCount"
      @input="paginationClicked"
      prev-icon="mdi-chevron-left"
      next-icon="mdi-chevron-right"
      class="mb-3"
    ></v-pagination>
    -->
    <v-row justify="center" class="pa-5">
      <v-col cols="5" sm="10" md="8" lg="6" xl="4">
        <hardware-card name='Arduino' :is_rented="true" :to_rent="true" img='arduino.jpg'></hardware-card
      ></v-col>
      <v-col cols="5" sm="10" md="8" lg="6" xl="4">
        <hardware-card name='Kaczuszka' :is_rented="false" :to_rent="true" img='rubber_duck.jpg'></hardware-card
      ></v-col>
      <v-col cols="5" sm="10" md="8" lg="6" xl="4">
        <hardware-card name='Monitor' :is_rented="false" :to_rent="true"></hardware-card
      ></v-col>
    </v-row>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { HardwaresService } from '@/services/HardwaresService';
import { HardwareModel } from '@/models/HardwareModel';
import { PaginationModel } from '@/models/PaginationModel';
import { PaginationContainer } from '@/models/PaginationContainer';

import HardwareCard from '@/components/HardwareCard.vue';

@Component({
  components: {
    HardwareCard,
  },
})
export default class HardwareList extends Vue {
  private hardwaresService!: HardwaresService;
  private pagination!: PaginationModel;
  private hardware!: HardwareModel[];
  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  private beforeCreate() {
    this.hardwaresService = new HardwaresService();
    this.pagination = new PaginationModel(1, 3, 3);
  }

  /*private mounted() {
    this.getHardwares();
  }

  private paginationClicked(pageNumber: number) {
    this.$router.replace({
      name: 'hardwares',
      params: { page: '' + pageNumber },
    });

    this.getHardwares();
  }

  private getHardwares() {
    let pageNumber = +this.$route.params.page;
    if (pageNumber === undefined || isNaN(pageNumber)) {
      pageNumber = 1;
    }

    this.pagination.currentPage = pageNumber;
    this.hardwaresService
      .getHardwareByPage(pageNumber, this.pagination.itemsPerPage)
      .then((paginationContainer: PaginationContainer<HardwareModel>) => {
        this.hardwares = paginationContainer.results;
        if (!this.hardwares.length) {
          this.paginationClicked(1);
          return;
        }
        this.pagination.itemCount = paginationContainer.count;
      });
  }
  */

  private data() {
    return {
      hardware: this.hardware,
    };
  }
}
</script>
