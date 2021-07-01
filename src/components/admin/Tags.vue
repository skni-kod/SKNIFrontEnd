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
            <tags-list
              :list="tags"
              @remove="deleteTag($event)"
              >Test</tags-list
            >
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
        this.$store.dispatch('setSnackbarState', {
          state: true,
          msg: 'Błąd przy pobieraniu tagów!',
          color: 'error',
          timeout: 7500,
        });
      });
  }

  private addTag(name: string) {
    this.tagService
      .addTag(name)
      .then(() => {
        this.getTags();
        this.$store.dispatch('setSnackbarState', {
          state: true,
          msg: 'Tag został dodany',
          color: 'success',
          timeout: 5000,
        });
      })
      .catch(() => {
        this.$store.dispatch('setSnackbarState', {
          state: true,
          msg: 'Błąd przy dodawaniu tagu!',
          color: 'error',
          timeout: 7500,
        });
      });
    this.$data.newTagName = '';
    this.$data.addNew = false;
  }

  private deleteTag(id: number) {
    this.tagService
      .deleteTag(id)
      .then(() => {
        this.getTags();
        this.$store.dispatch('setSnackbarState', {
          state: true,
          msg: 'Tag został usunięty',
          color: 'success',
          timeout: 5000,
        });
      })
      .catch(() => {
        this.$store.dispatch('setSnackbarState', {
          state: true,
          msg: 'Błąd przy usuwaniu tagu!',
          color: 'error',
          timeout: 7500,
        });
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