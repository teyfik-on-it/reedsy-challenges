import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {path: '/', component: () => import('../views/Books.vue')},
  {path: '/book/:slug', component: () => import('../views/Book.vue')},
  {path: '*', redirect: '/'},
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
