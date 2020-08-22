import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import MarkdownItVue from 'markdown-it-vue';
import 'markdown-it-vue/dist/markdown-it-vue.css';
import VueMoment from 'vue-moment';
import CommentsList from '@/components/CommentsList.vue';
import SingleArticle from '@/components/SingleArticle.vue';
import SectionsList from '@/components/SectionsList.vue';
import HardwaresList from '@/components/HardwaresList.vue';
import SingleProfile from '@/components/SingleProfile.vue';
import ProfilesList from '@/components/ProfilesList.vue';
import ProjectsList from '@/components/ProjectsList.vue';
import SingleProject from '@/components/SingleProject.vue';
import HomeSectionList from '@/components/homePageComponents/HomeSectionList.vue';
import HomeArticleList from '@/components/homePageComponents/HomeArticleList.vue';
import ArticleCard from '@/components/ArticleCard.vue';
import Gallery from '@/components/Gallery.vue';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import store from './store';

Vue.config.productionTip = false;

Vue.use(MarkdownItVue);
Vue.use(VueMoment, 'vue-moment');

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');

Vue.component('comments-list', CommentsList);
Vue.component('single-article', SingleArticle);
Vue.component('sections-list', SectionsList);
Vue.component('hardwares-list', HardwaresList);
Vue.component('single-profile', SingleProfile);
Vue.component('profiles-list', ProfilesList);
Vue.component('projects-list', ProjectsList);
Vue.component('single-project', SingleProject);
Vue.component('home-section-list', HomeSectionList);
Vue.component('home-article-list', HomeArticleList);
Vue.component('article-card', ArticleCard);
Vue.component('gallery', Gallery);
