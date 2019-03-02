<template>
  <div>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-data-table
          :headers="headers"
          :items="articles"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.id }}</td>
            <td class="text-xs-left"><a v-bind:href="'/#/panel/editarticle/'+ props.item.id">{{ props.item.title }}</a></td>
            <td class="text-xs-left">{{ props.item.creator.user.username }}</td>
            <td class="text-xs-left">{{ props.item.creation_date | moment("DD-MM-YYYY HH:mm:SS") }}</td>
            <td class="text-xs-left">{{ props.item.publication_date | moment("DD-MM-YYYY HH:mm:SS") }}</td>
            <td class="text-xs-left">{{ props.item.tags.map(p => '#' + p.tag.name).join(', ') }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ArticleModel } from "@/models/ArticleModel";
import { PaginationModel } from "@/models/PaginationModel";

@Component
export default class PanelArticlesList extends Vue {
  @Prop() articles!: ArticleModel[];
  
  public data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Tytuł', value: 'title' },
        { text: 'Autor', value: 'creator' },
        { text: 'Data utworzenia', value: 'creation_date' },
        { text: 'Data publikacji', value: 'publication_date' },
        { text: 'Tagi', value: 'tags' },
      ]
    }
  }
}
</script>