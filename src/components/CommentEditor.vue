<template>
  <form class="comment-editor" @submit.prevent="submit">
    <label :for="id" class="sr-only">Treść komentarza</label>
    <textarea
      :id="id"
      ref="textarea"
      v-model="comment"
      class="input"
      rows="3"
      :placeholder="placeholder"
    ></textarea>
    <div class="comment-editor__actions">
      <button type="button" class="btn btn--ghost btn--sm" @click="close">Anuluj</button>
      <button type="submit" class="btn btn--sm" :disabled="!comment.trim().length">
        <i class="mdi mdi-send-outline" aria-hidden="true"></i>
        {{ addText }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref, useId } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const props = withDefaults(
  defineProps<{ addText?: string; editText?: string; id?: number; mode?: 'add' | 'edit'; placeholder?: string }>(),
  { addText: 'Dodaj komentarz', editText: '', mode: 'add', placeholder: 'Napisz komentarz…' },
);
const emit = defineEmits<{ close: [] }>();

const store = useStore();
const route = useRoute();
const id = useId();
const textarea = ref<HTMLTextAreaElement>();
const comment = ref(props.editText);
const author = store.getters.user && store.getters.user.id;

function close() {
  emit('close');
}

function submit() {
  if (props.mode === 'edit') {
    store.dispatch('editComment', {
      body: { text: comment.value, user: store.getters.user.id },
      id: props.id,
    });
  } else if (props.id !== undefined) {
    store.dispatch('addComment', { text: comment.value, user: author, parent: props.id });
  } else {
    store.dispatch('addComment', { text: comment.value, user: author, article: route.params.id });
  }
  comment.value = '';
  emit('close');
}

onMounted(() => textarea.value?.focus());
</script>

<style scoped>
.comment-editor {
  display: grid;
  gap: 10px;
}

.comment-editor__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
