<template>
  <v-row align="center" style="height: 100%">
    <v-col cols="12">
      <v-img
        width="1000px"
        class="mx-auto"
        :src="
          errorNum === 403
            ? require('../assets/lama_403.png')
            : require('../assets/lama_404.png')
        "
      ></v-img>
      <p class="text-h2 text-center font-weight-bold">
        {{ errorNum === 403 ? 'Brak dostępu!' : 'Strona nie istnieje!' }}
      </p>
      <v-row align="center" justify="space-around" class="my-5">
        <v-btn-cap class="primary my-2" router :to="{ name: 'home' }">
          <v-icon left>mdi-home</v-icon>
          <span>Powrót na stronę główną</span>
        </v-btn-cap>
        <v-btn-cap
          v-if="$router.history.length > 0"
          class="primary my-2"
          @click="$router.go(-1)"
        >
          <v-icon left>mdi-keyboard-return</v-icon>
          <span>Powrót na poprzednią stronę</span>
        </v-btn-cap>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ErrorPage extends Vue {
  get errorNum() {
    if (this.$route.name === 'error403') {
      return 403;
    } else {
      return 404;
    }
  }
}
</script>
