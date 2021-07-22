import Vue from 'vue';
import VueRouter, { RouteConfig, Route, NavigationGuardNext } from 'vue-router';
import store from './store';

Vue.use(VueRouter);

const adminGuard = (to: Route, from: Route, next: NavigationGuardNext) => {
  if (!store.getters.isAdministrator) {
    next({ name: 'error403' });
  } else {
    next();
  }
};

const authGuard = (to: Route, from: Route, next: NavigationGuardNext) => {
  if (!store.getters.isAuthenticated) {
    next({ name: 'error403' });
  } else {
    next();
  }
};

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */ './views/Home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "About" */ './views/About.vue'),
  },
  {
    path: '/articles/:page?',
    name: 'articles',
    component: () =>
      import(/* webpackChunkName: "Article" */ './views/ArticleList.vue'),
  },
  {
    path: '/article/:id-:alias',
    name: 'article',
    component: () =>
      import(/* webpackChunkName: "ArticlePage" */ './views/Article.vue'),
  },
  {
    path: '/article/edit/:id?',
    name: 'articleEdit',
    component: () =>
      import(/* webpackChunkName: "ArticleEdit" */ './views/ArticleEdit.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/article/add',
    name: 'articleAdd',
    component: () =>
      import(/* webpackChunkName: "ArticleEdit" */ './views/ArticleEdit.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/tag/:tag/:page?',
    name: 'tag',
    component: () =>
      import(/* webpackChunkName: "Article" */ './views/Tag.vue'),
  },
  {
    path: '/sections',
    name: 'sections',
    component: () =>
      import(/* webpackChunkName: "Sections" */ './views/SectionList.vue'),
  },
  {
    path: '/section/:id',
    name: 'section',
    component: () =>
      import(/* webpackChunkName: "Section" */ './views/Section.vue'),
  },
  {
    path: '/section/edit/:id?',
    name: 'sectionEdit',
    component: () =>
      import(/* webpackChunkName: "SectionEdit" */ './views/SectionEdit.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/section/add',
    name: 'sectionAdd',
    component: () =>
      import(/* webpackChunkName: "SectionEdit" */ './views/SectionEdit.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/hardware/edit/:id?',
    name: 'hardwareEdit',
    component: () =>
      import(/* webpackChunkName: "HardwareEdit" */ './views/HardwareEdit.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/hardware/add',
    name: 'hardwareAdd',
    component: () =>
      import(/* webpackChunkName: "HardwareEdit" */ './views/HardwareEdit.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/hardware/:page?',
    name: 'hardwareList',
    component: () =>
      import(/* webpackChunkName: "Hardware" */ './views/HardwareList.vue'),
  },
  {
    path: '/hardware/:id?',
    name: 'hardware',
    component: () =>
      import(/* webpackChunkName: "Hardware" */ './views/Hardware.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "User" */ './views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "UserRegister" */ './views/Register.vue'),
  },
  {
    path: '/user/panel',
    name: 'userPanel',
    beforeEnter: authGuard,
    component: () =>
      import(/* webpackChunkName: "UserPanel" */ './views/UserPanel.vue'),
  },
  {
    path: '/admin/panel/:module?',
    name: 'adminPanel',
    component: () =>
      import(/* webpackChunkName: "AdminPanel" */ './views/AdminPanel.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/user/passchange',
    name: 'UserPassChange',
    beforeEnter: authGuard,
    component: () =>
      import(
        /* webpackChunkName: "UserPassChange" */ './views/UserPassChange.vue'
      ),
  },
  {
    path: '/user/descriptionchange',
    name: 'UserEditChange',
    beforeEnter: authGuard,
    component: () =>
      import(/* webpackChunkName: "UserEdit" */ './views/UserEdit.vue'),
  },
  {
    path: '/user/profile/:id',
    name: 'userProfile',
    component: () =>
      import(/* webpackChunkName: "UserProfile" */ './views/UserProfile.vue'),
  },
  {
    path: '/projects/:page?',
    name: 'projects',
    component: () =>
      import(/* webpackChunkName: "Project" */ './views/ProjectList.vue'),
  },
  {
    path: '/project/edit/:id?',
    name: 'editProject',
    component: () =>
      import(/* webpackChunkName: "ProjectEdit" */ './views/ProjectEdit.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/project/add',
    name: 'projectAdd',
    component: () =>
      import(/* webpackChunkName: "ProjectEdit" */ './views/ProjectEdit.vue'),
    beforeEnter: adminGuard,
  },
  {
    path: '/project/:id',
    name: 'project',
    component: () =>
      import(/* webpackChunkName: "ProjectPage" */ './views/Project.vue'),
  },
  {
    path: '/403',
    name: 'error403',
    component: () =>
      import(/* webpackChunkName: "Eror403" */ './views/403.vue'),
  },
  {
    path: '/404',
    name: 'error404',
    component: () =>
      import(/* webpackChunkName: "Error404" */ './views/404.vue'),
  },
  { path: '*', redirect: '/404' },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
