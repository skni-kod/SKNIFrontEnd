<template>
  <div class="links">
    <div v-for="(item, i) in list" :key="i" class="links__row">
      <SelectField v-model="item.type" class="links__type" :options="typeOptions" placeholder="Typ" />
      <TextField
        v-model="item.text"
        class="links__url"
        icon="link-variant"
        placeholder="Adres URL"
        :error="validate(item.text, [required, validLink])"
      />
      <button type="button" class="btn btn--danger-ghost btn--icon" :aria-label="`Usuń link ${i + 1}`" @click="list.splice(i, 1)">
        <i class="mdi mdi-trash-can-outline"></i>
      </button>
    </div>
    <button type="button" class="btn btn--secondary btn--sm links__add" @click="list.push({})">
      <i class="mdi mdi-link-variant-plus" aria-hidden="true"></i> Dodaj link
    </button>
  </div>
</template>

<script setup lang="ts">
import TextField from '@/components/ui/TextField.vue';
import SelectField from '@/components/ui/SelectField.vue';
import { required, validLink, validate } from '@/utils/validation';

const list = defineModel<any[]>({ required: true });

const typeOptions = ['Github', 'Gitlab', 'Bitbucket', 'Blog', 'Portfolio', 'Inne'].map((t) => ({ value: t, label: t }));
</script>

<style scoped>
.links {
  display: grid;
  gap: 12px;
}

.links__row {
  display: grid;
  grid-template-columns: 160px 1fr auto;
  gap: 10px;
  align-items: start;
}

.links__add {
  justify-self: start;
}

@media (max-width: 560px) {
  .links__row {
    grid-template-columns: 1fr auto;
  }

  .links__url {
    grid-column: 1 / -1;
    grid-row: 2;
  }
}
</style>
