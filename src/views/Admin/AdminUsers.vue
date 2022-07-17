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
                <button class="btn-pagination" v-if="currentPage < pages" @click="setPage(pages)">{{ pages }}</button>
                <button v-wave @click="nextPage">Next</button>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

//load
onMounted(() => store.dispatch('admin/getUsers'))
const selectUser = (id) => store.commit('admin/setSelectedUser', id)

//Computed
const users = computed(() => store.state.admin.users)
const selected = computed(() => store.getters['admin/selectedUsers']?.length)
const pages = computed(() => store.state.admin.pages)
const currentPage = computed(() => store.state.admin.currentPage)

// pagesToShow is a  function that returns an array of numbers from to
const createPages = (from, to) => {
    let pages = []
    for (let i = from; i <= to; i++) pages.push(i)
    return pages
}

const setPage = (page) => store.dispatch('admin/setPage', page)

// pagesToShow is a computed that returns an array of pages to show
const pagesToShow = computed(() => {
    if (currentPage.value > 1 && currentPage.value < pages.value - 2)
        return createPages(currentPage.value - 1, currentPage.value + 2)
    if (currentPage.value == 1) return createPages(1, 4)
    if (currentPage.value >= pages.value - 2) return createPages(pages.value - 3, pages.value)
})

// nextPage is a function that returns the next page
const nextPage = () => store.dispatch('admin/nextPage')
// prevPage is a function that returns the previous page
const prevPage = () => store.dispatch('admin/prevPage')
</script>

<style></style>
