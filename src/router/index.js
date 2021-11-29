import { createRouter, createWebHashHistory } from 'vue-router'

export const constantRoutes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/view/home.vue')
  },
  {
    path: '/user',
    component: () => import('@/view/user.vue')
  }
]

export const asyncRoutes = []

const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  // 路由项
  routes: [...constantRoutes] // 静态路由和动态路由的临时合并
})

export default router
