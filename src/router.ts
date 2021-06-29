import Vue from 'vue';
import Router, { Route, NavigationGuardNext } from 'vue-router';
import store from './store';

Vue.use(Router);

const authGuard = (to: Route, from: Route, next: NavigationGuardNext) => {
  if (!store.getters.isAdministrator) {
    next({ name: 'error403' });
  } else {
    next();
  }
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "home" */ './views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/articles/:page?',
      name: 'articles',
      component: () =>
        import(/* webpackChunkName: "article" */ './views/ArticleList.vue'),
    },
    {
      path: '/article/:id-:alias',
      name: 'article',
      component: () =>
        import(/* webpackChunkName: "article-page" */ './views/Article.vue'),
    },
    {
      path: '/article/edit/:id?',
      name: 'editArticle',
      component: () =>
        import(
          /* webpackChunkName: "article-editor" */ './views/ArticleEdit.vue'
        ),
      beforeEnter: authGuard,
    },
    {
      path: '/article/add',
      name: 'addArticle',
      component: () =>
        import(
          /* webpackChunkName: "article-editor" */ './views/ArticleEdit.vue'
        ),
      beforeEnter: authGuard,
    },
    {
      path: '/tag/:tag/:page?',
      name: 'tag',
      component: () =>
        import(/* webpackChunkName: "article" */ './views/Tag.vue'),
    },
    {
      path: '/sections',
      name: 'sections',
      component: () =>
        import(/* webpackChunkName: "sections" */ './views/SectionList.vue'),
    },
    {
      path: '/section/edit/:id?',
      name: 'sectionEdit',
      component: () =>
        import(
          /* webpackChunkName: "article-editor" */ './views/SectionEdit.vue'
        ),
      beforeEnter: authGuard,
    },
    {
      path: '/section/add',
      alias: '/section/add',
      name: 'sectionAdd',
      component: () =>
        import(
          /* webpackChunkName: "article-editor" */ './views/SectionEdit.vue'
        ),
      beforeEnter: authGuard,
    },
    {
      path: '/hardware/edit/:id?',
      name: 'editHardware',
      component: () =>
        import(
          /* webpackChunkName: "article-editor" */ './views/HardwareEdit.vue'
        ),
      beforeEnter: authGuard,
    },
    {
      path: '/hardware/add',
      name: 'addHardware',
      component: () =>
        import(
          /* webpackChunkName: "article-editor" */ './views/HardwareEdit.vue'
        ),
      beforeEnter: authGuard,
    },
    {
      path: '/hardware/:page?',
      name: 'hardwareList',
      component: () =>
        import(/* webpackChunkName: "hardwares" */ './views/HardwareList.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/hardwareCard/:id?',
      name: 'hardware',
      component: () =>
        import(/* webpackChunkName: "hardware" */ './views/Hardware.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "user" */ './views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import(/* webpackChunkName: "user-register" */ './views/Register.vue'),
    },
    {
      path: '/user/panel',
      name: 'userPanel',
      component: () =>
        import(/* webpackChunkName: "user-panel" */ './views/UserPanel.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/admin/panel',
      name: 'adminPanel',
      component: () =>
        import(/* webpackChunkName: "admin-panel" */ './views/AdminPanel.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/user/passwordchange',
      name: 'userPasswordChange',
      component: () =>
        import(
          /* webpackChunkName: "user-passwordchange" */ './views/UserPasswordChange.vue'
        ),
      beforeEnter: authGuard,
    },
    {
      path: '/user/descriptionchange',
      name: 'userDescriptionChange',
      component: () =>
        import(
          /* webpackChunkName: "user-descriptionchange" */ './views/UserDescriptionChange.vue'
        ),
      beforeEnter: authGuard,
    },
    {
      path: '/user/profile/:id',
      name: 'userProfile',
      component: () =>
        import(
          /* webpackChunkName: "user-profile" */ './views/UserProfile.vue'
        ),
      beforeEnter: authGuard,
    },
    {
      path: '/projects/:page?',
      name: 'projects',
      component: () =>
        import(/* webpackChunkName: "project" */ './views/ProjectList.vue'),
    },
    {
      path: '/project/edit/:id?',
      name: 'editProject',
      component: () =>
        import(
          /* webpackChunkName: "project-editor" */ './views/ProjectEdit.vue'
        ),
      beforeEnter: authGuard,
    },
    {
      path: '/project/add',
      name: 'addProject',
      component: () =>
        import(
          /* webpackChunkName: "project-editor" */ './views/ProjectEdit.vue'
        ),
      beforeEnter: authGuard,
    },
    {
      path: '/project/:id',
      name: 'project',
      component: () =>
        import(/* webpackChunkName: "project-page" */ './views/Project.vue'),
    },
    {
      path: '/403',
      name: 'error403',
      component: () =>
        import(/* webpackChunkName: "eror403" */ './views/403.vue'),
    },
    {
      path: '/404',
      name: 'error404',
      component: () =>
        import(/* webpackChunkName: "error404" */ './views/404.vue'),
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
