<template>
  <div v-if="article != undefined" class="mt-4">
    <v-card>
      <v-card-title
        class="text-h4 primary--text font-weight-bold justify-center"
        style="word-break: break-word;"
      >{{ article.title }}</v-card-title>
      <v-divider />
      <v-card-subtitle class="grey lighten-3">
        <v-row class="text-subtitle-1 mx-auto">
          <v-icon left color="primary">mdi-calendar-today</v-icon>
          <p class="my-auto">{{article.creation_date | moment('DD-MM-YYYY')}}</p>
          <v-spacer />
          <v-icon left color="primary">mdi-account</v-icon>
          <p class="my-auto">{{article.creator.user.username}}</p>
          <v-spacer v-if="article.tags.length > 0" />
          <div v-if="article.tags.length > 0">
            <v-icon left color="primary">mdi-note</v-icon>
            <v-chip small label v-for="tag in article.tags" :key="tag.name" class="grey mx-1">
              <a
                :href="'/#/tag/'+ tag.name"
                class="white--text text-decoration-none"
              >{{ '#' + tag.name }}</a>
            </v-chip>
          </div>
        </v-row>
        <v-divider v-if="article.authors.length" class="ma-2"></v-divider>
        <v-row
          wrap
          v-if="article.authors.length"
          align="center"
          justify="start"
          class="text-subtitle-1 mx-auto mt-2"
        >
          <v-col cols="auto" class="pa-0">
            <p class="my-auto">Współautorzy:</p>
          </v-col>
          <v-col class="py-0 pr-0">
            <v-row align="center" justify="center">
              <div v-for="(author, i) in article.authors" :key="i" class="mx-2">
                <v-icon left color="primary">mdi-account</v-icon>
                <v-chip small label class="white--text grey">{{ author.user.username }}</v-chip>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-divider />
      <v-card-text>
        <markdown-it-vue
          class="md-body text-left"
          :content="article.text"
          :options="markdownOptions"
        />
      </v-card-text>
      <v-btn
        fab
        fixed
        bottom
        right
        color="orange"
        v-if="auth"
        :to="'/editarticle/'+ $route.params.id"
      >
        <v-icon large>mdi-pen</v-icon>
      </v-btn>
    </v-card>
    <gallery breakpoints="xs6" :imgs="article.gallery" />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ArticleModel } from '@/models/ArticleModel';
import { CommentModel } from '@/models/CommentModel';

@Component
export default class SingleArticle extends Vue {
  @Prop() public article!: ArticleModel;
  @Prop() public comments!: CommentModel[];
  public data() {
    return {
      galleryIndex: null,
      gallery: [],
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

  public methods() {
    return {
      getImageUrls: this.getImageUrls,
    };
  }

  public getImageUrls() {
    const imageUrls: string[] = [];
    for (const galleryItem of this.article.gallery) {
      imageUrls.push(galleryItem.image);
    }
    return imageUrls;
  }

  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }
}
</script>
