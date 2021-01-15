<template>
  <div>
    <v-card class="my-2">
      <v-card-title
        class="text-h5 font-weight-bold justify-center white--text primary py-1"
        >Komentarze</v-card-title
      >
      <v-card-text class="py-1">
        <comment text="Testowy komentarz" />
        <comment
          text="Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz Testowy komentarz "
          :nested="true"
        />
        <comment text="Testowy komentarz" />
        <comment-add
          v-if="addComment"
          @close="addComment = false"
        ></comment-add>
      </v-card-text>
      <v-card-actions v-if="auth && !addComment">
        <v-btn-cap block color="primary" @click="addComment = true">
          <span>Dodaj komentarz</span>
          <v-icon right>mdi-comment-plus</v-icon>
        </v-btn-cap>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CommentModel } from '@/models/CommentModel';

@Component
export default class CommentsList extends Vue {
  @Prop() public comments!: CommentModel[];

  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  private data() {
    return {
      addComment: false,
    };
  }
}
</script>