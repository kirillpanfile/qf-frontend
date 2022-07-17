<template>
    <header class="admin-header">
        <div class="admin-header__container">
            <h1 class="admin-header__title">Admin</h1>
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

<script>
export default {
    name: 'AdminHeader',
}
</script>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

// consts
const store = useStore()

//user
const user = computed(() => store.state.admin.user)
const role = computed(() => (user?.value.roles.includes('ROLE_ADMIN') ? 'SuperAdmin' : 'Moderator'))

//logout
const logOut = () => store.commit('admin/logoutAdmin')
</script>

<style></style>
