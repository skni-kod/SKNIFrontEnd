<template>
  <div>
    <v-speed-dial fixed right bottom direction="top" v-model="fab">
      <template v-slot:activator>
        <v-btn-cap
          large
          v-model="fab"
          class="text-body-1 font-weight-bold"
          color="primary"
          style="z-index: 3"
        >
          <v-icon large v-if="fab" left>mdi-close</v-icon>
          <v-icon large v-else left>mdi-dots-vertical</v-icon>
          <span>Menu</span>
        </v-btn-cap>
      </template>
      <v-container class="ma-0 pa-0">
        <v-row justify="end">
          <v-btn-cap
            color="blue white--text"
            class="ma-2"
            @click="$vuetify.goTo(0, { duration: 1000 })"
          >
            <v-icon left>mdi-arrow-collapse-up</v-icon>
            <span>Przejdź na górę</span>
          </v-btn-cap>
        </v-row>
        <v-row justify="end">
          <v-btn-cap
            color="blue white--text"
            class="ma-2"
            @click="$vuetify.goTo('footer', { duration: 1000 })"
          >
            <v-icon left>mdi-arrow-collapse-down</v-icon>
            <span>Przejdź na dół</span>
          </v-btn-cap>
        </v-row>
        <v-row justify="end">
          <v-btn-cap color="success" class="ma-2" @click="saveChanges">
            <v-icon left>mdi-pencil</v-icon>
            <span>{{ saveText }}</span>
          </v-btn-cap>
        </v-row>
        <v-row justify="end">
          <v-btn-cap color="error" class="ma-2" @click="dialog = true">
            <v-icon left>mdi-pencil-off</v-icon>
            <span>{{ discardText }}</span>
          </v-btn-cap>
        </v-row>
      </v-container>
    </v-speed-dial>
    <confirmation-dialog
      v-if="dialog"
      @yes="discardChanges"
      @no="dialog = false"
      :text="text"
    ></confirmation-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class EditorMenu extends Vue {
  @Prop({ required: true }) private text!: string;
  @Prop({ default: 'Zatwierdź zmiany' }) private saveText!: string;
  @Prop({ default: 'Odrzuć zmiany' }) private discardText!: string;

  private saveChanges() {
    this.$emit('saveChanges');
  }
  private discardChanges() {
    this.$emit('discardChanges');
  }
  private data() {
    return {
      dialog: false,
      fab: false,
    };
  }
}
</script>