<template>
    <div v-if='article != undefined' class="page-container">
      <v-card class="article-background">
        <!--<v-card-title primary-title>-->
          <div class="article">
            <h3 class='headline mb-0 text-xs-left'>
              <a v-bind:href="'/#/article/'+ article.id + '-' + article.alias">{{ article.title }}</a>
            </h3>
            <div class='text-xs-left info'>
              <div><v-icon class='icon'>mdi-account</v-icon><p>{{article.creator.user.username}}</p></div>
             <div><v-icon class='icon'>mdi-calendar-today</v-icon><p>{{article.creation_date | moment('DD-MM-YYYY')}}</p></div>
              <div><span class='tags' v-if='article.tags.length != 0'>
                <v-icon class='icon'>mdi-note</v-icon>
                <p><span v-for='(articleTag, index) in article.tags' :key='articleTag.tag.name'>
                  <a v-bind:href="'/#/tag/'+ articleTag.tag.name">{{ '#' + articleTag.tag.name }}</a>
                  <span v-if='index != (article.tags.length - 1)'>, </span>
                </span></p>
              </span></div>
              <div><v-icon class='icon'>mdi-comment</v-icon><p>{{article.comments_number}}</p></div>
            </div>
            <vue-markdown class='text-xs-left description' style='margin-top: 10px;'>{{article.text}}</vue-markdown>
          </div>
        </v-img>
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

<style lang="scss" scoped>
    .page-container{
        margin-top: 20px;
    }
.article{
  margin-top: 100px;
  width: 90%;
  margin: auto;
  h3{
    display: flex;
    justify-content: center;
    a{
      color: #418F9F;
      text-decoration: none;
      font-size: 35px;
      text-align: center;
      text-shadow: 1.1px 1.1px #65929b;
    }
    padding: 0 0 20px 0;
  }
  .info{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    div{
      display: flex;
      flex-direction: row;
      span{
        a{
          color:#455154;
          text-decoration: none;
          font-weight: 500;
          letter-spacing: 1px;
        }
      }
      p{
        padding: 20px 0 0 10px;
        letter-spacing: 1px;
        color: #455154;
        font-weight: 500;
      }
      .tags{
        display: flex;
      }
    }
    .icon{
      color: #3f849a;
    }
  }
  .description{
    font-size: 16px;
  }
}
.article-background{
    padding: 20px;
}
.article-background:hover{
  background-color:#f9f9f9;
}
</style>
