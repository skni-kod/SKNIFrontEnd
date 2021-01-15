<template>
  <v-card outlined>
    <v-card-title class="text-body-1 white--text primary py-1"
      >Dodaj komentarz</v-card-title
    >
    <v-divider></v-divider>
    <v-card-text class="pa-1">
      <v-textarea outlined hide-details v-model="comment"></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-row justify="end" no-gutters>
        <v-col cols="12" sm="auto" class="px-2 py-1">
          <v-btn-cap block outlined color="error" @click="close">
            <span>Anuluj</span>
            <v-icon right>mdi-cancel</v-icon>
          </v-btn-cap>
        </v-col>
        <v-col cols="12" sm="auto" class="px-2 py-1">
          <v-btn-cap block outlined :disabled="!comment.length" color="primary">
            <span>{{ addText }}</span>
            <v-icon right>mdi-comment-plus</v-icon>
          </v-btn-cap>
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
  @Prop({ default: 'Dodaj komentarz' }) private addText!: string;
  private commentsService!: CommentsService;

  private created() {
    this.commentsService = new CommentsService();
  }

  private close() {
    this.$emit('close');
  }

  private data() {
    return {
      comment: '',
    };
  }
}
</script>