<template>
  <div class="articles">{{lorem}}</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import { ArticlesService } from "@/services/ArticlesService";
import { ArticleModel } from "@/models/ArticleModel";

@Component({
  components: {
    HelloWorld
  }
})
export default class Articles extends Vue {
  @Prop() private lorem!: string;

  async mounted() {
    var asd = new ArticlesService();
    var test = await asd.getAllArticles();
    this.lorem = test[0].title;
  }
}
</script>

