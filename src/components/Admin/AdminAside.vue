<template>
    <aside class="admin-sidebar" id="admin-sidebar">
        <ul class="admin-sidebar__list">
            <router-link to="/admin/users">
                <li v-wave class="admin-sidebar__item active">Users</li>
            </router-link>
            <router-link to="/admin/posts">
                <li v-wave class="admin-sidebar__item">Posts</li>
            </router-link>
            <li class="admin-sidebar__wrapper">
                <h1 w-wave class="admin-sidebar__item" id="admin-dashboard-title" @click="dashboard">Dashboard</h1>
                <ul class="admin-sidebar__list hidden" id="admin-dashboard">
                    <router-link to="/admin/dashboard/post">
                        <li v-wave class="admin-sidebar__item">Create Post</li>
                    </router-link>
                    <router-link to="/admin/dashboard/card">
                        <li v-wave class="admin-sidebar__item">Card</li>
                    </router-link>
                    <router-link to="/admin">
                        <li v-wave class="admin-sidebar__item">Admin</li>
                    </router-link>
                </ul>
            </li>
            <router-link to="/admin/settings">
                <li v-wave class="admin-sidebar__item">Settings</li>
            </router-link>
        </ul>
    </aside>
</template>

<script setup>
//? Functa open deschide sidebar -- scrii logica aici (asta vine din emit) ? //
const open = () => document.getElementById('admin-sidebar').classList.toggle('open')
//? Dashboard hide/unhide ? //
const dashboard = () => {
    document.getElementById('admin-dashboard').classList.toggle('hidden')
    document.getElementById('admin-dashboard-title').classList.toggle('green')
}
defineExpose({ open })
</script>

<style></style>
