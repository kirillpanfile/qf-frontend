<template>
    <h1 class="my-6 text-2xl font-semibold text-gray-700">Users</h1>

    <header class="w-full md:flex block justify-between pb-8">
        <div>Users Selected : {{ selectedUsers.length }}</div>
        <div class="flex gap-6 md:pt-0 pt-6">
            <button class="bg-green-300 p-2" v-wave>Ban</button>

            <input
                class="appearance-none bg-transparent border-b border-lime w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Jane Doe"
                v-model="search"
            />
            <button class="bg-green-300 p-2" v-wave @click="searchUser(search)">Search</button>
            <button class="bg-green-300 p-2" v-wave @click="deleteMultiple">Delete</button>
        </div>
    </header>
    <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
            <table class="w-full whitespace-nowrap">
                <thead>
                    <tr
                        class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 mb-2"
                    >
                        <th class="pb-4 md:block hidden">Pic</th>
                        <th class="pb-4">User</th>
                        <th class="pb-4">Role</th>
                        <th class="pb-4 lg:block hidden">Email</th>
                        <th class="pb-4">Action</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y">
                    <admin-users-card
                        v-wave
                        v-for="(item, index) in users"
                        :key="index"
                        v-memo="users"
                        :user="item"
                        @select="selectUser"
                    ></admin-users-card>
                </tbody>
            </table>
        </div>
    </div>
    <div
        class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t bg-gray-50 sm:grid-cols-9"
    >
        <span class="flex items-center col-span-3"> Showing page {{ currentPage }} of {{ pages }} </span>
        <span class="col-span-2"></span>
        <!-- Pagination -->
        <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav>
                <ul class="inline-flex items-center">
                    <li>
                        <button
                            v-wave
                            @click="prevPage"
                            class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                        >
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>
                    </li>

                    <button
                        class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                        v-if="currentPage > 2"
                        @click="setPage(1)"
                    >
                        1
                    </button>
                    <button
                        class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                        :class="{
                            'btn-pagination-active': currentPage == item,
                        }"
                        v-for="(item, index) in pagesToShow"
                        :key="index"
                        @click="setPage(item)"
                    >
                        {{ item }}
                    </button>
                    <button
                        class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                        v-if="currentPage + 2 < pages"
                        @click="setPage(pages)"
                    >
                        {{ pages }}
                    </button>

                    <li>
                        <button
                            v-wave
                            @click="nextPage"
                            class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                        >
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        </span>
    </div>
</template>

<script setup>
import AdminUsersCard from '@/components/Admin/AdminUsersCard.vue'
import { onMounted, computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAdminStore } from '@/store/adminStore'

const search = ref('')
const admin = useAdminStore()
onMounted(() => loadUsers())

const { loadUsers, selectUser, nextPage, prevPage, setPage, searchUser, deleteMultiple } = admin // actions
const { users, pages, currentPage, selectedUsers } = storeToRefs(admin) // state

const createPages = (from, to) => [...Array(to - from + 1).keys()].map((i) => i + from)

const pagesToShow = computed(() => {
    if (currentPage.value > 1 && currentPage.value < pages.value - 2)
        return createPages(currentPage.value - 1, currentPage.value + 2)
    if (currentPage.value == 1) return createPages(1, 4)
    if (currentPage.value >= pages.value - 2) return createPages(pages.value - 3, pages.value)
})

watch(search, (val) => (val.length === 0 ? loadUsers() : void 0))
</script>

<style></style>
