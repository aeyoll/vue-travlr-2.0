import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import ListView from '../views/ListView.vue'
import ItemView from '../views/ItemView.vue'
import DashboardView from '../views/DashboardView.vue'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/travels/:page(\\d+)?', component: ListView },
    { path: '/travel/:slug', component: ItemView },
    { path: '/dashboard', component: DashboardView },
    { path: '*', redirect: '/dashboard' }
  ]
})
