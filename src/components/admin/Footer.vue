<template>
  <div>
    <footer-links-list
      class="ma-2"
      :list="links"
      @remove="deleteLink($event)"
      @edit="showEditForm($event)"
      >Test</footer-links-list
    >
    <v-card class="ma-2 rounded-lg" v-if="addNew || edit">
      <v-card-title
        class="text-h4 white--text justify-center font-weight-bold primary pa-1"
        >Edytor linku</v-card-title
      >
      <v-form v-model="valid">
        <v-card-text class="pt-4 pb-0">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                outlined
                clearable
                prepend-inner-icon="mdi-rename-box"
                label="Tytuł"
                counter="128"
                v-model="linkForm.title"
                :rules="[required, counter(linkForm.title, 128)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined
                clearable
                prepend-inner-icon="mdi-link"
                label="Adres URL"
                v-model="linkForm.link"
                :rules="[required, linkMinLength, isValidLink]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined
                clearable
                prepend-inner-icon="mdi-star-circle"
                label="Ikonka (https://materialdesignicons.com)"
                counter="64"
                v-model="linkForm.icon"
                :rules="[required, counter(linkForm.icon, 64), isIcon]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined
                clearable
                prepend-inner-icon="mdi-palette"
                v-model="linkForm.color"
                label="Kolor"
                counter="64"
                :rules="[required, counter(linkForm.color, 64)]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row justify="end" class="my-3">
            <v-btn-cap
              color="success"
              class="mr-4"
              :disabled="!valid"
              @click="addLink()"
              v-if="addNew"
            >
              <span>Dodaj link</span>
              <v-icon right>mdi-link-plus</v-icon>
            </v-btn-cap>
            <v-btn-cap
              color="success"
              class="mr-4"
              :disabled="!valid"
              @click="editLink()"
              v-if="edit"
            >
              <span>Edytuj link</span>
              <v-icon right>mdi-pencil</v-icon>
            </v-btn-cap>
            <v-btn-cap color="error" class="mr-4" @click="cancelEdit()">
              <span>Anuluj</span>
              <v-icon right>mdi-cancel</v-icon>
            </v-btn-cap>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-btn fab fixed bottom right class="success" @click="addNew = true">
      <v-icon large>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import FooterLinksList from './FooterLinksList.vue';
import { FooterService } from '@/services/FooterService';

@Component({
  components: {
    FooterLinksList,
    NewTag: () =>
      import(/* webpackChunkName: "ComponentNewTag" */ './AddTag.vue'),
  },
})
export default class AdminPanelFooter extends Vue {
  private footerService!: FooterService;

  private beforeCreate() {
    this.footerService = new FooterService();
  }

  private created() {
    this.getLinks();
  }

  private getLinks() {
    this.footerService
      .getLinks()
      .then((res) => {
        this.$data.links = res;
      })
      .catch(() => {
        this.$store.dispatch('errorMessage', 'Błąd przy pobieraniu linków!');
      });
  }

  private cancelEdit() {
    this.$data.addNew = false;
    this.$data.edit = false;
    this.$data.linkForm = {};
  }

  private addLink() {
    this.footerService
      .addLink(this.$data.linkForm)
      .then(() => {
        this.getLinks();
        this.$store.dispatch('successMessage', 'Link został dodany');
      })
      .catch(() => {
        this.$store.dispatch('errorMessage', 'Błąd przy dodawaniu linku!');
      });
    this.$data.newTagName = '';
    this.$data.addNew = false;
  }

  private showEditForm(data: any) {
    this.$data.edit = true;
    this.$data.linkForm = data;
  }

  private editLink() {
    this.footerService
      .editLink(this.$data.linkForm.id, this.$data.linkForm)
      .then(() => {
        this.getLinks();
        this.$store.dispatch('successMessage', 'Link został zmieniony');
        this.$store.dispatch(
          'infoMessage',
          'Zmiany będą widoczne po odświeżeniu strony',
        );
      })
      .catch(() => {
        this.$store.dispatch('errorMessage', 'Błąd przy edycji linku!');
      });
    this.$data.newTagName = '';
    this.$data.edit = false;
  }

  private deleteLink(id: number) {
    this.footerService
      .deleteLink(id)
      .then(() => {
        this.getLinks();
        this.$store.dispatch('successMessage', 'Link został usunięty');
      })
      .catch(() => {
        this.$store.dispatch('errorMessage', 'Błąd przy usuwaniu linku!');
      });
  }

  private data() {
    return {
      valid: false,
      addNew: false,
      edit: false,
      links: [],
      validate: false,
      linkForm: {},
      required: (v: string) => !!v || 'Pole wymagane',
      linkMinLength: (v: string) =>
        (v && v.length >= 4) || 'Pole musi zawierać minimum 4 znaki',
      counter: (v: string, num: number) =>
        (!!v && v.length <= num) ||
        'Pole może zawierać maksymalnie ' + num + ' znaki',
      isValidLink: (v: string) => {
        // https://gist.github.com/dperini/729294
        const pattern = new RegExp(
          '^' +
            '(?:(?:(?:https?|ftp):)?\\/\\/)' +
            '(?:\\S+(?::\\S*)?@)?' +
            '(?:' +
            '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
            '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
            '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
            '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
            '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
            '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
            '|' +
            '(?:' +
            '(?:' +
            '[a-z0-9\\u00a1-\\uffff]' +
            '[a-z0-9\\u00a1-\\uffff_-]{0,62}' +
            ')?' +
            '[a-z0-9\\u00a1-\\uffff]\\.' +
            ')+' +
            '(?:[a-z\\u00a1-\\uffff]{2,}\\.?)' +
            ')' +
            '(?::\\d{2,5})?' +
            '(?:[/?#]\\S*)?' +
            '$',
          'i',
        );
        return pattern.test(v) || 'Link nie jest poprawny';
      },
      isIcon: (v: string) => {
        const pattern = /^[a-zA-Z0-9\-]+$/;
        return pattern.test(v) || 'Niepoprawna ikona';
      },
    };
  }
}
</script>