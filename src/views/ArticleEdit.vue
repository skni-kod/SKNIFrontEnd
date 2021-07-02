<template>
  <div>
    <p
      class="text-h4 text-center font-weight-bold justify-center ma-2"
      style="word-break: break-word"
    >
      {{ add ? 'Nowy artykuł' : 'Edycja artykułu nr ' + this.$route.params.id }}
    </p>
    <article-editor
      :article="article"
      @articleEdited="article = $event"
      :authors="authors"
      @authorsEdited="authors = $event"
      :tags="allTags"
      @tagListEdited="allTags = $event"
      :selTags="selectedTags"
      @selectedTags="selectedTags = $event"
      @validation="inputValidated = $event"
    ></article-editor>
    <editor-menu
      @saveChanges="addArticle"
      @discardChanges="returnFromEditor"
      text="Czy na pewno chcesz opuścić ekran tworzenia nowego artykułu bez zapisywania zmian?"
      saveText="Dodaj artykuł"
      discardText="Odrzuć artykuł"
      v-if="add"
    />
    <editor-menu
      @saveChanges="editArticle"
      @discardChanges="returnFromEditor"
      text="Czy na pewno chcesz wyjść z edycji artykułu bez zapisywania zmian?"
      v-else
    />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ArticlesService } from '@/services/ArticlesService';
import { TagsService } from '@/services/TagsService';
import { ArticleModel } from '@/models/ArticleModel';
import ArticleEditor from '@/components/ArticleEditor.vue';

@Component({
  components: {
    ArticleEditor,
  },
})
export default class ArticleEdit extends Vue {
  private articlesService!: ArticlesService;
  private tagsService!: TagsService;

  private created() {
    this.articlesService = new ArticlesService();
    this.tagsService = new TagsService();
    this.$data.article = new ArticleModel();

    if (this.$route.path.includes('add')) {
      this.$data.add = true;
      this.getAllTags();
    } else {
      if (this.$route.params.id !== undefined) {
        this.articlesService
          .getArticle(+this.$route.params.id, false)
          .then((article) => {
            this.$data.article = article;
            this.$data.selectedTags = this.$data.article.tags.map(
              (p: any) => p.id,
            );
            this.getAllTags();
            article.authors.forEach((element: any) => {
              this.$data.authors.push(element.id);
            });
          })
          .catch(() => {
            this.$router.replace({ name: 'error404' });
          });
      }
    }
  }

  private addArticle() {
    if (this.$data.inputValidated) {
      this.articlesService
        .addArticle(this.$data.article.id, {
          title: this.$data.article.title,
          alias: this.$data.article.alias,
          authors: this.$data.authors,
          text: this.$data.article.text,
          tags: this.$data.selectedTags,
          creator: this.$store.getters.user.id,
          creation_date: new Date(),
          publication_date: new Date(),
        })
        .then((res: any) => {
          if (res.status === 201) {
            this.$store.dispatch('successMessage', 'Artykuł został dodany');
            this.returnFromEditor();
          }
        })
        .catch(() => {
          this.$store.dispatch(
            'errorMessage',
            'Błąd poczas zapisywania artykułu!',
          );
        });
    } else {
      this.$store.dispatch(
        'warningMessage',
        'Formularz nie zostal poprawnie wypełniony!',
      );
    }
  }

  private editArticle() {
    if (this.$data.inputValidated) {
      this.articlesService
        .editArticle(this.$data.article.id, {
          title: this.$data.article.title,
          alias: this.$data.article.alias,
          authors: this.$data.authors,
          text: this.$data.article.text,
          tags: this.$data.selectedTags,
        })
        .then((res: any) => {
          if (res.status === 200) {
            this.$store.dispatch(
              'successMessage',
              'Artykuł został zaktualizowany',
            );
            this.returnFromEditor();
          }
        })
        .catch(() => {
          this.$store.dispatch('errorMessage', 'Błąd poczas edycji artykułu!');
        });
    } else {
      this.$store.dispatch(
        'warningMessage',
        'Formularz nie został poprawnie wypełniony!',
      );
    }
  }

  private getAllTags() {
    this.tagsService.getAllTags().then((res) => {
      this.$data.allTags = res.data;
    });
  }

  private returnFromEditor() {
    if (this.$data.add) {
      this.$router.replace({ name: 'articles' });
    } else {
      this.$router.replace({
        name: 'article',
        params: { id: this.$data.article.id, alias: this.$data.article.alias },
      });
    }
  }

  private data() {
    return {
      inputValidated: false,
      article: { text: '' },
      authors: [],
      allTags: [],
      selectedTags: [],
      add: false,
    };
  }
}
</script>
