<template>
  <div class="ma-4 fill-height">
    <div v-if="sections && sections.length > 0">
      <v-row justify="center" v-for="section in sections" :key="section.id">
        <v-col cols="12" sm="10" md="8" lg="6" xl="4">
          <section-card
            class="my-2"
            :section="section"
            :projects="projects"
            @delete="deleteSection"
          >
          </section-card>
        </v-col>
      </v-row>
    </div>
    <v-row align="center" class="fill-height" v-else>
      <v-col>
        <div class="text-h3 font-weight-bold text-center">
          {{ loading ? 'Ładowanie danych' : 'Brak sekcji' }}
          <v-progress-circular
            indeterminate
            color="primary"
            v-if="loading"
          ></v-progress-circular>
        </div>
      </v-col>
    </v-row>
    <v-btn-cap
      fab
      fixed
      bottom
      right
      v-if="auth"
      :to="{name:'addSection'}"
      class="success"
    >
      <v-icon class="white--text">mdi-plus</v-icon>
    </v-btn-cap>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { SectionsService } from '@/services/SectionsService';
import { SectionModel } from '@/models/SectionModel';
import SectionCard from '@/components/SectionCard.vue';
import { ProjectsService } from '@/services/ProjectsService';

@Component({
  components: {
    SectionCard,
  },
})
export default class SectionList extends Vue {
  private sectionsService!: SectionsService;
  private sections!: SectionModel[];
  private projectsService!: ProjectsService;
  constructor() {
    super();
    this.sectionsService = new SectionsService();
    this.projectsService = new ProjectsService();
  }

  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  public created() {
    this.projectsService.getAllProjects().then((res) => {
      this.$data.projects = res;
    });
    this.sectionsService
      .getAllSections()
      .then((p) => {
        this.sections = p;
        for (let i = 0; i < this.sections.length; ) {
          if (this.sections[i].isVisible === false) {
            this.sections.splice(i, 1);
          } else {
            i++;
          }
        }
        this.$data.loading = false;
      })
      .catch(() => {
        this.$data.loading = false;
      });
  }

  private deleteSection(id: number) {
    this.sectionsService
      .deleteSection(id)
      .then((res) => {
        if (res.status === 204) {
          this.$store.dispatch('setSnackbarState', {
            state: true,
            msg: 'Sekcja została usunięta',
            color: 'success',
            timeout: 7500,
          });
          this.$data.sections = this.$data.sections.filter((el: any) => {
            return el.id !== id;
          });
        } else {
          this.$store.dispatch('setSnackbarState', {
            state: true,
            msg: 'Błąd poczas usuwania sekcji!',
            color: 'error',
            timeout: 7500,
          });
        }
      })
      .catch(() => {
        this.$store.dispatch('setSnackbarState', {
          state: true,
          msg: 'Błąd poczas usuwania secji!',
          color: 'error',
          timeout: 7500,
        });
      });
  }

  private data() {
    return {
      sections: this.sections,
      projects: [],
      loading: true,
    };
  }
}
</script>
