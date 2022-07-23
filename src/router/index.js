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
                path: '/admin/posts',
                name: 'admin-posts',
                component: () => import(/* webpackChunkName: "AdminPosts" */ '../views/Admin/AdminPosts.vue'),
            },
            {
                path: '/admin/settings',
                name: 'admin-settings',
                component: () => import(/* webpackChunkName: "AdminSettings" */ '../views/Admin/AdminSettings.vue'),
            },
            {
                path: '/admin/card',
                name: 'admin-card',
                component: () => import('../views/AppCard.vue')
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
