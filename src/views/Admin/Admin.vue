<template>
    <div class="flex h-screen bg-gray-50">
        <admin-aside ref="sidemenu"></admin-aside>
        <section class="flex flex-col flex-1">
            <admin-header @toggleSideMenu="openAside"></admin-header>
            <div class="h-full pb-16 overflow-y-auto">
                <div class="container max-w-7xl px-6 mx-auto grid">
                    <router-view></router-view>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { AdminHeader, AdminAside } from '@/components'
import { ref } from 'vue'

const sidemenu = ref(null)
const openAside = () => sidemenu.value.open()
</script>

<style></style>
