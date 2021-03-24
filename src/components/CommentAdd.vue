<template>
  <v-card outlined>
    <v-card-title class="text-body-1 white--text primary py-1"
      >Dodaj komentarz</v-card-title
    >
    <v-divider></v-divider>
    <v-card-text class="pa-1">
      <v-textarea
        outlined
        hide-details
        v-model="comment"
        :value="comment"
      ></v-textarea>
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
            v-if="addText == 'Dodaj komentarz'"
            :disabled="!comment.length"
            color="primary"
            @click="addComment"
          >
            <span>{{ addText }}</span>
            <v-icon right>mdi-comment-plus</v-icon>
          </v-btn-cap>
          <v-btn-cap
            block
            outlined
            v-else
            :disabled="!comment.length"
            color="primary"
            @click="editComment"
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

@Component
export default class CommentAdd extends Vue {
  @Prop() private article!: number;
  @Prop() private replyfor!: number;
  @Prop({ default: 'Dodaj komentarz' }) private addText!: string;
  @Prop({ default: '' }) private editText!: string;
  @Prop({ default: undefined }) private id!: number;

  private close() {
    this.$emit('close');
  }

  private addComment() {
    if (this.id !== undefined) {
      this.$store.dispatch('addComment', {
        text: this.$data.comment,
        user: this.$data.author,
        parent: this.id,
      });
    } else {
      this.$store.dispatch('addComment', {
        text: this.$data.comment,
        user: this.$data.author,
        article: this.$route.params.id,
      });
    }
    this.$emit('close');
  }

  private editComment() {
    this.$store.dispatch('editComment', {
      body: { text: this.$data.comment, user: this.$store.getters.user.id },
      id: this.id,
    });
    this.$emit('close');
  }
  private data() {
    return {
      comment: this.editText,
      author: this.$store.getters.user.id,
      data: new Date(),
      imputValidated: false,
    };
  }
}
</script>