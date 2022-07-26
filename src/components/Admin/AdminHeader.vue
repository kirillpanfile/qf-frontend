<template>
    <header class="admin-header" v-if="user">
        <div class="admin-header__container">
            <div class="admin-header__bungher">
                <div class="admin-header__menu-wrapper" @click="$emit('openBungher')">
                    <div class="admin-header__menu"></div>
                </div>
            </div>
            <ul class="admin-header__info">
                <li class="admin-header__item">
                    <i class="fa-solid fa-bell"></i>
                </li>
                <li class="admin-header__item" @click="logOut">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </li>
                <li class="admin-header__item">
                    <img
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        alt="profilePic"
                        @click="dropOpen = !dropOpen"
                    />
                </li>
                <ul class="admin-header__drop" v-if="dropOpen">
                    <li class="admin-header__item">
                        <i class="fa-solid fa-user"></i>
                        <span>{{ user.username }}</span>
                    </li>
                    <li class="admin-header__item">
                        <i class="fa-solid fa-crown"></i>
                        <span>{{ role }}</span>
                    </li>
                </ul>
            </ul>
        </div>
    </header>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAdminStore } from '@/store/adminStore'
import { storeToRefs } from 'pinia'
const admin = useAdminStore()
const dropOpen = ref(false)
const { user } = storeToRefs(admin) // state
const { logOut } = admin // actions

//user
const role = computed(() => (user?.value.roles.includes('ROLE_ADMIN') ? 'SuperAdmin' : 'Moderator'))

//logout
</script>

<style></style>
