<template>
  <div>
    <v-card class="my-2">
      <v-card-title
        class="text-h5 font-weight-bold justify-center white--text primary py-1"
        >Komentarze</v-card-title
      >
      <v-card-text class="py-1">
        <div v-if="comments.length > 0">
          <comment
            v-for="comment in comments"
            :key="comment.id"
            :nick="comment.user.username"
            :date="comment.creation_date"
            :text="comment.text"
            :commentId="comment.id"
            :children="comment.children"
          />
        </div>
        <p v-else class="text-h4 font-weight-thin text-center mb-0 pa-2">
          Brak komentarzy
        </p>
        <comment-add
          v-if="addComment"
          @close="addComment = false"
        ></comment-add>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn-cap
          v-if="auth && !addComment"
          block
          color="primary"
          @click="addComment = true"
        >
          <span>Dodaj komentarz</span>
          <v-icon right>mdi-comment-plus</v-icon>
        </v-btn-cap>
        <v-row v-if="!auth" no-gutters>
          <v-col>
            <v-alert dense dismissible type="info" class="mb-0"
              >Zaloguj się aby dodac komentarz</v-alert
            >
          </v-col>
        </v-row>
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