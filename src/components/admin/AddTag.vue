<template>
  <v-dialog v-model="value">
    <v-card>
      <v-card-title>Dodaj tag</v-card-title>
      <v-card-text>
        <v-text-field
          class="pt-2 pb-2"
          prepend-inner-icon="mdi-tag-plus"
          solo
          text
          clearable
          label="Dodaj tag"
          hide-details
          v-model="newTagName"
        ></v-text-field>
        <v-card-actions>
          <v-btn block color="primary" :disabled="!newTagName" @click="add">
            <v-icon left>mdi-tag-plus</v-icon>
            <span>Dodaj tag</span>
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class AddTag extends Vue {
  @Prop({ required: true }) private value!: boolean;

  get popup() {
    return this.value;
  }

  set popup(val) {
    this.$emit('input', val);
  }

  private add() {
    this.$emit('add', this.$data.newTagName);
  }

  private data() {
    return {
      newTagName: '',
    };
  }
}
</script>