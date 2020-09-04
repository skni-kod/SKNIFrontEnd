<template>
  <v-row align="center" class="fill-height">
    <v-col class="py-0">
      <v-row align="center" justify="center" class="ma-2">
        <v-card width="1000">
          <v-card-title class="white--text primary pb-2">{{user.first_name}} {{user.last_name}}</v-card-title>
          <v-card-subtitle class="white--text primary">{{user.username}}</v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text>
            <p class="text-h4 font-weight-bold text-center ma-0">O mnie</p>
            <markdown-it-vue
              class="md-body text-left mx-2"
              :content="user.profile.description || '### <center>Użytkownik nie uzupełnił opisu profilu :\'(</center>'"
              :options="markdownOptions"
            ></markdown-it-vue>
          </v-card-text>
        </v-card>
      </v-row>
      <v-row align="center" justify="center" class="ma-2">
        <user-articles :user="$route.params.id"></user-articles>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from '../axios';

const UserArticles = () => import(/* webpackChunkName: "UserArticles" */ '@/components/UserArticles.vue');

@Component({
  components: {
    UserArticles,
  },
})
export default class UserPanel extends Vue {
  private getUser() {
    axios.get('api/users/' + this.$route.params.id).then((res) => {
      this.$data.user = res.data;
    });
  }

  private created() {
    this.getUser();
  }

  private data() {
    return {
      user: { profile: { description: '' } },
      markdownOptions: {
        markdownIt: {
          html: true,
          linkify: true,
        },
        githubToc: {
          anchorLink: false,
        },
      },
    };
  }
}
</script>