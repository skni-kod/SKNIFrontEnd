<template>
  <div class="admin-actions">
    <router-link :to="editTo" class="btn btn--secondary btn--sm">
      <i class="mdi mdi-pencil-outline" aria-hidden="true"></i> Edytuj
    </router-link>
    <button type="button" class="btn btn--danger-ghost btn--sm" @click="dialog = true">
      <i class="mdi mdi-trash-can-outline" aria-hidden="true"></i> Usuń
    </button>
    <ConfirmationDialog v-if="dialog" :text="confirmText" @yes="confirm" @no="dialog = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';

defineProps<{ editTo: RouteLocationRaw; confirmText: string }>();
const emit = defineEmits<{ delete: [] }>();
const dialog = ref(false);

function confirm() {
  dialog.value = false;
  emit('delete');
}
</script>

<style scoped>
.admin-actions {
  display: flex;
  gap: 8px;
}
</style>
