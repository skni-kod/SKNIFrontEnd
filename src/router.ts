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
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/articles/:page?',
      name: 'articles',
      component: () => import(/* webpackChunkName: "article" */ './views/Articles.vue'),
    },
    {
      path: '/article/:id-:alias',
      name: 'article',
      component: () => import(/* webpackChunkName: "article" */ './views/Article.vue'),
    },
    {
      path: '/editarticle/:id?',
      name: 'editarticle',
      beforeEnter: (to, from, next) => {
        if (!Number(to.params.id)) {
          next('/404');
        } else {
          next();
        }
      },
      component: () => import(/* webpackChunkName: "article-editor" */ './views/EditArticle.vue'),
    },
    {
      path: '/tag/:tag/:page?',
      name: 'tag',
      component: () => import(/* webpackChunkName: "article" */ './views/Tag.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "user" */ './views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "user-register" */ './views/Register.vue'),
    },
    {
      path: '/sections',
      name: 'sections',
      component: () => import(/* webpackChunkName: "sections" */ './views/Sections.vue'),
    },
    {
      path: '/hardware/:page?',
      name: 'hardware',
      component: () => import(/* webpackChunkName: "hardware" */ './views/Hardware.vue'),
    },
    {
      path: '/profiles/:page?',
      name: 'profiles',
      component: () => import(/* webpackChunkName: "profile" */ './views/Profiles.vue'),
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue'),
    },
    {
      path: '/projects/:page?',
      name: 'projects',
      component: () => import(/* webpackChunkName: "project" */ './views/Projects.vue'),
    },
    {
      path: '/project/:id',
      name: 'project',
      component: () => import(/* webpackChunkName: "project" */ './views/Project.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ './views/404.vue'),
    },
    { path: '*', redirect: '/404' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});
