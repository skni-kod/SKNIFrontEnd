<template>
  <div class="editor-actions">
    <div class="container editor-actions__inner">
      <span class="editor-actions__hint">
        <i class="mdi mdi-content-save-alert-outline" aria-hidden="true"></i>
        Pamiętaj o zapisaniu zmian przed opuszczeniem strony.
      </span>
      <div class="editor-actions__buttons">
        <button type="button" class="btn btn--secondary" @click="dialog = true">{{ discardText }}</button>
        <button type="button" class="btn" :disabled="saving" @click="$emit('saveChanges')">
          <i class="mdi mdi-content-save-outline" aria-hidden="true"></i>
          {{ saveText }}
        </button>
      </div>
    </div>
    <ConfirmationDialog
      v-if="dialog"
      title="Odrzucić zmiany?"
      :text="text"
      confirm-text="Odrzuć"
      @yes="discard"
      @no="dialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';

withDefaults(defineProps<{ text: string; saveText?: string; discardText?: string; saving?: boolean }>(), {
  saveText: 'Zapisz zmiany',
  discardText: 'Odrzuć zmiany',
});
const emit = defineEmits<{ saveChanges: []; discardChanges: [] }>();
const dialog = ref(false);

function discard() {
  dialog.value = false;
  emit('discardChanges');
}
</script>

<style scoped>
.editor-actions {
  position: sticky;
  bottom: 0;
  z-index: 50;
  margin-top: 32px;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--border);
  box-shadow: 0 -10px 30px -20px rgba(15, 23, 42, 0.35);
}

.editor-actions__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-block: 14px;
}

.editor-actions__hint {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 14px;
}

.editor-actions__hint .mdi {
  font-size: 18px;
  color: var(--text-subtle);
}

.editor-actions__buttons {
  display: flex;
  gap: 10px;
  margin-left: auto;
}

@media (max-width: 640px) {
  .editor-actions__hint {
    display: none;
  }

  .editor-actions__buttons {
    width: 100%;
  }

  .editor-actions__buttons .btn {
    flex: 1;
  }
}
</style>
