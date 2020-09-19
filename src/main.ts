import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import store from './store';
const MarkdownItVue = () => import(/* webpackChunkName: "PluginMarkdown" */ 'markdown-it-vue');
import 'markdown-it-vue/dist/markdown-it-vue.css';
import VueMoment from 'vue-moment';
const CommentsList = () => import(/* webpackChunkName: "ComponentCommentsList" */ '@/components/CommentsList.vue');
const SingleArticle = () => import(/* webpackChunkName: "ComponentSingleArticle" */ '@/components/SingleArticle.vue');
const SectionsList = () => import(/* webpackChunkName: "ComponentSectionsList" */ '@/components/SectionsList.vue');
const HardwaresList = () => import(/* webpackChunkName: "ComponentHardwaresList" */ '@/components/HardwaresList.vue');
const SingleProject = () => import(/* webpackChunkName: "ComponentSingleProject" */ '@/components/SingleProject.vue');
const ArticleCard = () => import(/* webpackChunkName: "ComponentArticleCard" */ '@/components/ArticleCard.vue');
const ArticleEditor = () => import(/* webpackChunkName: "ComponentArticleEditor" */ '@/components/ArticleEditor.vue');
const ProjectEditor = () => import(/* webpackChunkName: "ComponentProjectEditor" */ '@/components/ProjectEditor.vue');
const MarkdownEditor = () => import(/* webpackChunkName: "ComponentMarkdownEditor" */ '@/components/MarkdownEditor.vue');  // tslint:disable-line
const PasswordValidator = () => import(/* webpackChunkName: "ComponentPasswordValidator" */ '@/components/PasswordValidator.vue');
const Gallery = () => import(/* webpackChunkName: "ComponentGallery" */ '@/components/Gallery.vue');
const ElementSelector = () => import(/* webpackChunkName: "ComponentElementSelector" */ '@/components/ElementSelector.vue');
const ConfirmationDialog = () => import(/* webpackChunkName: "ComponentConfirmationDialog" */ '@/components/ConfirmationDialog.vue');
const StringListInput = () => import(/* webpackChunkName: "ComponentStringListInput" */ '@/components/StringListInput.vue');

Vue.config.productionTip = false;

// Vue.use(MarkdownItVue);
Vue.use(VueMoment, 'vue-moment');

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');

Vue.component('markdown-it-vue', MarkdownItVue);
Vue.component('password-validator', PasswordValidator);
Vue.component('article-editor', ArticleEditor);
Vue.component('project-editor', ProjectEditor);
Vue.component('markdown-editor', MarkdownEditor);
Vue.component('comments-list', CommentsList);
Vue.component('single-article', SingleArticle);
Vue.component('sections-list', SectionsList);
Vue.component('hardwares-list', HardwaresList);
Vue.component('single-project', SingleProject);
Vue.component('article-card', ArticleCard);
Vue.component('gallery', Gallery);
Vue.component('element-selector', ElementSelector);
Vue.component('confirmation-dialog', ConfirmationDialog);
Vue.component('string-list-input', StringListInput);
