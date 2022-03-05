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
        <v-form v-model="inputValidated">

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

          <v-img
            v-if="image"
            contain
            width="300"
            :src="be + image.image"
            aspect-ratio="1"
          />

          <div v-if="image">{{be + image.image}}</div>

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
      Dodaj
    </v-btn>
  </div>
</template>

<script lang="ts">
import { SponsorModel } from '@/models/SponsorModel';
import { SponsorsService } from '@/services/SponsorsService';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class EditSponsor extends Vue {
  service!: SponsorsService;
  sponsor!: SponsorModel;

  created() {
    this.service = new SponsorsService();

    if (this.$route.path.includes('add')) {
      this.sponsor = new SponsorModel();
    }
  }

  async add() {
    let response = await this.service.addSponsor(this.sponsor.name, this.sponsor.url, this.$data.image);
    console.log(response);
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
    };
  }
}
</script>