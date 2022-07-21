<template>
    <main class="admin-page">
        <admin-header @openBungher="openAside"></admin-header>
        <section class="admin-main">
            <admin-aside ref="sidemenu"></admin-aside>
            <div class="admin-content">
                <router-view></router-view>
            </div>
        </section>
    </main>
</template>

<script setup>
import AdminAside from '@/components/Admin/AdminAside.vue'
import AdminHeader from '@/components/Admin/AdminHeader.vue'
import { ref } from 'vue'
const sidemenu = ref(null)
const openAside = () => sidemenu.value.open()
</script>

<style></style>
