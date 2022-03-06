<template>
  <div>
    <p
      class="text-h4 text-center font-weight-bold justify-center ma-2"
      style="word-break: break-word"
    >
      Sponsor
    </p>

    <v-card outlined>
      <v-card-text>
        <v-form v-if="sponsor" v-model="inputValidated">

          <v-text-field
            label="id"
            v-if="modifing"
            v-model="sponsor.id"
            :readonly = true
          ></v-text-field>


          <v-text-field
            clearable
            label="Nazwa"
            v-model="sponsor.name"
            :rules="[required]"
          ></v-text-field>

          <v-text-field
            clearable
            label="Link"
            v-model="sponsor.url"
            :rules="[required]"
          ></v-text-field>

          <div v-if="sponsor.logo">
            <p class="font-weight-regular">
              Poprzednie logo
            </p>

            <v-img
              contain
              :src="mediaURL + sponsor.logo"
            />
          </div>

          <v-file-input
            v-model="image"
            label="Logo"
            accept=".jpg, .jpeg, .png, .bmp"
          />
        </v-form>
      </v-card-text>
    </v-card>

    <v-btn
     @click="add()">
      {{modifing ? "Zaktualizuj" : "Dodaj"}}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { SponsorModel } from '@/models/SponsorModel';
import { SponsorsService } from '@/services/SponsorsService';
import { AxiosPromise, AxiosResponse } from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class EditSponsor extends Vue {
  service!: SponsorsService;
  sponsor!: SponsorModel;

  async created() {
    this.service = new SponsorsService();

    if (this.$route.path.includes('add')) {
      this.sponsor = new SponsorModel();
    }
    else {
      const response = await this.service.getSponsor(this.$route.params.id);
      if(response.status === 200) {
        this.sponsor = response.data;
        this.$data.modifing = true;
      }
      else {
        this.$store.dispatch('errorMessage', 'Nie udało się pobrać danych!');
      }
    }
  }

  async add() {
    let response: Promise<AxiosResponse<any>>;
    if(this.$data.modifing) {
      response = this.service.modifySponsor(this.sponsor, this.$data.image);
    }
    else {
      response = this.service.addSponsor(this.sponsor.name, this.sponsor.url, this.$data.image);
    }

    let result = await response;
    if(result.status === 201 || result.status === 200) {
      this.$router.replace({name: "adminPanel", params: {module: 'sponsors'}});
    }
    else {
      this.$store.dispatch('errorMessage', 'Nie udało się dodać/zmodyfikować sponsora!');
    }
  }

  get mediaURL() {
    return process.env.VUE_APP_MEDIA_URL;
  }

  data() {
    return {
      inputValidated: false,
      required: (value: string) => !!value || 'Pole wymagane',
      sponsor: this.sponsor,
      image: undefined,
      modifing: false,
    };
  }
}
</script>