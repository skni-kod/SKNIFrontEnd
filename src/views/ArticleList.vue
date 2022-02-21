<template>
  <div class="article-container">
    <SectionHeader
      title="Artykuły"
      subtitle="Skondensowana wiedza studentów"
    ></SectionHeader>

    <EntriesList group="Article" />
   
    <v-btn-cap
      fab
      fixed
      bottom
      right
      v-if="isAdmin"
      :to="{ name: 'articleAdd' }"
      class="primary btn-add"
    >
      <v-icon class="white--text">mdi-plus</v-icon>
    </v-btn-cap>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ArticleCard from '@/components/ArticleCard.vue';
import SectionHeader from '../components/SectionHeader.vue';
import EntriesList from '@/components/EntriesList.vue';

@Component({
  components: {
    ArticleCard,
    SectionHeader,
    EntriesList,
  },
})
export default class ArticleList extends Vue {

  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  get isAdmin(): boolean {
    return this.$store.getters.isAdministrator;
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

}

.btn-add {
  width: 50px;
  height: 50px;
}
</style>
