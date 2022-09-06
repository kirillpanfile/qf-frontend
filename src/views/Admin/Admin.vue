<template>
    <admin-wrapper>
        <template #header>
            <AdminHeader @openSideMenu="openAside"></AdminHeader>
        </template>
        <template #aside>
            <AdminAside ref="sidemenu"></AdminAside>
        </template>
        <template #view>
            <router-view></router-view>
        </template>
    </admin-wrapper>
</template>

<script setup>
import { ref } from "vue"
import { AdminHeader, AdminAside, AdminWrapper } from "@/components"

const sidemenu = ref(null)
const openAside = () => sidemenu.value.toggleAside()
</script>

<style></style>
