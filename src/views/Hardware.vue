<template>
  <div class="mt-3">
    <v-row no-gutters justify="center">
      <v-col md="6"
        ><v-card elevation="1" outlined>
          <v-card-title
            class="grey lighten-3 text-h4 primary--text font-weight-bold justify-center"
            >{{ hardware.name }}</v-card-title
          >
          <v-card-text>
            <markdown-it-vue
              class="md-body text-left mb-2"
              :content="hardware.description"
              :options="markdownOptions"
            />
            <v-divider />
            <v-row class="mt-2">
              <v-col cols="12" sm="4" md="4">
                <h3 class="text-center">
                  Status: {{ hardware.status }}
                </h3>
              </v-col>
              <v-col cols="12" sm="4" class="text-center">Numer seryjny:{{ hardware.serial_number}} </v-col>
              <v-col
                sm="2"
                md="1"
                :class="{ 'd-none': $vuetify.breakpoint.xs }"
              >
              </v-col>
              <v-col
                cols="12"
                sm="2"
                :class="{ 'text-center': $vuetify.breakpoint.xs }"
              >
                <v-btn
                  small
                  plain
                  rounded
                  outlined
                  v-if="hardware.status == 'Available'"
                  >Wypożycz</v-btn
                >
                <v-btn small plain rounded outlined v-else disabled
                  >Wypożycz</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text></v-card
        >
      </v-col>
    </v-row>
    <v-speed-dial fixed right bottom direction="top" v-model="fab" v-if="auth">
      <template v-slot:activator>
        <v-btn
          fab
          v-model="fab"
          class="text-body-1 font-weight-bold"
          color="primary"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </template>
      <v-btn fab color="orange" :to="'/hardware/edit/' + $route.params.id">
        <v-icon>mdi-pen</v-icon>
      </v-btn>
      <v-btn fab color="error" @click="dialog = true">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
    <confirmation-dialog
      v-if="dialog"
      @yes="deleteHardware($route.params.id)"
      @no="dialog = false"
      :text="dialogText"
    ></confirmation-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { HardwareService } from '@/services/HardwareService';
import { HardwareModel } from '@/models/HardwareModel';

@Component
export default class Hardware extends Vue {
  private hardwareService!: HardwareService;
  private hardware!: HardwareModel[];

  private beforeCreate() {
    this.hardwareService = new HardwareService();
  }

  private mounted() {
    this.hardwareService
      .getHardware(this.$route.params.id)
      .then((hardware) => {
        this.hardware = hardware;
      })
      .catch(() => {
        this.$router.replace('/404');
      });
  }

  private beforeDestroy() {
    this.$store.dispatch('purgeModule');
  }

  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  get dialogText() {
    return 'Czy na pewno chcesz usunąć sprzęt "' + this.$data.hardware.name + '"?';
  }

  private deleteHardware(id: number) {
    this.hardwareService
      .deleteHardware(id)
      .then((res) => {
        if (res.status === 204) {
          this.$store.dispatch('setSnackbarState', {
            state: true,
            msg: 'Sprzęt został usunięty',
            color: 'success',
            timeout: 7500,
          });
          this.$router.replace('/hardware/1');
        } else {
          this.$store.dispatch('setSnackbarState', {
            state: true,
            msg: 'Błąd poczas usuwania sprzętu!',
            color: 'error',
            timeout: 7500,
          });
        }
      })
      .catch(() => {
        this.$store.dispatch('setSnackbarState', {
          state: true,
          msg: 'Błąd poczas usuwania sprzętu!',
          color: 'error',
          timeout: 7500,
        });
      });
  }

  private data() {
    return {
      hardware: this.hardware,
      fab: false,
      dialog: false,
      markdownOptions: {
        markdownIt: {
          html: true,
          linkify: true,
        },
        githubToc: {
          anchorLink: false,
        },
      },
    };
  }
}
</script>