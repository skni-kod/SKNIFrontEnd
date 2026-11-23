<template>
  <AuthLayout title="Załóż konto" subtitle="Dołącz do społeczności SKNI KOD" icon="account-plus-outline">
    <div v-if="!registrationOpen" class="closed">
      <div class="alert">
        <i class="mdi mdi-lock-outline" aria-hidden="true"></i>
        <span>Rejestracja nowych kont jest obecnie wyłączona. Jeśli chcesz dołączyć do koła, napisz do nas na Facebooku.</span>
      </div>
      <a href="https://www.facebook.com/skni.kod" target="_blank" rel="noopener" class="btn btn--block">
        <i class="mdi mdi-facebook" aria-hidden="true"></i> Napisz do nas
      </a>
    </div>
    <form v-else class="form form-wide" novalidate @submit.prevent="registerUser">
      <TextField
        v-model="email"
        label="E-mail"
        type="email"
        icon="email-outline"
        autocomplete="email"
        required
        :error="errors.email"
        :show-error="submitted"
      />
      <TextField
        v-model="login"
        label="Login"
        icon="account-outline"
        autocomplete="username"
        required
        :error="errors.login"
        :show-error="submitted"
      />
      <div class="form-row">
        <TextField
          v-model="firstName"
          label="Imię"
          autocomplete="given-name"
          required
          :error="errors.firstName"
          :show-error="submitted"
        />
        <TextField
          v-model="lastName"
          label="Nazwisko"
          autocomplete="family-name"
          required
          :error="errors.lastName"
          :show-error="submitted"
        />
      </div>
      <div class="form-row">
        <TextField
          v-model="password1"
          label="Hasło"
          type="password"
          autocomplete="new-password"
          required
          :error="errors.password1"
          :show-error="submitted"
          @focus="passwdFocus = true"
        />
        <TextField
          v-model="password2"
          label="Powtórz hasło"
          type="password"
          autocomplete="new-password"
          required
          :error="errors.password2"
          :show-error="submitted"
        />
      </div>
      <PasswordValidator v-if="passwdFocus || password1" :password="password1" @validation="passwdValid = $event" />
      <button type="submit" class="btn btn--lg btn--block">Zarejestruj się</button>
    </form>
    <template #footer>
      Masz już konto? <router-link :to="{ name: 'login' }">Zaloguj się</router-link>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import AuthLayout from '@/components/AuthLayout.vue';
import TextField from '@/components/ui/TextField.vue';
import PasswordValidator from '@/components/PasswordValidator.vue';
import { useSiteSettings } from '@/composables/useSiteSettings';
import { email as emailRule, isValid, minLength, required, sameAs, validate } from '@/utils/validation';

const store = useStore();
const { settings } = useSiteSettings();
const registrationOpen = computed(() => !settings.value || settings.value.registration_open);
const email = ref('');
const login = ref('');
const firstName = ref('');
const lastName = ref('');
const password1 = ref('');
const password2 = ref('');
const passwdFocus = ref(false);
const passwdValid = ref<true | string>('Hasło nie spełnia wymagań');
const submitted = ref(false);

const errors = computed(() => ({
  email: validate(email.value, [required, emailRule]),
  login: validate(login.value, [required, minLength(3)]),
  firstName: validate(firstName.value, [required]),
  lastName: validate(lastName.value, [required]),
  password1: validate(password1.value, [required, () => passwdValid.value]),
  password2: validate(password2.value, [required, sameAs(() => password1.value)]),
}));

function registerUser() {
  submitted.value = true;
  if (isValid(errors.value)) {
    store.dispatch('register', {
      username: login.value,
      email: email.value,
      password1: password1.value,
      password2: password2.value,
      first_name: firstName.value,
      last_name: lastName.value,
    });
  }
}
</script>

<style scoped>
.closed {
  display: grid;
  gap: 16px;
}
</style>
