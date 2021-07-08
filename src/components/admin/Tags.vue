<template>
  <div>
    <v-row align="center" class="fill-height">
      <v-col>
        <new-tag v-if="addNew" v-model="addNew" @add="addTag($event)"></new-tag>
        <v-row
          no-gutters
          align="center"
          justify="center"
          class="ma-2 fill-height"
        >
          <v-col lg="9">
            <tags-list :list="tags" @remove="deleteTag($event)">Test</tags-list>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-btn fab fixed bottom right class="success" @click="addNew = true">
      <v-icon large>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import TagsList from './TagsList.vue';
import { TagsService } from '@/services/TagsService';
import beAxios from '@/axios';

@Component({
  components: {
    TagsList,
    NewTag: () =>
      import(/* webpackChunkName: "ComponentNewTag" */ './AddTag.vue'),
  },
})
export default class AdminPanelTags extends Vue {
  private tagService!: TagsService;

  private beforeCreate() {
    this.tagService = new TagsService();
  }

  private created() {
    this.getTags();
  }

  private getTags() {
    this.tagService
      .getAllTags()
      .then((res) => {
        this.$data.tags = res.data;
      })
      .catch(() => {
        this.$store.dispatch('errorMessage', 'Błąd przy pobieraniu tagów!');
      });
  }

  private addTag(name: string) {
    this.tagService
      .addTag(name)
      .then(() => {
        this.getTags();
        this.$store.dispatch('successMessage', 'Tag został dodany');
      })
      .catch(() => {
        this.$store.dispatch('errorMessage', 'Błąd przy dodawaniu tagu!');
      });
    this.$data.newTagName = '';
    this.$data.addNew = false;
  }

  private deleteTag(id: number) {
    this.tagService
      .deleteTag(id)
      .then(() => {
        this.getTags();
        this.$store.dispatch('successMessage', 'Tag został usunięty');
      })
      .catch(() => {
        this.$store.dispatch('errorMessage', 'Błąd przy usuwaniu tagu!');
      });
  }

  private data() {
    return {
      addNew: false,
      tags: [],
    };
  }
}
</script>