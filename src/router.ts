import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

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
      alias: '/article/add',
      name: 'editArticle',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAdministrator) {
          next('/403');
        } else {
          next();
        }
      },
      component: () =>
        import(/* webpackChunkName: "article-editor" */ './views/ArticleEdit.vue'),
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
      alias: '/section/add',
      name: 'sectionEdit',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) {
          next('/403');
        } else {
          next();
        }
      },
      component: () =>
        import(/* webpackChunkName: "article-editor" */ './views/SectionEdit.vue'),
    },
    {
      path: '/hardware/edit/:id?',
      alias: '/hardware/add',
      name: 'editHardware',
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) {
          next('/403');
        } else {
          next();
        }
      },
      component: () =>
        import(/* webpackChunkName: "article-editor" */ './views/HardwareEdit.vue'),
    },
    {
      path: '/hardware/:page?',
      name: 'hardwareList',
      component: () => import(/* webpackChunkName: "hardwares" */ './views/HardwareList.vue'),
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next('/403');
        }
      },
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
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next('/403');
        }
      },
    },
    {
      path: '/admin/panel',
      name: 'adminPanel',
      component: () => import(/* webpackChunkName: "admin-panel" */ './views/AdminPanel.vue'),
      beforeEnter: (to, from, next) => {
        if (store.getters.isAdministrator) {
          next();
        } else {
          next('/403');
        }
      },
    },
    {
      path: '/user/passwordchange',
      name: 'userPasswordChange',
      component: () =>
        import(/* webpackChunkName: "user-passwordchange" */ './views/UserPasswordChange.vue'),
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next('/403');
        }
      },
    },
    {
      path: '/user/descriptionchange',
      name: 'userDescriptionChange',
      component: () =>
        import(/* webpackChunkName: "user-descriptionchange" */ './views/UserDescriptionChange.vue'),
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next('/403');
        }
      },
    },
    {
      path: '/user/profile/:id',
      name: 'userProfile',
      component: () =>
        import(/* webpackChunkName: "user-profile" */ './views/UserProfile.vue'),
      beforeEnter: (to, from, next) => {
        if (to.params.id) {
          next();
        } else {
          next('/403');
        }
      },
    },
    {
      path: '/projects/:page?',
      name: 'projects',
      component: () =>
        import(/* webpackChunkName: "project" */ './views/ProjectList.vue'),
    },
    {
    path: '/project/edit/:id?',
    alias: '/project/add',
    name: 'editProject',
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) {
        next('/403');
      } else {
        next();
      }
    },
    component: () =>
      import(/* webpackChunkName: "article-editor" */ './views/ProjectEdit.vue'),
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
