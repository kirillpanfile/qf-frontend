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
import { ref, onMounted } from "vue"
import { AdminHeader, AdminAside, AdminWrapper } from "@/components"
import { useAdminStore } from '@/store'

const { getRoles, loadNewUsers } = useAdminStore() 

onMounted(() => {
    getRoles()
    loadNewUsers()
})

const sidemenu = ref(null)
const openAside = () => sidemenu.value.toggleAside()
</script>

<style></style>
