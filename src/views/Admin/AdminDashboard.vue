<template>
    <main class="pt-6 px-4">
        <div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <admin-block title="12" description="New users this week" size="2xl:col-span-2" h="mobile">
                <template #aditional>
                    <div class="flex items-center justify-end flex-1 text-lime text-base font-bold">
                        <i class="fa fa-arrow-up pr-2"></i>
                        <span>12.5%</span>
                    </div>
                </template>

                <template #body v-if="newUsers">
                    <VChart :data="data" :type="type" :intersec="true" />
                </template>
            </admin-block>

            <admin-block title="New Recipes" description="Incomming from users" h="full">
                <template #aditional>
                    <router-link to="/admin/recipes/all">
                        <v-button type="button" bgColor="no-color" color="lime" size="sm">ViewAll</v-button>
                    </router-link>
                </template>
                <template #header>
                    <header
                        class="grid grid-cols-5 bg-gray-50 dark:bg-gray-700 p-3 rounded-t-lg border-b dark:border-gray-700 gap-x-4 mt-4">
                        <span class="col-span-3 text-gray-500 dark:text-gray-300">Title</span>
                        <span class="text-gray-500 dark:text-gray-300">User</span>
                    </header>
                </template>

                <template #body>
                    <sequential-entrance class="divide-y dark:divide-gray-700 mt-4">
                        <v-list-item
                            v-for="(item, index) in newUsers"
                            :class="{
                                'bg-gray-50 dark:bg-gray-700': index % 2 !== 0,
                            }"
                            v-wave
                            :key="item._id"
                            :picture="item.picture"
                            :name="item.username"
                            :aditional="item.email"
                            type="user"
                            @select="newUsers"
                            @click="openUserView(item)">
                        </v-list-item>
                    </sequential-entrance>
                </template>
            </admin-block>
        </div>
        <div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 pt-6">
            <admin-block title="976" description="Total users" v-wave h="standart">
                <template #aditional>
                    <div class="flex items-center justify-end flex-1 text-lime text-base font-bold">
                        <i class="fa fa-arrow-up pr-2"></i>
                        <span>12.5%</span>
                    </div>
                </template>
            </admin-block>
            <admin-block title="17" description="New users (last month)" v-wave h="standart">
                <template #aditional>
                    <div class="flex items-center justify-end flex-1 text-lime text-base font-bold">
                        <i class="fa fa-arrow-up pr-2"></i>
                        <span>3%</span>
                    </div>
                </template>
            </admin-block>
            <admin-block title="23" description="New Recipes (last month)" v-wave h="standart">
                <template #aditional>
                    <div class="flex items-center justify-end flex-1 text-red-600 text-base font-bold">
                        <i class="fa fa-arrow-down pr-2"></i>
                        <span>-1.2%</span>
                    </div>
                </template>
            </admin-block>
        </div>

        <div class="w-full grid grid-cols-1 xl:grid-cols-2 gap-4 pt-6">
            <admin-block title="New Users" description="Last 10 new users" h="full">
                <template #aditional>
                    <router-link to="/admin/users">
                        <v-button type="button" bgColor="no-color" color="lime" size="sm">View All</v-button>
                    </router-link>
                </template>

                <template #body>
                    <sequential-entrance class="divide-y dark:divide-slate-600 mt-4">
                        <v-list-item
                            v-for="(item, index) in newUsers"
                            v-wave
                            :key="item._id"
                            :picture="item.picture"
                            :name="item.username"
                            :aditional="item.email"
                            type="user"
                            @select="newUsers"
                            @click="openUserView(item)">
                        </v-list-item>
                    </sequential-entrance>
                </template>
            </admin-block>

            <admin-block title="Tasks" description="Need to be done" h="full">
                <template #aditional>
                    <div class="flex gap-4">
                        <v-button type="button" bgColor="no-color" color="lime" size="sm" @click="openTaskCreate">
                            Create +</v-button
                        >
                        <router-link to="/admin/board">
                            <v-button type="button" bgColor="no-color" color="lime" size="sm">View All</v-button>
                        </router-link>
                    </div>
                </template>

                <template #body>
                    <sequential-entrance class="divide-y dark:divide-slate-600 mt-4">
                        <v-list-item
                            v-for="(item, index) in taskToDo"
                            v-wave
                            :key="item._id"
                            :picture="item.user.picture"
                            :name="item.title"
                            :aditional="item.user.username"
                            :flag="item.status"
                            type="user"
                            @select="newUsers"
                            @click="openTaskView(item)">
                        </v-list-item>
                    </sequential-entrance>
                </template>
            </admin-block>
        </div>
        <a
            href="https://github.com/kirillpanfile/qf-frontend"
            target="_blank"
            v-wave
            class="flex items-center justify-between sm:p-3 p-4 mb-8 text-sm shrink font-semibold bg-white rounded-lg shadow-md text-black mt-6 dark:bg-gray-800 dark:text-gray-300">
            <div class="flex items-center">
                <i class="fa-solid fa-code-branch w-5 mr-2"></i>
                <span>Open project on github</span>
            </div>
            <span>View more -></span>
        </a>
    </main>
</template>
<script setup>
import { VButton, AdminBlock, VListItem, VChart } from "@/components"
import { ref, onMounted, inject } from "vue"
import { useAdminStore, useTaskStore, refs } from "@/store"
import { createRefs } from "@/helpers"

const openTask = inject("openTaskModal")
const openTaskCreate = () => openTask("create", {})
const openTaskView = (item) => openTask("view", item)

const openUserModal = inject("openUserModal")
const openUserView = (item) => openUserModal("view", item)

onMounted(() => {
    getRoles()
    if (admins.value == null) getAdmins()
    loadNewUsers()
    if (tasks.value.length == 0) getTasks()
})

const { getAdmins } = useAdminStore()
const { newUsers, admins } = refs(useAdminStore())
const { getTasks } = useTaskStore()
const { tasks, taskToDo } = refs(useTaskStore())

const isDark = ref(window.matchMedia("(prefers-color-scheme: dark)").matches)

const type = "line"
const data = ref({
    labels: ["Jun 1", "Jun 2", "Jun 3", "Jun 4", "Jun 5", "Jun 6"],
    datasets: [
        {
            label: "new users",
            data: [12, 19, 3, 5, 2, 3],
            borderColor: "#91c788",
            backgroundColor: isDark.value ? "rgba(146, 200, 137, 0.2)" : "rgba(146, 200, 137, 0.6)",
            borderWidth: 5,
        },
    ],
})
</script>
