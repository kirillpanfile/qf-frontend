<template>
    <aside
        class="z-20 hidden pt-5 w-64 overflow-y-auto px-6 bg-white md:block flex-shrink-0 duration-200 mobile-menu"
        :class="{ active: menuOpen }"
    >
        <div class="space-y-2 pb-2">
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
