import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import SignUp from '../views/SignUp.vue';
import AlbumDetail from '../views/AlbumDetail.vue';
import Albums from '../views/Albums.vue';
import { Auth } from 'aws-amplify';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/album/:id',
    name: 'AlbumDetail',
    component: AlbumDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/albums',
    name: 'Albums',
    component: Albums,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = await Auth.currentUserInfo();

  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
})

export default router;
