<template>
  <div>
    <PageHeader
      eyebrow="Mój panel"
      title="Opis profilu"
      description="Opis jest widoczny publicznie na Twoim profilu."
      :back="{ to: { name: 'userPanel' }, label: 'Mój panel' }"
    />
    <div class="page page--editor">
      <div class="container editor editor--single">
        <div class="editor__main">
          <FormCard>
            <MarkdownEditor v-model="text" label="Opis profilu" :with-images="false" />
          </FormCard>
        </div>
      </div>
    </div>
    <EditorActions
      text="Czy na pewno chcesz wyjść bez zapisywania zmian w opisie profilu?"
      save-text="Zapisz zmiany"
      discard-text="Anuluj"
      @save-changes="editDescription"
      @discard-changes="router.push({ name: 'userPanel' })"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import beAxios from '@/axios';
import PageHeader from '@/components/ui/PageHeader.vue';
import FormCard from '@/components/editor/FormCard.vue';
import MarkdownEditor from '@/components/editor/MarkdownEditor.vue';
import EditorActions from '@/components/editor/EditorActions.vue';

const store = useStore();
const router = useRouter();
const profile = computed(() => store.getters.profile);
const text = ref<string>((profile.value && profile.value.description) || '');

function editDescription() {
  beAxios
    .patch(
      'api/profiles/' + profile.value.id + '/',
      { description: text.value },
      { headers: { Authorization: 'Bearer ' + store.getters.token } },
    )
    .then(() => {
      store.dispatch('fetchUserProfile');
      store.dispatch('successMessage', 'Opis profilu został zaktualizowany');
      router.push({ name: 'userPanel' });
    })
    .catch(() => {
      store.dispatch('errorMessage', 'Błąd przy aktualizacji profilu!');
    });
}
</script>
