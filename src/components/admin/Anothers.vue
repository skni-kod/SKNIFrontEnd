<template>
  <div class="actions">
    <router-link v-for="action in actions" :key="action.label" :to="action.to" class="action card">
      <span class="action__icon" aria-hidden="true"><i class="mdi" :class="action.icon"></i></span>
      <span class="action__text">
        <strong>{{ action.label }}</strong>
        <span class="muted">{{ action.hint }}</span>
      </span>
      <i class="mdi mdi-plus action__plus" aria-hidden="true"></i>
    </router-link>
  </div>
</template>

<script setup lang="ts">
const actions = [
  { label: 'Dodaj artykuł', hint: 'Artykuł lub aktualność', icon: 'mdi-text-box-plus-outline', to: { name: 'articleAdd' } },
  { label: 'Dodaj projekt', hint: 'Nowy projekt sekcji', icon: 'mdi-folder-plus-outline', to: { name: 'projectAdd' } },
  { label: 'Dodaj sekcję', hint: 'Nowa sekcja koła', icon: 'mdi-shape-plus-outline', to: { name: 'sectionAdd' } },
  { label: 'Dodaj sprzęt', hint: 'Pozycja w magazynie', icon: 'mdi-chip', to: { name: 'hardwareAdd' } },
];
</script>

<style scoped>
.actions {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.action {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  color: var(--text);
  transition: border-color var(--t-fast), box-shadow var(--t-fast);
}

.action:hover {
  border-color: var(--primary-soft-2);
  box-shadow: var(--shadow-sm);
}

.action__icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  background: var(--primary-soft);
  color: var(--primary);
  font-size: 22px;
}

.action__text {
  display: grid;
  flex: 1;
  font-size: 14px;
}

.action__text strong {
  font-size: 15px;
}

.action__plus {
  font-size: 20px;
  color: var(--text-subtle);
}
</style>
