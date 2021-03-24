<template>
  <v-card tile class="elevation-0">
    <v-card-title class="text-body-1 pa-1">
      <v-row no-gutters align="center" justify="start">
        <v-col cols="auto">
          <p class="font-weight-bold my-auto pr-4">{{ nick }}</p>
        </v-col>
        <v-col cols="auto">
          <v-row no-gutters align="center">
            <v-col cols="auto">
              <v-icon left small>mdi-calendar</v-icon>
            </v-col>
            <v-col>
              <span class="text-body-2">{{
                date | moment('DD-MM-YYYY HH:mm:ss')
              }}</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-1">
      <v-row no-gutters>{{ comment }}</v-row>
      <v-row no-gutters>
        <v-btn-cap
          small
          plain
          :ripple="false"
          color="primary"
          v-if="text.length > 300"
          @click="short = !short"
        >
          {{ short ? 'Rozwiń' : 'Zwiń' }}
        </v-btn-cap>
        <v-btn-cap
          small
          plain
          :ripple="false"
          color="primary"
          v-if="auth && !addComment"
          @click="
            addComment = true;
            editComment = false;
          "
        >
          Odpowiedz
        </v-btn-cap>
        <v-btn-cap
          small
          plain
          :ripple="false"
          color="primary"
          v-if="auth && !editComment"
          @click="
            editComment = true;
            addComment = false;
          "
        >
          Edytuj
        </v-btn-cap>
        <v-btn-cap
          small
          plain
          :ripple="false"
          color="primary"
          v-if="auth"
          @click="deleteComment"
        >
          Usuń
        </v-btn-cap>
      </v-row>
      <comment-add
        v-if="addComment"
        @close="addComment = false"
        :id="commentId"
        addText="Dodaj komentarz"
      ></comment-add>
      <comment-add
        v-else-if="editComment"
        @close="editComment = false"
        :editText="comment"
        addText="Zatwierdź zmiany"
      ></comment-add>
      <v-row v-if="nested" class="ml-4">
        <v-col cols="auto" class="px-0">
          <v-divider vertical></v-divider>
        </v-col>
        <v-col>
          <comment text="Odpowiedź na komentarz" />
          <comment
            text="Odpowiedź na komentarz Odpowiedź na komentarz Odpowiedź na komentarz Odpowiedź na komentarz Odpowiedź na komentarz Odpowiedź na komentarz Odpowiedź na komentarz Odpowiedź na komentarz Odpowiedź na komentarz Odpowiedź na komentarz Odpowiedź na komentarz Odpowiedź na komentarz Odpowiedź na komentarz Odpowiedź na komentarz Odpowiedź na komentarz Odpowiedź na komentarz "
          />
          <comment text="Odpowiedź na komentarz " />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { CommentModel } from '@/models/CommentModel';

@Component
export default class Comment extends Vue {
  @Prop({ required: true }) public nick!: string;
  @Prop({ required: true }) public date!: string;
  @Prop({ required: true }) public text!: string;
  @Prop({ default: false }) public nested!: boolean;
  @Prop({ default: undefined }) public commentId!: number;
  private created() {
    if (this.text.length < 300) {
      this.$data.short = false;
    }
  }

  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  private deleteComment() {
    this.$store.dispatch('deleteComment', this.commentId);
  }

  get comment() {
    if (this.$data.short) {
      return this.text.slice(0, this.text.indexOf(' ', 300)) + '...';
    } else {
      return this.text;
    }
  }

  private data() {
    return {
      short: true,
      addComment: false,
      editComment: false,
    };
  }
}
</script>