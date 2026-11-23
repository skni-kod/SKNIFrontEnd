<template>
  <section class="card panel-card">
    <header class="panel-card__head">
      <h2 class="panel-card__title">Użytkownicy <span class="muted">({{ users.length }})</span></h2>
      <TextField v-model="query" class="search" icon="magnify" placeholder="Szukaj po nazwie, loginie lub e-mailu" />
    </header>

    <LoadingState v-if="loading" />
    <div v-else-if="filtered.length" class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>Użytkownik</th>
            <th>E-mail</th>
            <th>Dołączył</th>
            <th>Rola</th>
            <th class="cell-actions"><span class="sr-only">Akcje</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filtered" :key="user.id">
            <td>
              <div class="who">
                <UserAvatar :first-name="user.first_name" :last-name="user.last_name" :username="user.username" :size="34" />
                <span>
                  <strong>{{ fullName(user) }}</strong>
                  <small>@{{ user.username }}</small>
                </span>
              </div>
            </td>
            <td class="email">{{ user.email || '–' }}</td>
            <td class="nowrap">{{ formatDate(user.date_joined, 'd.MM.yyyy') }}</td>
            <td>
              <span v-if="user.is_superuser" class="role role--super">Superadmin</span>
              <span v-else-if="user.is_admin_user" class="role role--admin">Admin</span>
              <span v-else class="role">Członek</span>
            </td>
            <td class="cell-actions">
              <div class="row-actions">
                <router-link
                  :to="{ name: 'userProfile', params: { id: user.profile } }"
                  class="btn btn--ghost btn--icon btn--sm"
                  aria-label="Profil"
                  title="Profil"
                >
                  <i class="mdi mdi-account-outline"></i>
                </router-link>
                <template v-if="user.id !== me.id">
                  <button
                    v-if="!user.is_superuser || me.is_superuser"
                    type="button"
                    class="btn btn--secondary btn--sm"
                    :disabled="busy === user.id"
                    @click="setRole(user, user.is_admin_user ? 'member' : 'admin')"
                  >
                    {{ user.is_admin_user ? 'Odbierz admina' : 'Nadaj admina' }}
                  </button>
                  <button
                    v-if="me.is_superuser"
                    type="button"
                    class="btn btn--ghost btn--sm"
                    :disabled="busy === user.id"
                    @click="setRole(user, user.is_superuser ? 'admin' : 'super')"
                  >
                    {{ user.is_superuser ? 'Odbierz superadmina' : 'Superadmin' }}
                  </button>
                  <button
                    type="button"
                    class="btn btn--danger-ghost btn--icon btn--sm"
                    aria-label="Usuń konto"
                    title="Usuń konto"
                    @click="toDelete = user"
                  >
                    <i class="mdi mdi-trash-can-outline"></i>
                  </button>
                </template>
                <span v-else class="muted you">To Ty</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="panel-card__body">
      <EmptyState icon="account-search-outline" title="Brak wyników" />
    </div>

    <ConfirmationDialog
      v-if="toDelete"
      :text="`Czy na pewno chcesz usunąć konto ${toDelete.username}? Tej operacji nie można cofnąć.`"
      @yes="remove(toDelete)"
      @no="toDelete = null"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { UsersService } from '@/services/UsersService';
import TextField from '@/components/ui/TextField.vue';
import LoadingState from '@/components/ui/LoadingState.vue';
import EmptyState from '@/components/ui/EmptyState.vue';
import UserAvatar from '@/components/ui/UserAvatar.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import { formatDate } from '@/utils/date';

const ROLE_PAYLOAD = {
  member: { is_staff: false, is_superuser: false },
  admin: { is_staff: true, is_superuser: false },
  super: { is_staff: true, is_superuser: true },
};

const store = useStore();
const service = new UsersService();
const users = ref<any[]>([]);
const loading = ref(true);
const query = ref('');
const busy = ref<number | null>(null);
const toDelete = ref<any>(null);
const me = computed(() => store.getters.user || {});

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) {
    return users.value;
  }
  return users.value.filter((u) =>
    [u.username, u.email, u.first_name, u.last_name].some((v) => (v || '').toLowerCase().includes(q)),
  );
});

function fullName(user: any) {
  return [user.first_name, user.last_name].filter(Boolean).join(' ') || user.username;
}

async function load() {
  try {
    users.value = await service.getAll();
  } catch {
    store.dispatch('errorMessage', 'Nie udało się pobrać listy użytkowników!');
  } finally {
    loading.value = false;
  }
}

async function setRole(user: any, role: keyof typeof ROLE_PAYLOAD) {
  busy.value = user.id;
  try {
    const result = await service.update(user.id, ROLE_PAYLOAD[role]);
    user.is_admin_user = result.is_staff;
    user.is_superuser = result.is_superuser;
    store.dispatch('successMessage', `Zmieniono rolę użytkownika ${user.username}`);
  } catch {
    store.dispatch('errorMessage', 'Nie udało się zmienić roli!');
  } finally {
    busy.value = null;
  }
}

async function remove(user: any) {
  toDelete.value = null;
  try {
    await service.remove(user.id);
    users.value = users.value.filter((u) => u.id !== user.id);
    store.dispatch('successMessage', `Usunięto konto ${user.username}`);
  } catch {
    store.dispatch('errorMessage', 'Nie udało się usunąć konta!');
  }
}

onMounted(load);
</script>

<style scoped>
.search {
  width: min(320px, 100%);
}

.who {
  display: flex;
  align-items: center;
  gap: 12px;
}

.who span {
  display: grid;
  line-height: 1.3;
}

.who small {
  color: var(--text-subtle);
  font-size: 12px;
}

.email {
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text-muted);
}

.nowrap {
  white-space: nowrap;
  color: var(--text-muted);
}

.role {
  display: inline-block;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  background: var(--surface-2);
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.role--admin {
  background: var(--primary-soft);
  color: var(--primary-strong);
}

.role--super {
  background: var(--navy-900);
  color: #fff;
}

.row-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
}

.you {
  padding: 0 8px;
  font-size: 13px;
}
</style>
