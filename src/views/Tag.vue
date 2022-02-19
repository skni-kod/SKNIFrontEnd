<template>
  <v-row class="tag-page" justify="center" align="center">
    <v-col class="py-0">
          <SectionHeader
      :title="'#'+$route.params.tag"
      subtitle="Artykuły dla tagu"
    ></SectionHeader>
      <div class="articles-list" justify="center" v-if="articles && articles.length > 0">
      <div>
        <div class="articles-container">
          <div class="articles-inner">
            <ArticleCard v-for="article in articles" :article="article" @delete="deleteArticle" :key="article.id"/>
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
    </v-col>
  </v-row>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ArticlesService } from '@/services/ArticlesService';
import { ArticleModel } from '@/models/ArticleModel';
import { PaginationModel } from '@/models/PaginationModel';
import { PaginationContainer } from '@/models/PaginationContainer';
import ArticleCard from '@/components/ArticleCard.vue';
import SectionHeader from '../components/SectionHeader.vue';


@Component({
  components: {
    ArticleCard,
    SectionHeader,
  },
})
export default class Tag extends Vue {
  private articlesService!: ArticlesService;
  private pagination!: PaginationModel;
  private articles!: ArticleModel[];

  private beforeCreate() {
    this.articlesService = new ArticlesService();
    this.pagination = new PaginationModel(1, 3, 3);
  }

  private mounted() {
    this.getarticlesWithTag();
  }

  private paginationClicked(pageNumber: number) {
    this.$router.replace({
      name: 'tag',
      params: { page: '' + pageNumber },
    });
    this.getarticlesWithTag();
  }

  private getarticlesWithTag() {
    let pageNumber = +this.$route.params.page;
    if (pageNumber === undefined || isNaN(pageNumber)) {
      pageNumber = 1;
    }

    this.pagination.currentPage = pageNumber;
    this.articlesService
      .getArticlesWithTag(
        this.$route.params.tag,
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
    };
  }
}
</script>
<style lang="scss" scoped>
.tag-page{
    .section-header {
    text-align: center;
    margin-bottom: 50px;
  }
  .articles-inner{
      display: grid;
      gap: 50px;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;}

}
</style>