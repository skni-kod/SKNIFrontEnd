<template>
  <div class="article-container">
    <SectionHeader
      title="Najnowsze artykuły"
      subtitle="Co słychać w SKNI KOD?"
    ></SectionHeader>
    <div justify="center" v-if="articles && articles.length > 0">
      <div>
        <div class="articles-container">
          <div class="articles-inner">
            <HomeArticle
              v-for="article in articles"
              :article="article"
              @delete="deleteArticle"
            />
          </div>
        </div>
        <v-pagination
          v-model="pagination.currentPage"
          class="mt-2"
          :length="pagination.pageCount"
          @input="paginationClicked"
          prev-icon="mdi-chevron-left"
          next-icon="mdi-chevron-right"
          v-if="articles && articles.length > 0"
        ></v-pagination>
      </div>
    </div>
    <v-row align="center" class="fill-height" v-else>
      <v-col>
        <div class="text-h3 font-weight-bold text-center">
          {{ loading ? '' : 'Brak artykułów' }}
          <v-progress-circular
            style="height:80vh;"
            indeterminate
            color="primary"
            v-if="loading"
          ></v-progress-circular>
        </div>
      </v-col>
    </v-row>
    <v-btn-cap
      fab
      fixed
      bottom
      right
      v-if="role"
      :to="{ name: 'articleAdd' }"
      class="success btn-add"
    >
      <v-icon class="white--text">mdi-plus</v-icon>
    </v-btn-cap>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ArticlesService } from '@/services/ArticlesService';
import { ArticleModel } from '@/models/ArticleModel';
import { PaginationModel } from '@/models/PaginationModel';
import { PaginationContainer } from '@/models/PaginationContainer';
import HomeArticle from '@/components/NewDesign/HomeArticle.vue';
import SectionHeader from '../../components/NewDesign/SectionHeader.vue';

@Component({
  components: {
    HomeArticle,
    SectionHeader,
  },
})
export default class ArticleList extends Vue {
  private articlesService!: ArticlesService;
  private pagination!: PaginationModel;
  private articles!: ArticleModel[];
  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  get role(): boolean {
    return this.$store.getters.isAdministrator;
  }

  private beforeCreate() {
    this.articlesService = new ArticlesService();
    this.pagination = new PaginationModel(1, 6, 6);
  }

  private mounted() {
    this.getArticles();
    
  }

  private paginationClicked(pageNumber: number) {
    console.log(this.articles)
    this.$router.replace({
      name: 'articles',
      params: { page: '' + pageNumber },
    });
    this.getArticles();
  }

  private getArticles() {
    const pageNumber = +this.$route.params.page;
    if (pageNumber === undefined || isNaN(pageNumber) || pageNumber < 1) {
      this.paginationClicked(1);
      return;
    }

    this.pagination.currentPage = pageNumber;
    this.articlesService
      .getArticles(pageNumber, this.pagination.itemsPerPage, false)
      .then((paginationContainer: PaginationContainer<ArticleModel>) => {
        this.articles = paginationContainer.results;
        if (!this.articles.length && pageNumber !== 1) {
          this.paginationClicked(1);
          return;
        }
        this.pagination.itemCount = paginationContainer.count;
        this.$data.loading = false;
      })
      .catch(() => {
        this.$data.loading = false;
      });
  }

  private deleteArticle(id: number) {
    this.articlesService
      .deleteArticle(id)
      .then((res) => {
        if (res.status === 204) {
          this.$store.dispatch('successMessage', 'Artykuł został usunięty');
          this.$router.replace({
            name: 'articles',
            params: { page: 'reload' },
          });
        }
      })
      .catch(() => {
        this.$store.dispatch('errorMessage', 'Błąd poczas usuwania artykułu!');
      });
  }

  private data() {
    return {
      articles: this.articles,
      pagination: this.pagination,
      loading: true,
    };
  }
}
</script>

<style scoped lang="scss">
@use '@/styles/helpers' as *;
@use '@/styles/components/buttons';
.article-container {
  .section-header {
    text-align: center;
  }
  margin-top: 50px;
  @include responsiveLayout();
  row-gap: 50px;
  width: 100%;

  .articles-container {
    margin: 50px 0;
    .articles-inner {
      display: grid;
      gap: 50px;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
      .card {
        margin: 0 auto;
      }
    }
  }

  @media only screen and (max-width: 991px) {
    .articles-container {
      .articles-inner {
        grid-template-columns: 1fr;
      }
    }
  }
}

.btn-add {
  width: 50px;
}
</style>
