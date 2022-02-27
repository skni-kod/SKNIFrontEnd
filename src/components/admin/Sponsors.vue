<template>
<div>
  <v-simple-table
    v-if="sponsors">
     <thead>
        <tr>
          <th class="text-left">
            Nazwa
          </th>
          <th class="text-left">
            Usuń
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in sponsors"
          :key="item.id"
        >
          <td>{{ item.name }}</td>
          <td>
            <v-btn
             depressed 
             color="error">
              Usuń
            </v-btn>
          </td>
        </tr>
      </tbody>
  </v-simple-table>
  <v-btn>
    Dodaj
  </v-btn>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import beAxios from '@/axios';
import { SponsorModel } from '@/models/SponsorModel';
import { SponsorsService } from '@/services/SponsorsService'


@Component
export default class AdminPanelSponsors extends Vue {
    
  sponsors!: SponsorModel[];
  sponsorsService!: SponsorsService;

  beforeCreate() {
    this.sponsorsService = new SponsorsService();
  }
  
  mounted() {
    this.sponsorsService.getSponsors().then((models: SponsorModel[]) => {
      this.sponsors = models;
    })
  }

  
  private data() {
    return {
      sponsors: this.sponsors,
    };
  }
}
</script>