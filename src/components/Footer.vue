<template>
  <v-footer id="footer" height="auto" class="pa-0">
    <v-col class="pa-0">
      <v-img width="120" src="../assets/logo_color.png" class="ma-auto" />
      <v-row align="center" justify="center" class="mb-0">
        <v-col cols="auto" class="pa-0">
          <div>
            <strong>SKNI KOD</strong>
            &nbsp; &copy;{{ new Date().getFullYear() }} &nbsp; 
          </div>
        </v-col>
        <v-col cols="auto" class="pa-0" v-for="link in links" :key="link.link">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :href="link.link"
                small
                icon
                text
                color="primary"
                class="font-weight-bold"
                target="_blank"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon :color="link.color">{{ link.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ link.title }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FooterService } from '@/services/FooterService';
import { FooterModel } from '@/models/FooterModel';

@Component
export default class Footer extends Vue {
  private footerService!: FooterService;
  private footer!: FooterModel[];

  private beforeCreate() {
    this.footerService = new FooterService();
  }

  private mounted() {
    this.footerService
      .getLinks()
      .then((res) => {
        this.$data.links = res
      })
      .catch(() => {
        this.$router.replace({ name: 'error404' });
      });
  }

  private data() {
    return {
      links: [],
    };
  }
}
</script>
