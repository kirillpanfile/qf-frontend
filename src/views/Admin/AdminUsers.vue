<template>
    <div class="admin-user__wrapper">
        <header class="admin-users__header">
            <div>Users Selected : {{ selected }}</div>
            <div>
                <button v-wave @click="">Ban</button>
                <input type="search" name="" id="" v-model="search" placeholder="Search by username" />
                <button v-wave @click="searchUser">Search</button>
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
import { useStore } from 'vuex'
const store = useStore()
const search = ref('')

onMounted(() => store.dispatch('admin/getUsers'))
const selectUser = (id) => store.commit('admin/setSelectedUser', id)
const createPages = (from, to) => [...Array(to - from + 1).keys()].map((i) => i + from)
const setPage = (page) => store.dispatch('admin/setPage', page)

const users = computed(() => store.state.admin.users)
const selected = computed(() => store.getters['admin/selectedUsers']?.length)
const pages = computed(() => store.state.admin.pages)
const currentPage = computed(() => store.state.admin.currentPage)
const deleteMultiple = () => store.dispatch('admin/deleteMultiple')
const nextPage = () => store.dispatch('admin/nextPage')
const prevPage = () => store.dispatch('admin/prevPage')
const searchUser = () => store.dispatch('admin/searchUser', search.value)

const pagesToShow = computed(() => {
    if (currentPage.value > 1 && currentPage.value < pages.value - 2)
        return createPages(currentPage.value - 1, currentPage.value + 2)
    if (currentPage.value == 1) return createPages(1, 4)
    if (currentPage.value >= pages.value - 2) return createPages(pages.value - 3, pages.value)
})

watch(search, (val) => (val.length == 0 ? store.dispatch('admin/getUsers') : void 0))
</script>

<style></style>
