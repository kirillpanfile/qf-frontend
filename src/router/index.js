
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";


getJWTFromCookie()
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
    {
        path: '/admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "Admin" */ '../views/Admin.vue'),
        // create a sub-routing for admin
        beforeEnter: (to, from, next) => {
            if (to.path === '/admin' && getJWTFromCookie() == '') {
                next('/admin/login')
            }
            next()
        },
        children: [
            {
                path: '/admin/login',
                name: 'login',
                component: () => import(/* webpackChunkName: "AdminLogin" */ '../views/AdminLogin.vue'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
