<template>
    <!-- <div class="flex h-screen bg-gray-50 color-fish-chrome">
        <admin-aside ref="sidemenu"></admin-aside>
        <section class="flex flex-col flex-1 w-full max-w-[1440px] pl-10">
            <admin-header @toggleSideMenu="openAside"></admin-header>
            <div class="h-full pb-16 overflow-y-auto">
                <div class="container px-6 mx-auto grid">
                    <router-view></router-view>
                </div>
            </div>
        </section>
    </div> -->
    <div class="bg-gray-50">
        <admin-header @openSideMenu="openAside"></admin-header>
        <div class="flex bg-white overflow-hidden pt-16 h-screen">
            <admin-aside ref="sidemenu"></admin-aside>
            <div class="h-full w-full bg-gray-50 relative overflow-y-auto">
                <router-view></router-view>
            </div>
        </div>

        <!-- 
        <section class="flex flex-col flex-1 w-full max-w-[1440px] pl-10">
            <admin-header @toggleSideMenu="openAside"></admin-header>
            <div class="h-full pb-16 overflow-y-auto">
                <div class="container px-6 mx-auto grid">
                    <router-view></router-view>
                </div>
            </div>
        </section> -->
    </div>
</template>

<script setup>
import { AdminHeader, AdminAside } from '@/components'
import { ref } from 'vue'

const sidemenu = ref(null)
const openAside = () => sidemenu.value.toggleAside()

</script>

<style></style>
