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
        component: () => import(/* webpackChunkName: "Admin" */ '@/views/Admin/Admin.vue'),

        // create a sub-routing for admin
        beforeEnter: checkAuth,
        children: [
            {
                path: '/admin/dashboard',
                name: 'admin-dashboard',
                icon: 'fa-solid fa-chart-pie',
                text: 'Dashboard',
                component: () => import(/* webpackChunkName: "AdminDashboard" */ '@/views/Admin/AdminDashboard.vue'),
            },
            {
                path: '/admin/users',
                name: 'admin-users',
                icon: 'fa-solid fa-users',
                text: 'Users',
                component: () => import(/* webpackChunkName: "AdminUsers" */ '@/views/Admin/AdminUsers.vue'),
            },
            {
                path: '/admin/recipes',
                name: 'admin-recipes',
                icon: 'fa-solid fa-paste',
                text: 'Recipes',
                component: () => import(/* webpackChunkName: "AdminPosts" */ '@/views/Admin/AdminRecipes.vue'),

                children: [
                    {
                        icon: 'fa-solid fa-plus',
                        text: 'Create',
                        path: '/admin/recipes/create',
                        name: 'admin-recipes-create',
                        component: () =>
                            import(
                                /* webpackChunkName: "AdminPostsCreate" */ '@/views/Admin/Admin Recipes/CreateRecipe.vue'
                            ),
                    },
                    {
                        path: '/admin/recipes/:id',
                        name: 'admin-recipes-item',
                        component: () =>
                            import(/* webpackChunkName: "AdminRecipesItem" */ '@/views/Admin/Admin Recipes/Recipe.vue'),
                    },
                    {
                        icon: 'fa-solid fa-list',
                        text: 'View All',
                        path: '/admin/recipes/all',
                        name: 'admin-recipes-all',
                        component: () =>
                            import(
                                /* webpackChunkName: "AdminPostsAll" */ '@/views/Admin/Admin Recipes/AllRecipes.vue'
                            ),
                    },
                ],
            },
            {
                path: '/admin/settings',
                name: 'admin-settings',
                text: 'Settings',
                icon: 'fa-solid fa-cog',
                component: () => import(/* webpackChunkName: "AdminSettings" */ '@/views/Admin/AdminSettings.vue'),
            },
            {
                path: '/admin/card',
                name: 'admin-card',
                component: () => import('@/views/Admin/AdminCard.vue'),
            },
            {
                path: '/admin/notifications',
                name: 'admin-notifications',
                text: 'Notifications',
                icon: 'fa-solid fa-bell',
                component: () => import('@/views/Admin/AdminNotifications.vue'),
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
        component: () => import(/* webpackChunkName: "AdminLogin" */ '@/views/Admin/AdminLogin.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
export { routes }
