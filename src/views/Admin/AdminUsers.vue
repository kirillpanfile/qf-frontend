<template>
    <div
        class="p-4 bg-white dark:bg-gray-900 block sm:flex items-center justify-between border-b dark:border-slate-600 border-gray-200">
        <div class="mb-1 w-full">
            <div class="mb-4">
                <h1 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-300">All users</h1>
            </div>
            <div class="sm:flex">
                <div
                    class="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 dark:sm:divide-gray-600 mb-3 sm:mb-0">
                    <form class="lg:pr-3" action="#" method="GET">
                        <label for="users-search" class="sr-only">Search</label>
                        <div class="mt-1 relative lg:w-64 xl:w-96">
                            <input
                                type="text"
                                name="email"
                                id="users-search"
                                class="bg-gray-50 dark:bg-slate-700 border dark:text-gray-200 border-gray-300 dark:border-slate-600 text-gray-900 outline-none sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="Search for users" />
                        </div>
                    </form>
                    <div class="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                        <v-button type="button" size="xs" bgColor="no-color"
                            ><i class="fa-solid fa-trash-can text-lg dark:text-gray-400"></i
                        ></v-button>
                    </div>
                </div>
                <div class="flex items-center space-x-2 sm:space-x-3 ml-auto">
                    <v-button type="button" size="sm" bgColor="alternative">
                        <i class="fa-solid fa-plus mr-2"></i>Add User
                    </v-button>
                </div>
            </div>
        </div>
    </div>

    <div class="w-full overflow-hidden shadow-xs dark:bg-slate-900 bg-white">
        <div class="w-full overflow-x-auto">
            <div class="w-full whitespace-nowrap">
                <ul class="bg-white text-gray-200 dark:bg-gray-900 divide-y w-full">
                    <li class="bg-gray-100 dark:bg-gray-800">
                        <div class="py-4 grid grid-cols-12 gap-2">
                            <div class="px-4 flex col-span-7 lg:col-span-4 xl:col-span-3">
                                <h1 class="text-base font-bold text-gray-700 dark:text-gray-400">User</h1>
                            </div>
                            <div class="px-4 hidden lg:block lg:col-span-4 xl:col-span-3">
                                <h1 class="text-base font-bold text-gray-700 dark:text-gray-400">User Id</h1>
                            </div>
                            <div class="col-span-3 hidden xl:block px-4">
                                <h1 class="text-base font-bold text-gray-700 dark:text-gray-400">User Roles</h1>
                            </div>
                            <div class="col-span-5 md:col-span-3 lg:col-span-4 xl:col-span-3 px-4 flex gap-4">
                                <h1 class="text-base font-bold text-gray-700 dark:text-gray-400">Actions</h1>
                            </div>
                        </div>
                    </li>
                    <sequential-entrance class="divide-y dark:border-slate-600" delay="50">
                        <v-list-item
                            v-for="(item, index) in users"
                            v-wave
                            :key="item._id"
                            v-memo="users"
                            :picture="item.picture"
                            :name="item.username"
                            :email="item.email"
                            :id="item._id"
                            :userRoles="item.roles"
                            type="usersLarge"
                            @click="selectUser(item._id)"
                            @edit="openUserModal(item)">
                        </v-list-item>
                    </sequential-entrance>
                </ul>
            </div>
        </div>
    </div>
    <div
        class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase border-t dark:border-slate-600 bg-gray-50 dark:bg-gray-800 sm:grid-cols-9">
        <span class="flex items-center col-span-3"> Showing page {{ currentPage }} of {{ pages }} </span>
        <span class="col-span-2"></span>
        <!-- Pagination -->
        <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav>
                <ul class="inline-flex items-center">
                    <li>
                        <button v-wave @click="prevPage" class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none">
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>
                    </li>

                    <button class="px-3 py-1 rounded-md focus:outline-none" v-if="currentPage > 2" @click="setPage(1)">
                        1
                    </button>
                    <button
                        class="px-3 py-1 rounded-md focus:outline-none"
                        :class="{
                            'btn-pagination-active': currentPage == item,
                        }"
                        v-for="(item, index) in pagesToShow"
                        :key="index"
                        @click="setPage(item)">
                        {{ item }}
                    </button>
                    <button
                        class="px-3 py-1 rounded-md focus:outline-none"
                        v-if="currentPage + 2 < pages"
                        @click="setPage(pages)">
                        {{ pages }}
                    </button>

                    <li>
                        <button v-wave @click="nextPage" class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none">
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        </span>
    </div>

    <app-modal title="User Modal" ref="userModal">
        <div class="grid grid-cols-6 gap-x-6">
            <div class="col-span-6">
                <app-input
                    :disabled="!userEditFlag"
                    title="Username"
                    v-model="user.username"
                    :placeholder="'Username ...'"></app-input>
                <app-input :disabled="!userEditFlag" title="Email" v-model="user.email" :placeholder="'Email ...'">
                </app-input>
            </div>
        </div>

        <!--? Modal Footer-->

        <div class="items-center py-6 border-t border-gray-200 rounded-b flex gap-4">
            <v-button type="button" bgColor="default" size="base" @btnClick="closeUserModal(), editUser(user)">
                Submit</v-button
            >
            <v-button type="button" bgColor="alternative" size="base" @btnClick="editUserModal()">Edit</v-button>
        </div>
    </app-modal>
</template>

<script setup>
import { VListItem, VButton, AppModal, AppSelect, AppInput } from "@/components"
import { onMounted, computed, ref, watch } from "vue"
import { useAdminStore, refs } from "@/store"
import { createRefs } from "@/helpers"

const { loadUsers, selectUser, nextPage, prevPage, setPage, searchUser, deleteMultiple } = useAdminStore()
const { users, pages, currentPage, selectedUsers } = refs(useAdminStore())
const search = ref("")
const userModal = ref(null)
const user = ref({})
const userEditFlag = ref(false)

onMounted(() => {
    users.value.length == 0 && loadUsers()
})

const openUserModal = ({ username, email, _id }) => {
    Object.assign(user, { username, email, id: _id })
    userModal.value.openModal()
}

const editUserModal = () => (userEditFlag.value = true)

const closeUserModal = () => {
    userEditFlag.value = false
    userModal.value.closeModal()
}

/**
 * @description Create an array of pages to show in the pagination
 * @param {number} from  - start index
 * @param {number} to   - end index
 */

const createPages = (from, to) => [...Array(to - from + 1).keys()].map((i) => i + from)

/**
 * @description Pages to show in the pagination depending on the current page
 */
const pagesToShow = computed(() => {
    if (currentPage.value > 1 && currentPage.value < pages.value - 2)
        return createPages(currentPage.value - 1, currentPage.value + 2)
    if (currentPage.value == 1) return createPages(1, 4)
    if (currentPage.value >= pages.value - 2) return createPages(pages.value - 3, pages.value)
})

/**
 * @description Search for a user
 */
watch(search, (val) => val.length === 0 && loadUsers())
</script>

<style>
.btn-pagination-active {
    background-color: #00bcd4;
    color: #fff;
}
</style>
