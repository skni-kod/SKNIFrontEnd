<template>
  <div>
    <v-alert dismissible type="info">
      <ul>
        <li>Tagi html są aktywne jedynie w widoku pojedynczego atykułu!</li>
        <li>
          Do
          <b>każdego</b> listingu należy dodać nazwę języka jaki został w nim użyty np. ```c++ - W przeciwnym razie cały markdown nie zostanie wyświetlony.
        </li>
      </ul>
    </v-alert>
    <v-layout wrap justify-space-between>
      <v-flex xs12 md6 class="text-xs-left pa-1">
        <v-textarea auto-grow v-model="value" @input="markdownEdited" outlined hide-details label="Tekst"></v-textarea>
      </v-flex>
      <v-flex xs12 md6 class="text-xs-left pa-1">
        <v-card outlined>
          <v-card-title
            class="primary text-h4 white--text font-weight-bold justify-center py-0"
          >PODGLĄD</v-card-title>
          <markdown-it-vue
            class="md-body text-left mx-2"
            :content="value"
            :options="markdownOptions"
          />
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MarkdownEditor extends Vue {
@Prop() public value!: string;

private markdownEdited(text: string) {
    this.$emit('input', text);
}

private data() {
    return {
        markdownOptions: {
        markdownIt: {
          html: true,
          linkify: true,
        },
        githubToc: {
          anchorLink: false,
        },
      },
    };
}

}
</script>