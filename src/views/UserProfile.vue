<template>
  <v-row align="center" class="fill-height ma-2">
    <v-col class="py-0">
      <v-row justify="center" class="ma-2">
        <v-card width="1000" v-if="profile">
          <div v-if="profile.user">
            <v-card-title class="white--text primary pb-2"
              >{{ profile.user.first_name || 'Gal' }}
              {{ profile.user.last_name || 'Anonim' }}</v-card-title
            >
            <v-card-subtitle class="white--text primary">{{
              profile.user.username || 'anonymous'
            }}</v-card-subtitle>
            <v-divider></v-divider>
          </div>
          <v-card-text>
            <p class="text-h4 font-weight-bold text-center ma-0">O mnie</p>
            <markdown-it-vue
              class="md-body text-left mx-2"
              :content="
                profile.description ||
                '### <center>Użytkownik nie uzupełnił opisu profilu :\'(</center>'
              "
              :options="markdownOptions"
            ></markdown-it-vue>
          </v-card-text>
        </v-card>
      </v-row>
      <div class="mx-2" v-if="articles !== undefined && articles.length">
        <p class="text-h5 font-weight-bold text-center my-2">
          Moje artykuły{{ $route.params.tag }}
        </p>
        <article-card
          v-for="article in articles"
          :key="article.id"
          :article="article"
          class="my-2"
        ></article-card>
        <v-pagination
          class="ma-2"
          v-model="pagination.currentPage"
          :length="pagination.pageCount"
          @input="paginationClicked"
          prev-icon="mdi-chevron-left"
          next-icon="mdi-chevron-right"
        ></v-pagination>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import beAxios from '@/axios';

import { ArticlesService } from '@/services/ArticlesService';
import { ArticleModel } from '@/models/ArticleModel';
import { PaginationModel } from '@/models/PaginationModel';
import { PaginationContainer } from '@/models/PaginationContainer';

@Component
export default class UserProfile extends Vue {
  private articlesService!: ArticlesService;
  private pagination!: PaginationModel;
  private articles!: ArticleModel[];
  private async getUser() {
    await beAxios
      .get('api/profiles/' + this.$route.params.id + '/')
      .then((res) => {
        if (res.status === 200) {
          this.$data.profile = res.data;
        } else {
          this.$router.replace({ name: 'error404' });
        }
      })
      .catch(() => {
        this.$router.replace({ name: 'error404' });
      });
  }

  private created() {
    this.articlesService = new ArticlesService();
    this.pagination = new PaginationModel(1, 3, 3);
    this.getUser().then(() => {
      this.getUserArticles(1);
    });
  }

  private paginationClicked(pageNumber: number) {
    this.getUserArticles(pageNumber);
  }

  private getUserArticles(pageNumber: number) {
    if (pageNumber === undefined || isNaN(pageNumber)) {
      pageNumber = 1;
    }

    this.pagination.currentPage = pageNumber;
    this.articlesService
      .getUserArticles(
        this.$data.profile.user.id,
        pageNumber,
        this.pagination.itemsPerPage,
        false,
      )
      .then((paginationContainer: PaginationContainer<ArticleModel>) => {
        this.articles = paginationContainer.results;
        this.pagination.itemCount = paginationContainer.count;
      });
  }

  private data() {
    return {
      articles: this.articles,
      pagination: this.pagination,
      profile: {},
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