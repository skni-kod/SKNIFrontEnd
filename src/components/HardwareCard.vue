<template>
  <v-card tile>
    <v-card-title class="grey lighten-4">
      <v-row>
        <v-col cols="12" sm="3" class="text-center">
          <h3 class="">{{ hardware.name }}</h3>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="12" sm="4" md="3">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <h3 class="grey--text text-center" v-bind="attrs" v-on="on">
                Status:
                <v-icon :class="color()">mdi-record</v-icon>
              </h3>
            </template>
            <span> {{ tooltip }} </span>
          </v-tooltip>
        </v-col>
        <v-col sm="2" md="3" :class="{ 'd-none': $vuetify.breakpoint.xs }">
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
          <v-btn small plain rounded outlined v-else disabled>Wypożycz</v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <markdown-it-vue
      class="md-body text-left pa-5"
      :content="hardware.description.substring(0, 300) + '...'"
    />
    <v-row align="end" style="height: 100%" class="card-text ma-0 white--text">
      <v-col cols="12">
        <v-card-actions class="pa-5">
          <v-spacer />
          <v-btn
            small
            rounded
            outlined
            dark
            class="warning"
            :to="'/hardwareCard/' + hardware.id"
            >Zobacz więcej</v-btn
          >
          <v-speed-dial direction="top" v-if="auth" v-model="fab" class="ml-2">
            <template v-slot:activator>
              <v-btn
                x-small
                fab
                v-model="fab"
                class="text-body-1 font-weight-bold"
                color="primary"
              >
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </template>
            <v-btn
              fab
              x-small
              color="orange"
              :to="'/hardware/edit/' + hardware.id"
            >
              <v-icon>mdi-pen</v-icon>
            </v-btn>
            <v-btn fab x-small color="error" @click="dialog = true">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-speed-dial>
          <confirmation-dialog
            v-if="dialog"
            @yes="deleteHardware(hardware.id)"
            @no="dialog = false"
            :text="dialogText"
          ></confirmation-dialog>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { HardwareModel } from '@/models/HardwareModel';
import { HardwareService } from '@/services/HardwareService';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HardwareCard extends Vue {
  private hardwareService!: HardwareService;
  @Prop() public hardware!: HardwareModel;

  private beforeCreate() {
    this.hardwareService = new HardwareService();
  }

  private color() {
    if (this.hardware.status == 'Unavailable') {
      this.$data.tooltip = 'Sprzęt nie jest wypożyczany.';
      return 'red--text text--lighten-2 text-h4';
    } else if (this.hardware.status == 'Rented') {
      this.$data.tooltip = 'Sprzęt został już wypożyczony.';
      return 'orange--text text--lighten-2 text-h4';
    } else {
      return 'green--text text--lighten-2 text-h4';
    }
  }

  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }
  get dialogText() {
    return 'Czy na pewno chcesz usunąć sprzęt "' + this.hardware.name + '"?';
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
      tooltip: 'Sprzęt dostępny.',
      fab: false,
      dialog: false,
    };
  }
}
</script>