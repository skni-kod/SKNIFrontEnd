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
             :to="{name: 'sponsorsEdit', params: {id: item.id}}">
              Modifikuj
            </v-btn>
          </td>


          <td class="text-center">
            <v-btn
             depressed 
             color="error"
             @click="selectToDelete(item)">
              Usuń
            </v-btn>
          </td>
        </tr>
      </tbody>
  </v-simple-table>

  <v-btn 
   color="primary"
   :to=" {name: 'sponsorsAdd'} ">
    Dodaj
  </v-btn>


  <confirmation-dialog
    v-if="selected !== null"
    @yes="deleteSponsor(selected)"
    @no="selected = null"
    :text=" 'Czy na pewno chcesz usunąć ' + selected.name + '?' "
  ></confirmation-dialog>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import beAxios from '@/axios';
import { SponsorModel } from '@/models/SponsorModel';
import { SponsorsService } from '@/services/SponsorsService';


@Component
export default class AdminPanelSponsors extends Vue {
  sponsors!: SponsorModel[];
  sponsorsService!: SponsorsService;

  beforeCreate() {
    this.sponsorsService = new SponsorsService();
  }

  async mounted() {
    this.getSponsors();
  }

  async getSponsors() {
    const response = await this.sponsorsService.getSponsors();
    if (response.status === 200) {
      this.sponsors = response.data;
    }
    else {
      this.$store.dispatch('errorMessage', 'Nie udało się pobrać listy sponsorów!');
    }
  }

  selectToDelete(sponsor: SponsorModel) {
    this.$data.selected = sponsor;
  }

  async deleteSponsor(sponsor: SponsorModel) {
    await this.sponsorsService.deleteSponsor(sponsor);
    this.$data.selected = null;

    this.getSponsors();
  }

  private data() {
    return {
      sponsors: this.sponsors,
      selected: null,
    };
  }
}
</script>