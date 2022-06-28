import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {isLoggedIn} from '../composables/auth/auth_service'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '',
        name: 'Welcome',
        props: true,
        component: () => import('../views/WelcomeView.vue'),
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import('../views/UsersView.vue')
      },
      {
        path: '/create-user',
        name: 'Cretea User',
        component: () => import('@/components/user/CreateUser.vue')
      },
      {
        path: '/update-user/:id',
        name: 'Update User',
        props: true,
        component: () => import('@/components/user/CreateUser.vue')
      },
      {
        path: '/roles',
        name: 'Roles',
        component: () => import('@/views/RolesView.vue')
      },
      {
        path: '/create-role',
        name: 'Create Role',
        component: () => import('@/components/role/CreateRole.vue')
      },

      {
        path: '/update-role/:id',
        name: 'Update Role',
        props: true,
        component: () => import('@/components/role/CreateRole.vue')
      },
    ],
    beforeEnter(to, from, next) {
      if(!isLoggedIn()) {
        next({path: '/login'});
      }else {
        next()
      }
    }
  },

  {
    path: '/login',
    name: 'Login',
    props: false,
    component: () => import('@/views/LoginView.vue'),
    
    beforeEnter(to, from, next) {
      if(!isLoggedIn()) {
        next();
      }else {
        next({path: '/login'})
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
