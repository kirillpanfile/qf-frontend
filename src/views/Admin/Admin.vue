<template>
    <main class="admin-page">
        <admin-header></admin-header>
        <section class="admin-main">
            <admin-aside></admin-aside>
            <div class="admin-content">
                <router-view></router-view>
            </div>
        </section>
    </main>
</template>

<script setup>
import AdminAside from '@/components/Admin/AdminAside.vue'
import AdminHeader from '@/components/Admin/AdminHeader.vue'
</script>

<style></style>
