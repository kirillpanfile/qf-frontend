import { createRouter, createWebHashHistory } from "vue-router"
import { adminRoutes } from "./modules/admin"

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/admin/:catchAll(.*)",
        redirect: "/admin/dashboard",
    },
    ...adminRoutes,
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
export { routes }
