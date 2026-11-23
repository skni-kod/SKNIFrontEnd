<template>
  <div class="comment">
    <UserAvatar :username="nick" :size="nested ? 30 : 38" />
    <div class="comment__main">
      <header class="comment__head">
        <strong>{{ nick }}</strong>
        <time :datetime="String(date)">{{ formatDateTime(date) }}</time>
      </header>

      <CommentEditor
        v-if="editComment"
        mode="edit"
        :edit-text="text"
        :id="commentId"
        add-text="Zapisz zmiany"
        @close="editComment = false"
      />
      <p v-else class="comment__text">{{ displayed }}</p>

      <div v-if="!editComment" class="comment__actions">
        <button v-if="text.length > 300" type="button" class="link-btn" @click="short = !short">
          {{ short ? 'Rozwiń' : 'Zwiń' }}
        </button>
        <button v-if="auth && !nested" type="button" class="link-btn" @click="startReply">
          <i class="mdi mdi-reply-outline" aria-hidden="true"></i> Odpowiedz
        </button>
        <button v-if="isOwner" type="button" class="link-btn" @click="startEdit">
          <i class="mdi mdi-pencil-outline" aria-hidden="true"></i> Edytuj
        </button>
        <button v-if="isOwner" type="button" class="link-btn link-btn--danger" @click="deleteComment">
          <i class="mdi mdi-trash-can-outline" aria-hidden="true"></i> Usuń
        </button>
      </div>

      <CommentEditor
        v-if="addComment"
        class="comment__reply"
        :id="commentId"
        add-text="Odpowiedz"
        placeholder="Napisz odpowiedź…"
        @close="addComment = false"
      />

      <div v-if="!nested && children && children.length" class="comment__children">
        <Comment
          v-for="child in children"
          :key="child.id"
          :nick="child.user.username"
          :date="child.creation_date"
          :text="child.text"
          :comment-id="child.id"
          :nested="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import UserAvatar from '@/components/ui/UserAvatar.vue';
import CommentEditor from '@/components/CommentEditor.vue';
import { formatDateTime } from '@/utils/date';

const props = withDefaults(
  defineProps<{
    nick: string;
    date: string | Date;
    text: string;
    nested?: boolean;
    children?: any[];
    commentId?: number;
  }>(),
  { nested: false },
);

const store = useStore();
const short = ref(props.text.length >= 300);
const addComment = ref(false);
const editComment = ref(false);

const auth = computed<boolean>(() => store.getters.isAuthenticated);
const isOwner = computed(() => auth.value && store.getters.user && props.nick === store.getters.user.username);

const displayed = computed(() => {
  if (short.value) {
    const cut = props.text.indexOf(' ', 300);
    return props.text.slice(0, cut === -1 ? 300 : cut) + '…';
  }
  return props.text;
});

function startReply() {
  addComment.value = true;
  editComment.value = false;
}

function startEdit() {
  editComment.value = true;
  addComment.value = false;
}

function deleteComment() {
  store.dispatch('deleteComment', props.commentId);
}
</script>

<style scoped>
.comment {
  display: flex;
  gap: 14px;
}

.comment__main {
  flex: 1;
  min-width: 0;
  display: grid;
  gap: 6px;
}

.comment__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 10px;
  font-size: 15px;
}

.comment__head time {
  color: var(--text-subtle);
  font-size: 13px;
}

.comment__text {
  color: var(--text);
  font-size: 15px;
  line-height: 1.65;
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.comment__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
}

.link-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 0;
  border: 0;
  background: none;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 600;
  transition: color var(--t-fast);
}

.link-btn:hover {
  color: var(--primary);
}

.link-btn--danger:hover {
  color: var(--danger);
}

.comment__reply {
  margin-top: 8px;
}

.comment__children {
  display: grid;
  gap: 20px;
  margin-top: 14px;
  padding-left: 18px;
  border-left: 2px solid var(--border);
}
</style>
