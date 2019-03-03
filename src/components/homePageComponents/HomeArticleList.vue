<template>
    <v-container grid-list-md text-xs-center>
        <h2 class="display-2">Najnowsze artykuły</h2>
        <v-layout align-space-between justify-center row fill-height wrap>
            <v-flex sm12 v-for='(article, index) in articles' :key='article.title' md4 lg4 xl4>
                    <!--:md12="index === 0"
                    :lg12="index === 0"
                    :xl12="index === 0"
                    :md6="index !== 0"
                    :lg6="index !== 0"
            >-->
                <single-article :article="article"></single-article>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import {ArticleModel} from '@/models/ArticleModel';
    @Component
    export default class HomeArticleList extends Vue {
        @Prop() public articles!: ArticleModel[];
    }
</script>
