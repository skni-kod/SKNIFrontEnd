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
          <v-btn-cap
            block
            outlined
            :disabled="!comment.length"
            color="primary"
            @click="addComment"
          >
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

  private addComment() {
    this.commentsService
      .addComment({
        text: this.$data.comment,
        user: this.$data.author,
        article: this.$route.params.id,
      })
      .then((res: any) => {
        if (res.status === 201) {
          this.$store.dispatch('refreshComments');
          this.$emit('close');
          this.$store.dispatch('setSnackbarState', {
            state: true,
            msg: 'Komentarz został dodany',
            color: 'success',
            timeout: 7500,
          });
        } else {
          this.$store.dispatch('setSnackbarState', {
            state: true,
            msg: 'Błąd poczas zapisywania komentarza!',
            color: 'error',
            timeout: 7500,
          });
        }
      })
      .catch(() => {
        this.$store.dispatch('setSnackbarState', {
          state: true,
          msg: 'Błąd poczas zapisywania komentarza!',
          color: 'error',
          timeout: 7500,
        });
      });
  }

  private data() {
    return {
      comment: '',
      author: this.$store.getters.user.id,
      data: new Date(),
      imputValidated: false,
    };
  }
}
</script>