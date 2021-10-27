<template>
  <div class="article-section">
    <div justify="center" v-if="article != undefined" class="mx-1">
      <SectionHeader
        :title="article.title"
        subtitle="artykuły SKNI"
      ></SectionHeader>
      <div class="article-actions">
        <div class="article-date">
          <v-icon left color="primary">mdi-calendar-today</v-icon>
          <p class="my-auto">
            {{ article.creation_date | moment('DD-MM-YYYY') }}
          </p>
        </div>

        <div cols="auto" class=" py-1">
          {{ article.tags.length === 1 ? 'Tag:' : 'Tagi:' }}
          <a
            :href="'/#/tag/' + tag.name"
            class="text-decoration-none"
            v-for="(tag, i) in article.tags"
            :key="i"
          >
            <v-hover v-slot:default="{ hover }">
              <v-chip
                class="tag"
                small
                label
                style="cursor: pointer"
                :color="hover ? 'grey' : 'primary'"
              >
                <v-icon small left>mdi-tag-outline</v-icon>
                {{ tag.name }}
              </v-chip>
            </v-hover>
          </a>
        </div>
        <div cols="auto" class=" py-1">
          {{ article.authors.length === 1 ? 'Autor:' : 'Autorzy:' }}
          <a
            :href="'/#/user/profile/' + author.id"
            class="text-decoration-none"
            v-for="(author, i) in article.authors"
            :key="i"
          >
            <v-hover v-slot:default="{ hover }">
              <v-chip
                class="tag"
                small
                label
                style="cursor: pointer"
                :color="hover ? 'grey' : 'primary'"
              >
                <div class="svg" v-html="user"></div>

                {{ author.first_name }} {{ author.last_name }}
              </v-chip>
            </v-hover>
          </a>
        </div>
      </div>

      <v-divider />
      <div class="article-text">
        <markdown-it-vue
          class="md-body text-left"
          :content="article.text"
          :options="markdownOptions"
        />
      </div>
      <gallery class="gallery" breakpoints="xs6" :imgs="article.gallery" />
      <comments-list class="comments" :comments="comments" />
    </div>
    <v-speed-dial fixed right bottom direction="top" v-model="fab" v-if="role">
      <template v-slot:activator>
        <v-btn-cap
          fab
          v-model="fab"
          class="text-body-1 font-weight-bold"
          color="primary"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn-cap>
      </template>
      <v-btn-cap
        fab
        color="orange"
        :to="{ name: 'articleEdit', params: { id: $route.params.id } }"
      >
        <v-icon>mdi-pen</v-icon>
      </v-btn-cap>
      <v-btn-cap fab color="error" @click="dialog = true">
        <v-icon>mdi-delete</v-icon>
      </v-btn-cap>
    </v-speed-dial>
    <confirmation-dialog
      v-if="dialog"
      @yes="deleteArticle($route.params.id)"
      @no="dialog = false"
      :text="dialogText"
    ></confirmation-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ArticlesService } from '@/services/ArticlesService';
import { ArticleModel } from '@/models/ArticleModel';
import SectionHeader from '../../components/NewDesign/SectionHeader.vue';
import Gallery from '../../components/NewDesign/Gallery.vue';
@Component({
  components: {
    SectionHeader,
    Gallery,
  },
})
export default class Article extends Vue {
  private articlesService!: ArticlesService;
  private article!: ArticleModel;

  private beforeCreate() {
    this.articlesService = new ArticlesService();
  }

  private mounted() {
    this.articlesService
      .getArticle(+this.$route.params.id)
      .then((article) => {
        this.article = article;
      })
      .catch(() => {
        this.$router.replace({ name: 'error404' });
      });

    this.$store.dispatch('getComments', this.$route.params.id);
  }

  private beforeDestroy() {
    this.$store.dispatch('purgeComments');
  }

  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  get role(): boolean {
    return this.$store.getters.isAdministrator;
  }

  get dialogText() {
    return 'Czy na pewno chcesz usunąć artykuł "' + this.article.title + '"?';
  }

  private deleteArticle(id: number) {
    this.articlesService
      .deleteArticle(id)
      .then((res) => {
        if (res.status === 204) {
          this.$store.dispatch('successMessage', 'Artykuł został usunięty');
          this.$router.replace({ name: 'articles', params: { page: '1' } });
        }
      })
      .catch(() => {
        this.$store.dispatch('errorMessage', 'Błąd poczas usuwania artykułu!');
      });
  }

  get comments() {
    return this.$store.getters.comments;
  }

  private data() {
    return {
      article: this.article,
      fab: false,
      dialog: false,
      user:
        '<svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.21 21v-2a4 4 0 00-4-4h-8a4 4 0 00-4 4v2M12.21 11a4 4 0 100-8 4 4 0 000 8z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
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

<style lang="scss" scoped>
@use '@/styles/helpers' as *;
@use '@/styles/components/buttons';

.article-section {
  margin-top: 50px;
  @include responsiveLayout();
  row-gap: 50px;
  width: 100%;

  .section-header {
    margin-bottom: 100px;
    text-align: center;
  }
  .article-actions {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .article-date {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .tag {
      transition: background-color 0.3s, border-color 0.3s;
      color: #fff;
      padding: 15px 20px;
    }
  }

  .article-text {
    margin: 50px 0;
  }
  .svg {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .gallery {
    margin: 50px 0;
  }

  .comments {
    margin: 50px 0;
  }

  @media only screen and (max-width: 768px) {
    .article-actions {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;
      & > div {
        margin-bottom: 15px;
      }
    }
  }
}
</style>
