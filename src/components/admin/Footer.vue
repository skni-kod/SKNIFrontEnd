<template>
  <div>
    <v-row align="center" class="fill-height">
      <v-col>
        <v-row
          no-gutters
          align="center"
          justify="center"
          class="ma-2 fill-height"
        >
          <v-col lg="9">
            <footer-links-list
              :list="links"
              @remove="deleteLink($event)"
              @edit="showEditForm($event)"
              >Test</footer-links-list
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-btn fab fixed bottom right class="success" @click="addNew = true">
      <v-icon large>mdi-plus</v-icon>
    </v-btn>
    <v-form v-if="addNew || edit">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              label="Tytuł"
              counter="128"
              v-model="linkForm.title"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Adres URL"
              v-model="linkForm.link"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Ikonka (mdi-)(https://materialdesignicons.com)"
              counter="64"
              v-model="linkForm.icon"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="linkForm.color"
              label="Kolor"
              counter="64"
              required
            ></v-text-field>
          </v-col>
          <v-row justify="end" class="my-3">
            <v-btn
              color="success"
              class="mr-4"
              @click="addLink()"
              v-if="addNew"
            >
              Dodaj link
            </v-btn>
            <v-btn
              color="success"
              class="mr-4"
              @click="editLink()"
              v-if="edit"
            >
              Edytuj link
            </v-btn>
            <v-btn
              color="error"
              class="mr-4"
              @click="
                addNew = false;
                edit = false;
                linkForm = { title: '', link: '', icon: '', color: '' };
              "
            >
              Anuluj
            </v-btn>
          </v-row>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import FooterLinksList from './FooterLinksList.vue';
import { FooterService } from '@/services/FooterService';
import beAxios from '@/axios';

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
  showEditForm(data: any) {
    this.$data.edit = true;
    this.$data.linkForm = data;
  }
  private editLink() {
    this.footerService
      .editLink(this.$data.linkForm.id,this.$data.linkForm)
      .then(() => {
        this.getLinks();
        this.$store.dispatch('successMessage', 'Link został zmieniony');
        this.$store.dispatch('infoMessage', 'Zmiany będą widoczne po odświeżeniu strony');
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
      addNew: false,
      edit: false,
      links: [],
      validate: false,
      linkForm: { title: '', link: '', icon: '', color: '' },
    };
  }
}
</script>