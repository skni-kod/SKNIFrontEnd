<template>
<div>
  <v-simple-table
    v-if="sponsors">
     <thead>
        <tr>
          <th class="text-left">
            Id
          </th>

          <th class="text-left">
            Nazwa
          </th>

          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in sponsors"
          :key="item.id"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          
          <td class="text-center">
            <v-btn
             depressed 
             @click="modifySponsor(item)">
              Modifikuj
            </v-btn>
          </td>


          <td class="text-center">
            <v-btn
             depressed 
             color="error"
             @click="deleteSponsor(item)">
              Usuń
            </v-btn>
          </td>
        </tr>
      </tbody>
  </v-simple-table>

  <v-btn 
   color="primary"
   @click="newSponsor()">
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
    });
  }

  newSponsor() {

  }

  async deleteSponsor(sponsor: SponsorModel) {
    await this.sponsorsService.deleteSponsor(sponsor);

    this.sponsorsService.getSponsors().then((models: SponsorModel[]) => {
      this.sponsors = models;
    });
  }

  modifySponsor(sponsor: SponsorModel) {

  }

  private data() {
    return {
      sponsors: this.sponsors,
    };
  }
}
</script>