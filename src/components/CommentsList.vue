<template>
  <section class="comments" aria-labelledby="comments-title">
    <header class="comments__head">
      <h2 id="comments-title" class="comments__title">
        Komentarze <span class="comments__count">{{ total }}</span>
      </h2>
    </header>

    <div v-if="auth" class="comments__new">
      <CommentEditor v-if="addComment" @close="addComment = false" />
      <button v-else type="button" class="comments__prompt" @click="addComment = true">
        <i class="mdi mdi-comment-text-outline" aria-hidden="true"></i>
        Dodaj komentarz…
      </button>
    </div>
    <div v-else class="alert">
      <i class="mdi mdi-information-outline" aria-hidden="true"></i>
      <span>
        <router-link :to="{ name: 'login' }"><strong>Zaloguj się</strong></router-link>, aby dodać komentarz.
      </span>
    </div>

    <div v-if="comments.length > 0" class="comments__list">
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :nick="comment.user.username"
        :date="comment.creation_date"
        :text="comment.text"
        :comment-id="comment.id"
        :children="comment.children"
      />
    </div>
    <p v-else class="comments__empty">Nikt jeszcze nie skomentował. Bądź pierwszy!</p>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import Comment from '@/components/Comment.vue';
import CommentEditor from '@/components/CommentEditor.vue';

const props = defineProps<{ comments: any[] }>();
const store = useStore();
const addComment = ref(false);
const auth = computed<boolean>(() => store.getters.isAuthenticated);
const total = computed(() =>
  props.comments.reduce((sum, c) => sum + 1 + ((c.children && c.children.length) || 0), 0),
);
</script>

<style scoped>
.comments {
  display: grid;
  gap: 24px;
}

.comments__title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
}

.comments__count {
  display: inline-grid;
  place-items: center;
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  border-radius: var(--radius-pill);
  background: var(--surface-2);
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
}

.comments__prompt {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  background: #fff;
  color: var(--text-subtle);
  font-size: 15px;
  text-align: left;
  transition: border-color var(--t-fast);
}

.comments__prompt:hover {
  border-color: var(--primary);
}

.comments__prompt .mdi {
  font-size: 20px;
}

.comments__list {
  display: grid;
  gap: 28px;
  padding-top: 8px;
}

.comments__empty {
  padding: 28px;
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--text-muted);
  text-align: center;
  font-size: 15px;
}
</style>
