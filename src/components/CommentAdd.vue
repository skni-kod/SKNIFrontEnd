<template>
  <v-card outlined>
    <v-card-title class="text-body-1 white--text primary pa-1"
      >Dodaj komentarz</v-card-title
    >
    <v-divider></v-divider>
    <v-card-text class="pa-1">
      <v-textarea outlined hide-details v-model="comment"></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-row justify="end" no-gutters>
        <v-col cols="12" sm="auto" class="px-2 py-1">
          <v-btn block outlined color="error" @click="cancel">
            <span>Anuluj</span>
            <v-icon right>mdi-cancel</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" sm="auto" class="px-2 py-1">
          <v-btn block outlined :disabled="!comment.length" color="primary">
            <span>Dodaj komentarz</span>
            <v-icon right>mdi-comment-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { CommentsService } from '@/services/CommentsService';

@Component
export default class CommentAdd extends Vue {
  @Prop() private article!: number;
  @Prop() private replyfor!: number;
  private commentsService!: CommentsService;

  private created() {
    this.commentsService = new CommentsService();
  }

  private cancel() {
      this.$emit('cancel');
  }

  private data() {
    return {
      comment: '',
    };
  }
}
</script>