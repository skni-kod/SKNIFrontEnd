import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from './store';

const adminGuard = () => (store.getters.isAdministrator ? true : { name: 'error403' });

const authGuard = () => (store.getters.isAuthenticated ? true : { name: 'error403' });

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () =>
      import('./views/Home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import('./views/About.vue'),
  },
  {
    path: '/news/:page?',
    name: 'news',
    component: () =>
      import('./views/NewsList.vue'),
  },
  {
    path: '/articles/:page?',
    name: 'articles',
    component: () =>
      import('./views/ArticleList.vue'),
  },
  {
    path: '/article/:id(\\d+)-:alias',
    name: 'article',
    component: () =>
      import('./views/Article.vue'),
  },
  {
    path: '/article/edit/:id?',
    name: 'articleEdit',
    component: () =>
      import('./views/ArticleEdit.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/article/add',
    name: 'articleAdd',
    component: () =>
      import('./views/ArticleEdit.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/tag/:tag/:page?',
    name: 'tag',
    component: () =>
      import('./views/Tag.vue'),
  },
  {
    path: '/sections',
    name: 'sections',
    component: () =>
      import('./views/SectionList.vue'),
  },
  {
    path: '/section/:id',
    name: 'section',
    component: () =>
      import('./views/Section.vue'),
  },
  {
    path: '/section/edit/:id?',
    name: 'sectionEdit',
    component: () =>
      import('./views/SectionEdit.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/section/add',
    name: 'sectionAdd',
    component: () =>
      import('./views/SectionEdit.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/projects/:page?',
    name: 'projects',
    component: () =>
      import('./views/ProjectList.vue'),
  },
  {
    path: '/project/edit/:id?',
    name: 'editProject',
    component: () =>
      import('./views/ProjectEdit.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/project/add',
    name: 'projectAdd',
    component: () =>
      import('./views/ProjectEdit.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/project/:id',
    name: 'project',
    component: () =>
      import('./views/Project.vue'),
  },
  {
    path: '/hardware/edit/:id?',
    name: 'hardwareEdit',
    component: () =>
      import('./views/HardwareEdit.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/hardware/add',
    name: 'hardwareAdd',
    component: () =>
      import('./views/HardwareEdit.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/hardware/:page(\\d+)?',
    name: 'hardwareList',
    component: () =>
      import('./views/HardwareList.vue'),
  },
  {
    path: '/sponsors/add',
    name: 'sponsorsAdd',
    component: () => import('./views/admin/EditSponsor.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/sponsors/edit/:id?',
    name: 'sponsorsEdit',
    component: () => import('./views/admin/EditSponsor.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import('./views/Register.vue'),
  },
  {
    path: '/user/panel',
    name: 'userPanel',
    beforeEnter: authGuard,
    component: () =>
      import('./views/UserPanel.vue'),
  },
  {
    path: '/user/passchange',
    name: 'UserPassChange',
    beforeEnter: authGuard,
    component: () =>
      import('./views/UserPassChange.vue'),
  },
  {
    path: '/user/descriptionchange',
    name: 'UserEditChange',
    beforeEnter: authGuard,
    component: () =>
      import('./views/UserEdit.vue'),
  },
  {
    path: '/user/profile/:id',
    name: 'userProfile',
    component: () =>
      import('./views/UserProfile.vue'),
  },
  {
    path: '/admin/panel/:module?',
    name: 'adminPanel',
    component: () =>
      import('./views/AdminPanel.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/403',
    name: 'error403',
    component: () =>
      import('./views/ErrorPage.vue'),
  },
  {
    path: '/404',
    name: 'error404',
    component: () =>
      import('./views/ErrorPage.vue'),
  },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

export default router;
