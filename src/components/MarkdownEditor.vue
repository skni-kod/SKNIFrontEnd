<template>
  <div>
    <v-expansion-panels dark class="my-2">
      <v-expansion-panel class="white--text info">
        <v-expansion-panel-header class="text-h6 font-weight-bold"
          >Wyświetl ważne informacje dotyczące edytora</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <ul>
            <li class="text-body-1">
              Poniższy edytor tekstu obsługuje język znaczników Markdown. Jego
              podstawy możesz sprawdzić
              <b>
                <a
                  href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
                  style="color: inherit"
                  target="_blank"
                  >tutaj</a
                > </b
              >.
            </li>
            <li>
              Edytor obsługuje składnię html, ale nie jest ona aktywna w widoku
              listy artykułów / projektów.
            </li>
            <li>
              Do
              <b>każdego</b> listingu należy dodać nazwę języka jaki został w
              nim użyty np. ```c++ - W przeciwnym razie cały markdown nie
              zostanie wyświetlony i będzie error na konsoli.
            </li>
            <li>
              Podczas edycji artykułu oraz projektu, należy do tekstu dodać
              znacznik ---readmore---, aby podgląd artykułu na liście artykułów
              nie był zbyt długi. Można stosować składnię języka markdown przed
              znacznikiem ---readmore---. Na liście artykułów / projektów
              skladnia ta zostanie usunięta.
            </li>
          </ul>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-row no-gutters>
      <v-col cols="12" md="6" class="pa-1">
        <v-textarea
          auto-grow
          v-model="markdown"
          outlined
          :label="label"
          :hide-details="!rules"
          :rules="rules ? [required] : []"
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="6" class="pa-1">
        <v-card outlined>
          <v-card-title
            class="primary text-h4 white--text font-weight-bold justify-center py-0"
            >PODGLĄD</v-card-title
          >
          <markdown-it-vue
            class="md-body text-left mx-2"
            :content="
              markdown || '## <center>Nie wprowadzono żadnego tekstu!</cewnter>'
            "
            :options="markdownOptions"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MarkdownEditor extends Vue {
  @Prop() public readonly value!: string;
  @Prop() public readonly label!: string;
  @Prop({ default: false }) public readonly rules!: any;

  get markdown() {
    return this.value;
  }

  set markdown(text: string) {
    this.$emit('input', text);
  }

  private data() {
    return {
      required: (value: string) => !!value || 'Pole wymagane',
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