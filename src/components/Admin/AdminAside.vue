<template>
    <aside
        class="z-20 hidden w-64 overflow-y-auto bg-white md:block flex-shrink-0 duration-200 mobile-menu"
        :class="{ active: menuOpen }"
    >
        <div class="py-4 text-gray-500">
            <a class="ml-6 text-lg font-bold text-gray-800"> QuickFood </a>
            <div class="mt-6">
                <AdminSidebarItem
                    v-for="(item, index) in items"
                    :key="index"
                    :path="item.path"
                    :icon="item.icon"
                    :text="item.text"
                    :children="item.children"
                    @press="menuOpen = false"
                />
            </div>

            <div class="px-6 my-6">
                <button
                    @click="refreshPage"
                    class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-white duration-150 bg-lime border border-transparent rounded-lg"
                >
                    Refresh Page
                    <span class="ml-2" aria-hidden="true"><i class="fa-solid fa-rotate-right"></i></span>
                </button>
            </div>
        </div>
    </aside>
    <div class="overlay" v-if="menuOpen" @click="menuOpen = false"></div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminSidebarItem from './AdminSidebarItem.vue'
import { routes } from '@/router'
const menuOpen = ref(false)
const router = useRouter()
const isMobile = ref(false)

const open = () => (menuOpen.value = true)
const refreshPage = () => router.go()

let items = routes
    .find((route) => route.path === '/admin')
    .children.filter((route) => !route.path.includes('/:id') && !route.path.includes('/:catchAll(.*)'))
onMounted(() => {
    console.log(items)
})

// const items = reactive([
//     {
//         link: 'dashboard',
//         icon: 'fa-solid fa-chart-pie',
//         text: 'Dashboard',
//     },
//     {
//         link: 'users',
//         icon: 'fa-solid fa-users',
//         text: 'Users',
//     },
//     {
//         icon: 'fa-solid fa-paste',
//         text: 'Recipes',
//         children: {
//             link: 'recipes/create',
//             icon: 'fa-solid fa-plus',
//             text: 'Create',
//         },
//     },
//     {
//         link: 'notifications',
//         icon: 'fa-solid fa-bell',
//         text: 'Notifications',
//     },
//     {
//         link: 'settings',
//         icon: 'fa-solid fa-gear',
//         text: 'Settings',
//     },
// ])
defineExpose({ open })
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) menuOpen.value = false
})
</script>

<style scoped lang="scss">
.mobile-menu {
    display: block;
    @media (max-width: 768px) {
        position: absolute;
        height: 100vh;
        left: -100%;
    }
}
.active {
    left: 0;
}
.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #0000003a;
}
</style>
