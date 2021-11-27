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

const createTheRouter = () =>
  createRouter({
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

const router = createTheRouter() // 实例化一个路由

// 重置路由
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createTheRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
