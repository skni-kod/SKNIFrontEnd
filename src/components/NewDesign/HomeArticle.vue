<template>
  <div class="card">
    <router-link
      class="card-link"
      :to="{
        name: 'article',
        params: { id: article.id, alias: article.alias },
      }"
    >
      <div class="card-image">
        <img v-if="article.gallery[0] && article.gallery[0].thumbnail"
          :src="'https://kod.prz.edu.pl' + article.gallery[0].thumbnail"
          :alt="article.title"
          class="equipment-image"
        />
        <img v-else  :src="require('@/assets/placeholder.png')" />
      </div>
    </router-link>

    <div class="card-date" v-html="date"></div>
    <router-link
      class="card-link card-link-title"
      :to="{
        name: 'article',
        params: { id: article.id, alias: article.alias },
      }"
    >
      <h3 class="card-title" v-html="article.title"></h3>
    </router-link>

    <p v-html="text" class="card-text"></p>
    <router-link
      class="card-link card-arrow"
      :to="{
        name: 'article',
        params: { id: article.id, alias: article.alias },
      }"
    >
      <div class="svg" v-html="arrowRight"></div>
    </router-link>

    <div class="card-author">
      <div v-if="article.author[0]" class="card-icon">
        <div class="svg" v-html="user"></div>
      </div>
      <div
        v-html="
          article.authors[0].first_name + ' ' + article.authors[0].last_name
        "
        class="signature"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { ArticleModel } from '@/models/ArticleModel';

@Component
export default class Article extends Vue {
  @Prop(Object) readonly article!: ArticleModel;

  private removeMarkdown(text: string) {
    const removeMd = require('remove-markdown');
    return removeMd(text);
  }
  get text(): string {
    return this.removeMarkdown(this.article.text);
  }

  get date(): string {
    return format(new Date(this.article.creation_date), 'd MMMMMMM yyyy', {
      locale: pl,
    });
  }
  user =
    '<svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.21 21v-2a4 4 0 00-4-4h-8a4 4 0 00-4 4v2M12.21 11a4 4 0 100-8 4 4 0 000 8z" stroke="#55ACEE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  arrowRight =
    '<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15.352 10.185 5.024 4.988-5.024 4.987" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.299 4.201v6.982c0 1.058.423 2.073 1.177 2.821a4.035 4.035 0 0 0 2.842 1.169h12.058" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}
</script>

<style lang="scss" scoped>
@use '@/styles/helpers' as *;
@use '@/styles/components/buttons';

.card {
  border-radius: 20px;
  max-width: 450px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.35);
  padding: 40px 40px;
  position: relative;
  padding-top: 220px;
  .card-image {
    position: absolute;
    top: 0;
    height: 200px;
    left: 0;
    width: 100%;

    img {
      width: 100%;
      border-radius: 20px 20px 0 0;
      object-fit: cover;
      height: 200px;
    }
  }

  .card-date {
    color: $primary;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .card-link {
    text-decoration: none;
  }

  .card-link-title {
    width: 100%;
  }
  .card-title {
    font-size: 18px;
    margin-bottom: 20px;
    color: $text-color;
    font-weight: 700;
  }
  .card-arrow {
    margin-bottom: 20px;
  }
  .card-text {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .card-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: #f1f1f1;
    fill: white;
    margin-right: 20px;
    .svg {
      width: 24px;
      height: 24px;
    }
  }

  .card-author {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .signature {
      font-weight: 600;
      font-size: 18px;
    }
  }
  .card-link {
    margin-left: auto;
    margin-right: 0;
    .svg {
      color: #d5d3d3;
      transition: color 0.3s;
    }
    &:hover .svg {
      color: $primary;
    }
  }
}
</style>
