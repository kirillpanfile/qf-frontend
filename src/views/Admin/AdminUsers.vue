<template>
    <div class="admin-user__wrapper">
        <header class="admin-users__header">
            <div>Users Selected : {{ selected }}</div>
            <div class="header-buttons">
                <button v-wave>Ban</button>
                <input type="search" v-model="search" placeholder="Search by username" />
                <button v-wave @click="searchUser(search)">Search</button>
                <button v-wave @click="deleteMultiple">Delete</button>
            </div>
        </header>

        <admin-users-card
            v-wave
            v-for="(item, index) in users"
            :key="index"
            v-memo="users"
            :user="item"
            @select="selectUser"
        ></admin-users-card>

        <footer class="admin-pagination">
            <div class="admin-pagination__container">
                <button v-wave @click="prevPage">Prev</button>
                <button class="btn-pagination" v-if="currentPage > 2" @click="setPage(1)">1</button>
                <button
                    class="btn-pagination"
                    :class="{
                        'btn-pagination-active': currentPage == item,
                    }"
                    v-for="(item, index) in pagesToShow"
                    :key="index"
                    @click="setPage(item)"
                >
                    {{ item }}
                </button>
                <button class="btn-pagination" v-if="currentPage + 2 < pages" @click="setPage(pages)">
                    {{ pages }}
                </button>
                <button v-wave @click="nextPage">Next</button>
            </div>
        </footer>
    </div>
</template>

<script setup>
import AdminUsersCard from '@/components/Admin/AdminUsersCard.vue'
import { onMounted, computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAdminStore } from '@/state/adminStore'
const search = ref('')

const admin = useAdminStore()

const { loadUsers, selectUser, nextPage, prevPage, setPage, searchUser, deleteMultiple } = admin // methods
const { users, pages, currentPage } = storeToRefs(admin) // state

onMounted(() => loadUsers())

const createPages = (from, to) => [...Array(to - from + 1).keys()].map((i) => i + from)

const pagesToShow = computed(() => {
    if (currentPage.value > 1 && currentPage.value < pages.value - 2)
        return createPages(currentPage.value - 1, currentPage.value + 2)
    if (currentPage.value == 1) return createPages(1, 4)
    if (currentPage.value >= pages.value - 2) return createPages(pages.value - 3, pages.value)
})

watch(search, (val) => {
    if (val.length === 0) loadUsers()
})
</script>

<style></style>
