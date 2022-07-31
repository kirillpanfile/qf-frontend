import { createRouter, createWebHashHistory } from 'vue-router'
import { useAdminStore } from '@/store/adminStore'
import { storeToRefs } from 'pinia'

const checkAuth = (to, from, next) => {
    const admin = useAdminStore()
    const { accessToken, user } = storeToRefs(admin)
    if (!accessToken.value && !user.value) next('/admin-login')
    else next()
}

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "Admin" */ '../views/Admin/Admin.vue'),

        // create a sub-routing for admin
        beforeEnter: checkAuth,
        children: [
            {
                path: '/admin/dashboard',
                name: 'admin-dashboard',
                component: () => import(/* webpackChunkName: "AdminDashboard" */ '../views/Admin/AdminDashboard.vue'),
            },
            {
                path: '/admin/users',
                name: 'admin-users',
                component: () => import(/* webpackChunkName: "AdminUsers" */ '../views/Admin/AdminUsers.vue'),
            },
            {
                path: '/admin/recipes',
                name: 'admin-recipes',
                component: () => import(/* webpackChunkName: "AdminPosts" */ '../views/Admin/AdminRecipes.vue'),
            },
            {
                path: '/admin/recipe/:id',
                name: 'admin-recipe-edit',
                component: () => import(/* webpackChunkName: "AdminRecipeItem" */ '../views/Admin/AdminRecipeItem.vue')
            },
            {
                path: '/admin/settings',
                name: 'admin-settings',
                component: () => import(/* webpackChunkName: "AdminSettings" */ '../views/Admin/AdminSettings.vue'),
            },
            {
                path: '/admin/card',
                name: 'admin-card',
                component: () => import('../views/Admin/AdminCard.vue'),
            },
            {
                path: '/admin/notifications',
                name: 'admin-notifications',
                component: () => import('../views/Admin/AdminNotifications.vue')
            },
            {
                //catchall
                path: '/admin/:catchAll(.*)',
                redirect: '/admin/dashboard',
            },
        ],
    },
    {
        path: '/admin-login',
        name: 'admin-login',
        children: [
            {
                //
                path: '/admin-login/:catchAll(.*)',
                redirect: '/admin/dashboard',
            },
        ],
        component: () => import(/* webpackChunkName: "AdminLogin" */ '../views/Admin/AdminLogin.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
