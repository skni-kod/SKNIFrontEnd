<template>
  <div>
    <v-expansion-panels dark class="my-2">
      <v-expansion-panel class="white--text info">
        <v-expansion-panel-header class="text-h5 font-weight-bold py-1"
          >Wyświetl ważne informacje dotyczące edytora</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <ul>
            <li class="text-h6">
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
            <li class="text-body-1">
              Przykładowy markdown, który obsługuje ten edytor, możesz znaleźć
              <b>
                <a
                  href="http://www.aqcoder.com/markdown"
                  style="color: inherit"
                  target="_blank"
                  >tutaj</a
                > </b
              >.
            </li>
            <li>
              Edytor obsługuje składnię html, ale jest ona aktywna
              <b>tylko</b> w widoku pojedyncaego artykułu, projektu lub sekcji.
            </li>
            <li>
              Jeżeli tekst zawiera obrazki, podglad należy odświeżać ręcznie
              przyciskiem powyżej podglądu.
            </li>
            <li>
              Do
              <b>każdego</b> listingu należy dodać nazwę języka jaki został w
              nim użyty np. ```c++ - W przeciwnym razie cały markdown nie
              zostanie wyświetlony i będzie error na konsoli.
            </li>
            <li>
              <b
                >Podczas edycji artykułu oraz projektu, należy do tekstu dodać
                znacznik ---readmore---</b
              >, aby podgląd artykułu lub projektu na liście nie był zbyt długi.
              Można stosować składnię języka markdown przed tym znacznikiem.
              Podczas wyświetlania listy artykułów / projektów skladnia ta
              zostanie usunięta.
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
        <v-btn-cap
          block
          class="primary mb-2"
          @click="textUpdated(markdown, '', true)"
          v-if="enableHotReload"
        >
          <span>Przeładuj podgląd</span>
          <v-icon right>mdi-reload</v-icon>
        </v-btn-cap>
        <v-card outlined>
          <v-card-title
            class="primary text-h6 white--text justify-center font-weight-bold py-1"
            >Podgląd</v-card-title
          >
          <markdown-it-vue
            class="md-body text-left mx-2"
            :content="
              preview || '## <center>Nie wprowadzono żadnego tekstu!</cewnter>'
            "
            :options="markdownOptions"
          />
          
        </v-card>
      </v-col>
      <v-col class="py-1">
        <img-adder></img-adder>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import ImgAdder from './MdImgAdd.vue';

@Component({
  components: {
    ImgAdder,
  }
})
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

  private containImg(text: string) {
    const regex = /!\[[^\]]*\]\([^)]+\)/i;
    return regex.test(text);
  }

  get enableHotReload() {
    return this.containImg(this.markdown);
  }

  @Watch('value')
  private textUpdated(newVal: string, oldVal: string, upd: boolean = false) {
    if (!this.enableHotReload || upd) {
      this.$data.preview = newVal;
    }
  }

  private data() {
    return {
      preview: undefined,
      reload: false,
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