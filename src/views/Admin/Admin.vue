<template>
    <main class="admin-page">
        <admin-aside ref="sidemenu"></admin-aside>
        <section class="admin-main">
            <admin-header @openBungher="openAside"></admin-header>
            <div class="admin-content">
                <div class="admin-container">
                    <router-view></router-view>
                </div>
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
