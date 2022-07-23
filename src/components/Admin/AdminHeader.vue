<template>
    <header class="admin-header" v-if="user">
        <div class="admin-header__container">
            <div class="admin-header__bungher">
                <div class="admin-header__menu-wrapper" @click="$emit('openBungher')">
                    <div class="admin-header__menu"></div>
                </div>
                <h1 class="admin-header__title">Admin</h1>
            </div>
            <ul class="admin-header__info">
                <li class="admin-header__item">
                    <h1>{{ user.username }}</h1>
                </li>
                <li class="admin-header__item">
                    <span>role : {{ role }}</span>
                </li>
                <li class="admin-header__item">
                    <button v-wave @click="logOut">Log Out</button>
                </li>
                <li class="admin-header__item">
                    <button v-wave><router-link to="/admin/card">test</router-link></button>
                </li>
            </ul>
        </div>
    </header>
</template>

<script setup>
import { computed } from 'vue'
import { useAdminStore } from '@/store/adminStore'
import { storeToRefs } from 'pinia'
const admin = useAdminStore()

const { user } = storeToRefs(admin) // state
const { logOut } = admin // actions

//user
const role = computed(() => (user?.value.roles.includes('ROLE_ADMIN') ? 'SuperAdmin' : 'Moderator'))

//logout
</script>

<style></style>
