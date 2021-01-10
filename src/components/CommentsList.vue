<template>
  <div>
    <v-card class="my-2">
      <v-card-title
        class="text-h5 font-weight-bold justify-center white--text primary py-1"
        >Komentarze</v-card-title
      >
      <v-card-text class="py-1">
        <comment text="Testowy komentarz" />
        <comment text="Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz " :nested="true" />
        <comment text="Testowy komentarz" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CommentModel } from '@/models/CommentModel';

@Component
export default class CommentsList extends Vue {
  @Prop() public comments!: CommentModel[];
}
</script>