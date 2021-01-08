<template>
<div>
  <v-card class='pr-10 pl-4 py-5 my-5'>
        <v-card-title>    <h3 class="text-xs-left mb-5">Komentarze:</h3></v-card-title>
    <v-card-text>
<!---<div v-if="comments != undefined">-->

    <!--<div v-for="comment in comments" :key="comment.id">

    </div>-->
    <comment text="asssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssassssssssssssssssssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss ssssssssssssssssssssssssssasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss" />
    <comment text="asssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss" :nested= true />
    <comment text="asssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss" />
    </v-card-text>
  
  </v-card>
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