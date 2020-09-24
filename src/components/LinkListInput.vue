<template>
  <v-card>
    <v-card-title class="primary text-body-1 white--text justify-center pa-1"
      >Dodaj linki do projektu</v-card-title
    >
    <v-divider />
    <v-card-text v-if="list.length > 0" class="pt-2 pb-0">
      <div v-for="(item, i) in list" :key="i">
        <v-divider />
        <v-row align="center">
          <v-col class="py-0">
            <v-text-field
              clearable
              :rules="[required]"
              :label="'Link ' + (i + 1)"
              v-model="item.text"
            ></v-text-field>
          </v-col>
          <v-col cols="auto" class="py-0 px-1">
            <v-btn color="error" @click="list.splice(i, 1)">
              <v-icon left>mdi-delete</v-icon>
              <span>Usuń</span>
            </v-btn>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="auto" class="py-0 pr-0">
            <p class="px-1 my-auto">Typ linku</p>
          </v-col>
          <v-col class="py-0">
            <v-select
              v-model="item.type"
              :items="types"
              item-text="text"
              item-value="id"
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
      <v-btn block color="primary" @click="list.push({ text: '', type: undefined })">
        <v-icon left>mdi-link-variant-plus</v-icon>
        <span>Dodaj link</span>
      </v-btn>
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

  private data() {
    return {
      types: [
        {
          id: 1,
          text: 'Github',
          icon: 'mdi-github',
        },
        {
          id: 2,
          text: 'Gitlab',
          icon: 'mdi-gitlab',
        },
        {
          id: 3,
          text: 'Bitbucket',
          icon: 'mdi-bitbucket',
        },
        {
          id: 4,
          text: 'Blog',
          icon: 'mdi-post',
        },
        {
          id: 5,
          text: 'Portfolio',
          icon: 'mdi-folder-multiple',
        },
        {
          id: 6,
          text: 'Inne',
          icon: 'mdi-link',
        },
      ],
      required: (value: string) => !!value || 'Pole wymagane',
    };
  }
}
</script>