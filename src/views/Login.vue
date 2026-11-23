<template>
  <AuthLayout title="Zaloguj się" subtitle="Witaj ponownie w SKNI KOD" icon="login-variant">
    <form class="form" novalidate @submit.prevent="loginUser">
      <TextField
        v-model="login"
        label="Login"
        icon="account-outline"
        autocomplete="username"
        autofocus
        :error="errors.login"
        :show-error="submitted"
      />
      <TextField
        v-model="password"
        label="Hasło"
        type="password"
        icon="lock-outline"
        autocomplete="current-password"
        :error="errors.password"
        :show-error="submitted"
      />
      <button type="submit" class="btn btn--lg btn--block">Zaloguj się</button>
    </form>
    <template v-if="registrationOpen" #footer>
      Nie masz konta? <router-link :to="{ name: 'register' }">Zarejestruj się</router-link>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import AuthLayout from '@/components/AuthLayout.vue';
import TextField from '@/components/ui/TextField.vue';
import { isValid, minLength, required, validate } from '@/utils/validation';
import { useSiteSettings } from '@/composables/useSiteSettings';

const store = useStore();
const { settings } = useSiteSettings();
const registrationOpen = computed(() => !settings.value || settings.value.registration_open);
const login = ref('');
const password = ref('');
const submitted = ref(false);

const errors = computed(() => ({
  login: validate(login.value, [required, minLength(3)]),
  password: validate(password.value, [required, minLength(8)]),
}));

function loginUser() {
  submitted.value = true;
  if (isValid(errors.value)) {
    store.dispatch('login', { login: login.value, password: password.value });
  }
}
</script>
