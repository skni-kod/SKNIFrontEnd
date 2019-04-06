<template>
    <div v-if='article != undefined'>
      <v-card>
        <v-img
                class="white--text"
                height="300px"
                src="https://www.koty.pl/wp-content/uploads/2013/09/czarny-kot-864x575.jpg"
        >
          <div style="height: 100%; width: 100%; display: flex; flex-direction: column">
          <v-container style="flex: 1 100%">
            <v-layout fill-height>
                <!--<span class="headline text-xs-left"><a v-bind:href="'/#/article/'+ article.id + '-' + article.alias">{{ article.title }}</a></span>-->
            </v-layout>
          </v-container>

          <v-container style="background-image: linear-gradient(rgba(12, 12, 12, 0), rgba(12, 12, 12, 0.8)); height: 50%; flex: 1 100%">
            <v-flex style="text-align: left">
              <!--<div class='text-xs-left'>
                <v-icon>mdi-account</v-icon>{{article.creator.user.username}}
                <v-icon>mdi-calendar-today</v-icon>{{article.creation_date | moment('DD-MM-YYYY')}}
                <span v-if='article.tags.length != 0'>
                <v-icon>mdi-note</v-icon>
                <span v-for='(articleTag, index) in article.tags' :key='articleTag.tag.name'>
                  <a v-bind:href="'/#/tag/'+ articleTag.tag.name">{{ '#' + articleTag.tag.name }}</a>
                  <span v-if='index != (article.tags.length - 1)'>, </span>
                </span>
              </span>
                <v-icon>mdi-comment</v-icon>{{article.comments_number}}
              </div>-->
              <span class="headline text-xs-left"><a v-bind:href="'/#/article/'+ article.id + '-' + article.alias">{{ article.title }}</a></span>
              <vue-markdown class='text-xs-left' style='margin-top: 10px;'>{{article.text}}</vue-markdown>
            </v-flex>
          </v-container>
            <v-card-actions v-if='article.readMore' style="background-color: black">
              <v-btn v-bind:href="'/#/article/'+ article.id + '-' + article.alias" flat color='orange'>Czytaj więcej...</v-btn>
            </v-card-actions>
          </div>
          <!--<v-container fluid style="position: absolute; bottom: 0; background-image: linear-gradient(rgba(12, 12, 12, 0), rgba(12, 12, 12, 0.8)); height: 50%;">
            <div style="position: absolute; bottom: 25%">
            <div class='text-xs-left'>
              <v-icon>mdi-account</v-icon>{{article.creator.user.username}}
              <v-icon>mdi-calendar-today</v-icon>{{article.creation_date | moment('DD-MM-YYYY')}}
              <span v-if='article.tags.length != 0'>
                <v-icon>mdi-note</v-icon>
                <span v-for='(articleTag, index) in article.tags' :key='articleTag.tag.name'>
                  <a v-bind:href="'/#/tag/'+ articleTag.tag.name">{{ '#' + articleTag.tag.name }}</a>
                  <span v-if='index != (article.tags.length - 1)'>, </span>
                </span>
              </span>
              <v-icon>mdi-comment</v-icon>{{article.comments_number}}
            </div>
            <vue-markdown class='text-xs-left' style='margin-top: 10px;'>{{article.text}}</vue-markdown>
            </div>
          </v-container>
          <v-card-actions v-if='article.readMore' style='margin-top: -20px;'>
            <v-btn v-bind:href="'/#/article/'+ article.id + '-' + article.alias" flat color='orange'>Czytaj więcej...</v-btn>
          </v-card-actions>-->
        </v-img>
        <!--<v-card-title primary-title>
          <div>
            <h3 class='headline mb-0 text-xs-left'>
              <a v-bind:href="'/#/article/'+ article.id + '-' + article.alias">{{ article.title }}</a>
            </h3>
            <div class='text-xs-left'>
              <v-icon>mdi-account</v-icon>{{article.creator.user.username}}
              <v-icon>mdi-calendar-today</v-icon>{{article.creation_date | moment('DD-MM-YYYY')}}
              <span v-if='article.tags.length != 0'>
                <v-icon>mdi-note</v-icon>
                <span v-for='(articleTag, index) in article.tags' :key='articleTag.tag.name'>
                  <a v-bind:href="'/#/tag/'+ articleTag.tag.name">{{ '#' + articleTag.tag.name }}</a>
                  <span v-if='index != (article.tags.length - 1)'>, </span>
                </span>
              </span>
              <v-icon>mdi-comment</v-icon>{{article.comments_number}}
            </div>
            <vue-markdown class='text-xs-left' style='margin-top: 10px;'>{{article.text}}</vue-markdown>
          </div>
        </v-card-title>
        <v-card-actions v-if='article.readMore' style='margin-top: -20px;'>
          <v-btn v-bind:href="'/#/article/'+ article.id + '-' + article.alias" flat color='orange'>Czytaj więcej...</v-btn>
        </v-card-actions>-->
      </v-card>

      <comments-list v-bind:comments='comments'></comments-list>
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
}
</script>
