<template>
    <header class="admin-header">
        <div class="admin-header__container">
            <div class="admin-header__bungher">
                <div class="admin-header__menu" @click="$emit('openBungher')"></div>
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
            </ul>
        </div>
    </header>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed,ref } from 'vue'

// consts
const store = useStore()
const bungherFlag = ref(false)

//user
const user = computed(() => store.state.admin.user)
const role = computed(() => (user?.value.roles.includes('ROLE_ADMIN') ? 'SuperAdmin' : 'Moderator'))

//logout
const logOut = () => store.commit('admin/logoutAdmin')
</script>

<style></style>
