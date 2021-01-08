<template>
  <v-col class="mb-5">
    <v-row class="pb-5 text-h6">
      <div>F10k1</div>
      <div class="text-subtitle-2 ml-10 mt-1">
        <v-icon>mdi-calendar</v-icon>
        21.02.2019 23:25:35
      </div>
    </v-row>
    <v-divider />
    <div class="text-xs-left mx-10 mt-3">
      <p>{{ comment }}</p>
      <v-btn
        small
        text
        color="primary"
        v-if="text.length > 300"
        @click="short = !short"
      >
        {{ short ? 'Rozwiń' : 'Zwiń' }}
      </v-btn>
      <div v-if="nested" class="ml-5 mt-5">
        <v-card tile class='elevation-0'
          ><v-card-text><comment text="aa" /><comment text="aa" /></v-card-text
        ></v-card>
      </div>
    </div>
  </v-col>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { CommentModel } from '@/models/CommentModel';

@Component
export default class Comment extends Vue {
  //@Prop() public comment!: CommentModel[];
  @Prop() public text!: string;
  @Prop({ default: false }) public nested!: boolean;

  get comment() {
    if (this.$data.short) {
      return this.text.slice(0, 300);
    } else {
      return this.text;
    }
  }

  private data() {
    return {
      short: true,
    };
  }
}
</script>