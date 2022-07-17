<template>
    <div class="admin-user__wrapper">
        <header class="admin-users__header">
            <div>Users Selected : {{ selected }}</div>
            <div>
                <button v-wave @click="">Ban</button>
                <button v-wave @click="">Suspend</button>
                <button v-wave @click="">Delete</button>
            </div>
        </header>
        <admin-users-card
            v-wave
            v-for="(item, index) in users"
            :key="index"
            :user="item"
            @select="selectUser"
        ></admin-users-card>

        <footer class="admin-pagination">
            <div class="admin-pagination__container">
                <button v-wave @click="prevPage">Prev</button>
                <button v-wave @click="nextPage">Next</button>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

onMounted(() => store.dispatch('admin/getUsers'))
const selectUser = (id) => store.commit('admin/setSelectedUser', id)

const users = computed(() => store.state.admin.users)
const selected = computed(() => store.getters['admin/selectedUsers']?.length)

const nextPage = () => store.dispatch('admin/nextPage')
const prevPage = () => store.dispatch('admin/prevPage')
</script>

<style></style>
