<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container grid-list-md text-xs-centxer>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field label="Tytuł artykułu" v-model="article.title" :rules="[requiredRule]"></v-text-field>
        </v-flex>
        <v-flex xs10>
          <v-text-field label="Alias" v-model="article.alias" :rules="[requiredRule]"></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-btn @click="generateAlias">Wygeneruj alias</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-text-field label="Data utworzenia" v-model="formattedCreationDate" mask="##-##-#### ##:##:##" :rules="[requiredRule]"></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field label="Data publikacji" v-model="formattedPublicationDate" mask="##-##-#### ##:##:##" :rules="[requiredRule]"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-select v-model="selectedTags" :items="allTags" :item-text="tagTextSelector" attach chips label="Tags" multiple :rules="[requiredRule]"></v-select>
        </v-flex>
        <v-flex xs6 class="text-xs-left full-height">
          <v-textarea id="content-textarea" v-model="article.text" v-scroll:#content-textarea="onContentScroll" :rules="[requiredRule]"></v-textarea>
        </v-flex>
        <v-flex xs6 class="text-xs-left">
          <vue-markdown id="content-preview" :source="article.text" html :rules="[requiredRule]"></vue-markdown>
        </v-flex>
        <v-flex xs12>
          <v-btn>Anuluj</v-btn>
          <v-btn :disabled="!valid">Zapisz i wróć do listy</v-btn>
          <v-btn @click="onSaveButtonClick" :disabled="!valid">Zapisz</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ArticlesService } from "@/services/ArticlesService";
import { TagsService } from "@/services/TagsService";
import { ArticleModel } from "@/models/ArticleModel";
import { TagModel } from "@/models/TagModel";
import moment from "moment";

@Component
export default class EditArticle extends Vue {
  private articlesService!: ArticlesService;
  private tagsService!: TagsService;
  private article!: ArticleModel;
  private allTags!: TagModel[];
  private selectedTags!: string[];
  private formattedCreationDate!: string;
  private formattedPublicationDate!: string;
  private valid!: boolean;
  
  requiredRule = (v: string) => v.length > 0 || "To pole jest wymagane.";

  beforeCreate() {
    this.articlesService = new ArticlesService();
    this.tagsService = new TagsService();
    this.article = new ArticleModel();
    this.formattedCreationDate = "";
    this.formattedPublicationDate = "";
    this.valid = false;
  }

  mounted() {
    if (this.$route.params.id != undefined) {
      this.articlesService.getArticle(+this.$route.params.id).then(article => {
        this.article = article;
        this.selectedTags = this.article.tags.map(p => p.tag.name);

        this.formattedCreationDate = moment(this.article.creation_date).format(
          "DD-MM-YYYY HH:mm:SS"
        );

        this.formattedPublicationDate = moment(
          this.article.publication_date
        ).format("DD-MM-YYYY HH:mm:SS");

        this.tagsService.getAllTags().then(tags => {
          this.allTags = tags;
        });
      });
    }
  }

  public generateAlias() {
    this.article.alias = this.articlesService.generateAliasForTitle(
      this.article.title
    );
    this.$forceUpdate();
  }

  public data() {
    return {
      article: this.article,
      allTags: this.allTags,
      selectedTags: this.selectedTags,
      formattedPublicationDate: this.formattedPublicationDate,
      formattedCreationDate: this.formattedCreationDate,
      valid: this.valid
    };
  }

  public tagTextSelector(item: TagModel) {
    return item.name;
  }

  public onContentScroll(offset: any) {
    var contentPreview = this.$el.querySelector("#content-preview");
    if (contentPreview != undefined) {
      contentPreview.scrollTop = offset.target.scrollTop;
    }
  }
  
  public onSaveButtonClick() {
    if (this.$refs.form.validate()) {
      this.articlesService.createArticle(this.article).then((value: ArticleModel) => {
        alert("Artykuł dodany");
      }).catch((reason: any) => {
        alert("Nie udało się dodać artykułu");
      });
    }
  }
}
</script>

<style scope>
#content-textarea {
  padding-top: 0;
  overflow: auto;
  height: 500px;
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  line-height: 18.5714px;
  font-size: 13px;
  padding-top: 0;
  resize: none;
  margin-top: -17px;
}

#content-preview {
  overflow: auto;
  height: 500px;
  line-height: 22px;
  resize: none;
}
</style>