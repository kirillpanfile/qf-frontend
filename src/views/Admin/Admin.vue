<template>
    <div class="bg-gray-50">
        <admin-header @openSideMenu="openAside"></admin-header>
        <div class="flex bg-white overflow-hidden pt-16 h-screen">
            <admin-aside ref="sidemenu"></admin-aside>
            <div class="h-full w-full bg-gray-50 relative overflow-y-auto">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import { AdminHeader, AdminAside } from "@/components"
import { ref } from "vue"

const sidemenu = ref(null)
const openAside = () => sidemenu.value.toggleAside()
</script>

<style></style>
