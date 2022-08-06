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
                    @click="go"
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
import { AdminSidebarItem } from '@/components'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { routes } from '@/router'

const { go } = useRouter(),
    menuOpen = ref(false),
    isMobile = ref(false)

const open = () => (menuOpen.value = true)

/**
 * @description Automatic Sidebar creation with routes used in admin panel
 */
const items = routes.find((route) => route.path === '/admin').children.filter((route) => !route.exclude)

/**
 * @description on mobile leave the menu closes
 */
const watchResize = () => window.innerWidth >= 768 && (menuOpen.value = false)

onMounted(() => window.addEventListener('resize', watchResize))
onUnmounted(() => window.removeEventListener('resize', watchResize))
defineExpose({ open })
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
