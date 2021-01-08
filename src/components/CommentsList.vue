<template>
<div>
  <!---<div v-if="comments != undefined">-->
    <h3 class="text-xs-left" style="margin-top: 20px;">Komentarze:</h3>
    <!--<div v-for="comment in comments" :key="comment.id">

    </div>-->
    <comment />
    <comment />
  </div>
</template>

<script lang='ts'>

import { Component, Prop, Vue } from 'vue-property-decorator';
import { CommentModel } from '@/models/CommentModel';

@Component
export default class CommentsList extends Vue {
  @Prop() public comments!: CommentModel[];
}
</script>