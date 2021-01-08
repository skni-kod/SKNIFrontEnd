<template>
        <v-card class='mb-5'>
        <v-card-title primary-title>
          <v-col>
            <v-row class='pb-5 text-h6'>
              <div>
                F10k1
                <!---{{comment.user.user.username}}-->
              </div>
              <div class='text-subtitle-2 ml-10 mt-1'>
                <v-icon>mdi-calendar</v-icon>
                21.02.2019 23:25:35
                <!---{{comment.creation_date | moment('DD-MM-YYYY HH:mm:SS')}}--->
              </div>
            </v-row>
            <v-divider />
            <div class="text-xs-left mx-10 mt-3">
                Komentarz
                <!-- {{comment.text}} -->
            </div>
          </v-col>
        </v-card-title>
      </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CommentModel } from '@/models/CommentModel';

@Component
export default class Comment extends Vue {
  // @Prop() public comments!: CommentModel[];
}
</script>