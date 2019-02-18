import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/articles/:page?',
      name: 'articles',
      component: () => import('./views/Articles.vue'),
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('./views/Article.vue'),
    },
    {
      path: '/tag/:tag/:page?',
      name: 'tag',
      component: () => import('./views/Tag.vue'),
    },
  ],
});
