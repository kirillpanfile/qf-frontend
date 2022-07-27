<template>
    <aside class="admin-sidebar" id="admin-sidebar">
        <div class="admin-sidebar__title">
            <div class="admin-sidebar__bungher-exit" @click="open"></div>
            <h1>QuickFood Admin</h1>
        </div>
        <ul class="admin-sidebar__list">
            <router-link to="/admin/dashboard">
                <li v-wave class="admin-sidebar__item"><i class="fa-solid fa-chart-pie"></i> Dashboard</li>
            </router-link>
            <router-link to="/admin/users">
                <li v-wave class="admin-sidebar__item"><i class="fa-solid fa-users"></i> Users</li>
            </router-link>
            <router-link to="/admin/posts">
                <li v-wave class="admin-sidebar__item"><i class="fa-solid fa-paste"></i> Posts</li>
            </router-link>
            <a href="#" @click.prevent="dropOpen = !dropOpen">
                <li v-wave class="admin-sidebar__item">
                    <i class="fa-brands fa-wpforms"></i> Forms
                    <span v-if="!dropOpen"><i class="fa-solid fa-angle-down"></i></span>
                    <span v-else><i class="fa-solid fa-angle-up"></i></span>
                </li>
            </a>

            <div class="admin-sidebar__drop" v-if="dropOpen">
                <router-link to="/admin/form/post">
                    <li v-wave class="admin-sidebar__item"><i class="fa-solid fa-chart-pie"></i> Create Data</li>
                </router-link>
            </div>
            <router-link to="/admin/settings">
                <li v-wave class="admin-sidebar__item"><i class="fa-solid fa-gear"></i> Settings</li>
            </router-link>
        </ul>
    </aside>
</template>

<script setup>
import { ref } from 'vue'

const open = () => document.getElementById('admin-sidebar').classList.toggle('open')

const dropOpen = ref(false)
defineExpose({ open })
</script>

<style></style>
