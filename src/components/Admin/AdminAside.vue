<template>
    <aside class="admin-sidebar" id="admin-sidebar">
        <ul class="admin-sidebar__lisl">
            <router-link to="/admin/users">
                <li v-wave class="admin-sidebar__item active">Users</li>
            </router-link>
            <router-link to="/admin/posts">
                <li v-wave class="admin-sidebar__item">Posts</li>
            </router-link>
            <router-link to="/admin/dashboard">
                <li v-wave class="admin-sidebar__item">DashBoard</li>
            </router-link>
            <router-link to="/admin/settings">
                <li v-wave class="admin-sidebar__item">Settings</li>
            </router-link>
        </ul>
    </aside>
</template>

<script setup>
//? Functa open deschide sidebar -- scrii logica aici (asta vine din emit) ? //
const open = () => document.getElementById('admin-sidebar').classList.toggle('open')
defineExpose({ open })
</script>

<style></style>
