import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import store from './store';
import MarkdownItVue from 'markdown-it-vue';
import 'markdown-it-vue/dist/markdown-it-vue.css';
import VueMoment from 'vue-moment';
const CommentsList = () => import(/* webpackChunkName: "ComponentCommentsList" */ '@/components/CommentsList.vue');
const SingleArticle = () => import(/* webpackChunkName: "ComponentSingleArticle" */ '@/components/SingleArticle.vue');
const SectionsList = () => import(/* webpackChunkName: "ComponentSectionsList" */ '@/components/SectionsList.vue');
const HardwaresList = () => import(/* webpackChunkName: "ComponentHardwaresList" */ '@/components/HardwaresList.vue');
const SingleProfile = () => import(/* webpackChunkName: "ComponentSingleProfile" */ '@/components/SingleProfile.vue');
const ProfilesList = () => import(/* webpackChunkName: "ComponentProfilesList" */ '@/components/ProfilesList.vue');
const ProjectsList = () => import(/* webpackChunkName: "ComponentProjectsList" */ '@/components/ProjectsList.vue');
const SingleProject = () => import(/* webpackChunkName: "ComponentSingleProject" */ '@/components/SingleProject.vue');
const HomeSectionList = () => import(/* webpackChunkName: "ComponentHomeSectionList" */ '@/components/homePageComponents/HomeSectionList.vue');
const HomeArticleList = () => import(/* webpackChunkName: "ComponentHomeArticleList" */ '@/components/homePageComponents/HomeArticleList.vue');
const ArticleCard = () => import(/* webpackChunkName: "ComponentArticleCard" */ '@/components/ArticleCard.vue');
const ArticleEditor = () => import(/* webpackChunkName: "ComponentArticleEditor" */ '@/components/ArticleEditor.vue');
const MarkdownEditor = () => import(/* webpackChunkName: "ComponentMarkdownEditor" */ '@/components/MarkdownEditor.vue');  // tslint:disable-line
const PasswordValidator = () => import(/* webpackChunkName: "ComponentPasswordValidator" */ '@/components/PasswordValidator.vue');
const Gallery = () => import(/* webpackChunkName: "ComponentGallery" */ '@/components/Gallery.vue');

Vue.config.productionTip = false;

Vue.use(MarkdownItVue);
Vue.use(VueMoment, 'vue-moment');

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');

Vue.component('password-validator', PasswordValidator);
Vue.component('article-editor', ArticleEditor);
Vue.component('markdown-editor', MarkdownEditor);
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
