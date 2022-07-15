import { createRouter, createWebHashHistory } from 'vue-router'
import getJWTFromCookie from '../utils'
const routes = [
    {
        path: '/admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "Admin" */ '../views/Admin.vue'),
        // create a sub-routing for admin
        beforeEnter: (to, from, next) => {
            if (to.path === '/admin' && getJWTFromCookie() == '') {
                next('/admin-login')
                return
            } else next()
        },
    },
    {
        path: '/admin-login',
        name: 'adminLogin',
        component: () => import(/* webpackChunkName: "AdminLogin" */ '../views/AdminLogin.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
