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
                    :link="item.link"
                    :icon="item.icon"
                    :text="item.text"
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminSidebarItem from './AdminSidebarItem.vue'
const menuOpen = ref(false)
const router = useRouter()
const isMobile = ref(false)

const open = () => (menuOpen.value = true)
const refreshPage = () => router.go()

const items = reactive([
    {
        link: 'dashboard',
        icon: 'fa-solid fa-chart-pie',
        text: 'Dashboard',
    },
    {
        link: 'users',
        icon: 'fa-solid fa-users',
        text: 'Users',
    },
    {
        link: 'posts',
        icon: 'fa-solid fa-paste',
        text: 'Posts',
    },
    // {
    //     link: 'post',
    //     icon: 'fa-solid fa-plus',
    //     text: 'Create Data',
    // },
    {
        link: 'settings',
        icon: 'fa-solid fa-gear',
        text: 'Settings',
    },
])
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) menuOpen.value = false
})
defineExpose({ open })
</script>

<style scoped lang="scss">
.router-link-exact-active {
    border-left: 4px solid #91c788;
    color: #1f2937;
}

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
