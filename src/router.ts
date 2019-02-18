import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue'

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
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
    },
    {
      path: '/sections',
      name: 'sections',
      // route level code-splitting
      // this generates a separate chunk (sections.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "sections" */ './views/Sections.vue'),
    },
    {
      path: '/hardware',
      name: 'hardware',
      // route level code-splitting
      // this generates a separate chunk (hardware.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "hardware" */ './views/Hardware.vue'),
    },
  ],
});
