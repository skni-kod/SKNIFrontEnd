<template>
  <v-footer id="footer" height="auto" class="pa-0">
    <v-col class="pa-0">
      <v-img width="120" src="../assets/logo_color.png" class="ma-auto" />
      <v-row align="center" justify="center" class="mb-0">
        <v-col cols="auto" class="pa-0">
          <div>
            <strong>SKNI KOD</strong>
            &nbsp; &copy;{{ new Date().getFullYear() }}
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
                <v-icon>{{ link.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ link.text }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  private data() {
    return {
      links: [
        {
          link: 'https://www.facebook.com/skni.kod/',
          icon: 'mdi-facebook',
          text: 'Facebook SKNI KOD\'u',
        },
        {
          link: 'https://www.linkedin.com/company/skni-kod/',
          icon: 'mdi-linkedin',
          text: 'LinkedIn SKNI KOD\'u',
        },
      ],
    };
  }
}
</script>
