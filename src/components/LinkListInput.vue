<template>
  <v-card>
    <v-card-title class="primary text-body-1 white--text justify-center pa-1"
      >Dodaj linki do projektu</v-card-title
    >
    <v-divider />
    <v-card-text v-if="list && list.length > 0" class="pt-2 pb-0">
      <div v-for="(item, i) in list" :key="i">
        <v-divider />
        <v-row align="center">
          <v-col class="py-0">
            <v-text-field
              clearable
              v-model="item.text"
              :rules="[required, isValidLink]"
              :label="'Link ' + (i + 1)"
            ></v-text-field>
          </v-col>
          <v-col cols="auto" class="py-0 px-1">
            <v-btn-cap color="error" @click="removeListElement(i)">
              <v-icon left>mdi-delete</v-icon>
              <span>Usuń</span>
            </v-btn-cap>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="auto" class="py-0 pr-0">
            <p class="px-1 my-auto">Typ linku</p>
          </v-col>
          <v-col class="py-0">
            <v-select
              dense
              v-model="item.type"
              :items="types"
              item-text="text"
              item-value="text"
              :rules="[required]"
            >
              <template v-slot:item="data">
                <v-list-item-icon>
                  <v-icon>{{ data.item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ data.item.text }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-select>
          </v-col>
        </v-row>
        <v-divider />
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn-cap block color="primary" @click="addListElement">
        <v-icon left>mdi-link-variant-plus</v-icon>
        <span>Dodaj link</span>
      </v-btn-cap>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LinkListInput extends Vue {
  @Prop({ required: true }) public readonly value!: any[];

  get list() {
    return this.value;
  }

  set list(data: object[]) {
    this.$emit('input', data);
  }

  private addListElement() {
    this.list.push({});
  }

  private removeListElement(i: number) {
    this.list.splice(i, 1);
  }

  private data() {
    return {
      types: [
        {
          text: 'Github',
          icon: 'mdi-github',
        },
        {
          text: 'Gitlab',
          icon: 'mdi-gitlab',
        },
        {
          text: 'Bitbucket',
          icon: 'mdi-bitbucket',
        },
        {
          text: 'Blog',
          icon: 'mdi-post',
        },
        {
          text: 'Portfolio',
          icon: 'mdi-folder-multiple',
        },
        {
          text: 'Inne',
          icon: 'mdi-link',
        },
      ],
      required: (value: string) => !!value || 'Pole wymagane',
      isValidLink: (value: string) => {
        // https://gist.github.com/dperini/729294
        const pattern = new RegExp(
          '^' +
            '(?:(?:(?:https?|ftp):)?\\/\\/)' +
            '(?:\\S+(?::\\S*)?@)?' +
            '(?:' +
            '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
            '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
            '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
            '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
            '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
            '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
            '|' +
            '(?:' +
            '(?:' +
            '[a-z0-9\\u00a1-\\uffff]' +
            '[a-z0-9\\u00a1-\\uffff_-]{0,62}' +
            ')?' +
            '[a-z0-9\\u00a1-\\uffff]\\.' +
            ')+' +
            '(?:[a-z\\u00a1-\\uffff]{2,}\\.?)' +
            ')' +
            '(?::\\d{2,5})?' +
            '(?:[/?#]\\S*)?' +
            '$',
          'i',
        );
        return pattern.test(value) || 'Link nie jest poprawny';
      },
    };
  }
}
</script>