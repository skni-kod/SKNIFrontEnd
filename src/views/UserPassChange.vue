<template>
  <AuthLayout title="Zmiana hasła" subtitle="Po zmianie hasła zalogujesz się ponownie" icon="lock-reset">
    <form class="form" novalidate @submit.prevent="changePasswd">
      <TextField
        v-model="password1"
        label="Nowe hasło"
        type="password"
        autocomplete="new-password"
        :error="errors.password1"
        :show-error="submitted"
        @focus="passwdFocus = true"
      />
      <TextField
        v-model="password2"
        label="Powtórz nowe hasło"
        type="password"
        autocomplete="new-password"
        :error="errors.password2"
        :show-error="submitted"
      />
      <PasswordValidator v-if="passwdFocus || password1" :password="password1" @validation="passwdValid = $event" />
      <div class="actions">
        <router-link :to="{ name: 'userPanel' }" class="btn btn--secondary">Anuluj</router-link>
        <button type="submit" class="btn">Zmień hasło</button>
      </div>
    </form>
  </AuthLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import AuthLayout from '@/components/AuthLayout.vue';
import TextField from '@/components/ui/TextField.vue';
import PasswordValidator from '@/components/PasswordValidator.vue';
import { isValid, required, sameAs, validate } from '@/utils/validation';

const store = useStore();
const password1 = ref('');
const password2 = ref('');
const passwdFocus = ref(false);
const passwdValid = ref<true | string>('Hasło nie spełnia wymagań');
const submitted = ref(false);

const errors = computed(() => ({
  password1: validate(password1.value, [required, () => passwdValid.value]),
  password2: validate(password2.value, [required, sameAs(() => password1.value)]),
}));

function changePasswd() {
  submitted.value = true;
  if (isValid(errors.value)) {
    store.dispatch('changeUserPassword', { password1: password1.value, password2: password2.value });
  }
}
</script>

<style scoped>
.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
</style>
