<template>
    <aside
        class="z-20 hidden pt-5 w-64 overflow-y-auto px-6 bg-white md:block flex-shrink-0 duration-200 "
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

    <div class="fixed w-full h-full bg-[#0000003a]" v-if="menuOpen" @click="menuOpen = false"></div>
</template>

<script setup>
import { AdminSidebarItem } from '@/components'
import { ref, onMounted, onUnmounted } from 'vue'
import { routes } from '@/router'

const menuOpen = ref(false)


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

.active {
    left: 0;
}

</style>
