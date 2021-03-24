import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import store from './store';
import 'animate.css';
const MarkdownItVue = () => import(/* webpackChunkName: "PluginMarkdown" */ 'markdown-it-vue');
import 'markdown-it-vue/dist/markdown-it-vue.css';
import VueMoment from 'vue-moment';
const CommentsList = () => import(/* webpackChunkName: "ComponentCommentsList" */ '@/components/CommentsList.vue');
const HardwaresList = () => import(/* webpackChunkName: "ComponentHardwaresList" */ '@/components/HardwaresList.vue');
const ArticleCard = () => import(/* webpackChunkName: "ComponentArticleCard" */ '@/components/ArticleCard.vue');
const MarkdownEditor = () => import(/* webpackChunkName: "ComponentMarkdownEditor" */ '@/components/MarkdownEditor.vue');  // tslint:disable-line
const PasswordValidator = () => import(/* webpackChunkName: "ComponentPasswordValidator" */ '@/components/PasswordValidator.vue');
const Gallery = () => import(/* webpackChunkName: "ComponentGallery" */ '@/components/Gallery.vue');
const ElementSelector = () => import(/* webpackChunkName: "ComponentElementSelector" */ '@/components/ElementSelector.vue');
const ConfirmationDialog = () => import(/* webpackChunkName: "ComponentConfirmationDialog" */ '@/components/ConfirmationDialog.vue');
const LinkListInput = () => import(/* webpackChunkName: "ComponentLinkListInput" */ '@/components/LinkListInput.vue');
const EditorMenu = () => import(/* webpackChunkName: "ComponentEditorMenu" */ '@/components/EditorMenu.vue');
const Comment = () => import(/* webpackChunkName: "ComponentComment" */ '@/components/Comment.vue');
const CommentEditor = () => import(/* webpackChunkName: "ComponentCommentEditor" */ '@/components/CommentEditor.vue');

const VBtnCap = () => import(/* webpackChunkName: "CustomVBtnCap" */ '@/components/base/VBtnCap.vue');

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
Vue.component('markdown-editor', MarkdownEditor);
Vue.component('comments-list', CommentsList);
Vue.component('hardwares-list', HardwaresList);
Vue.component('article-card', ArticleCard);
Vue.component('gallery', Gallery);
Vue.component('element-selector', ElementSelector);
Vue.component('confirmation-dialog', ConfirmationDialog);
Vue.component('link-list-input', LinkListInput);
Vue.component('editor-menu', EditorMenu);
Vue.component('comment', Comment);
Vue.component('comment-editor', CommentEditor);
Vue.component('v-btn-cap', VBtnCap);
