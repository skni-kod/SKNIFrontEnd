<template>
  <BaseDialog :title="title" :max-width="maxwidth" @close="$emit('no')">
    <p>{{ text }}</p>
    <template #actions>
      <button type="button" class="btn btn--secondary" @click="$emit('no')">Anuluj</button>
      <button type="button" class="btn" :class="danger ? 'btn--danger' : ''" @click="$emit('yes')">
        {{ confirmText }}
      </button>
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import BaseDialog from '@/components/ui/BaseDialog.vue';

withDefaults(
  defineProps<{ title?: string; text: string; maxwidth?: number; confirmText?: string; danger?: boolean }>(),
  { title: 'Potwierdzenie', maxwidth: 440, confirmText: 'Tak, usuń', danger: true },
);
defineEmits<{ yes: []; no: [] }>();
</script>
