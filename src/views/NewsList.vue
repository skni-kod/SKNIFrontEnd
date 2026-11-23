<template>
  <div>
    <PageHeader
      eyebrow="Co słychać w SKNI KOD?"
      title="Aktualności"
      description="Ogłoszenia, relacje z wydarzeń i bieżące informacje z życia koła."
    >
      <template v-if="isAdmin" #actions>
        <router-link :to="{ name: 'articleAdd' }" class="btn">
          <i class="mdi mdi-plus" aria-hidden="true"></i> Dodaj wpis
        </router-link>
      </template>
    </PageHeader>
    <div class="page">
      <div class="container">
        <EntriesList group="News" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import PageHeader from '@/components/ui/PageHeader.vue';
import EntriesList from '@/components/EntriesList.vue';

const store = useStore();
const isAdmin = computed<boolean>(() => !!store.getters.isAdministrator);
</script>
