<template>
  <v-dialog persistent :max-width="maxwidth" value="true">
    <v-card>
      <v-card-title class="text-h4 white--text primary px-4 py-3">{{ title }}</v-card-title>
      <v-divider />
      <v-card-text class="text-h6 px-4 pt-2 pb-0">{{ text }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn-cap color="error" @click="No">Nie</v-btn-cap>
        <v-btn-cap color="success" @click="Yes">Tak</v-btn-cap>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component
export default class ConfirmationDialog extends Vue {
  @Prop({ default: 'Potwierdzenie' }) public readonly title!: string;
  @Prop({ required: true }) public readonly text!: string;
  @Prop({ default: 400 }) public readonly maxwidth!: number;

  private Yes() {
    this.$emit('yes');
  }

  private No() {
    this.$emit('no');
  }
}
</script>