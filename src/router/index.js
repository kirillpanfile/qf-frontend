import { createRouter, createWebHashHistory } from 'vue-router'
import admin from '@/store/modules/admin'

// Check if admin is authenticated
const checkAuth = (to, from, next) => {
    if (to.path.includes('/admin') && !admin.state.accessToken && !admin.state.user) {
        next('/admin-login')
        return
    }
    next()
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
        ],
    },
    {
        path: '/admin-login',
        name: 'admin-login',

        component: () => import(/* webpackChunkName: "AdminLogin" */ '../views/Admin/AdminLogin.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
