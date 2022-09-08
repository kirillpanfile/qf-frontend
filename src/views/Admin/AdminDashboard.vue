<template>
    <main class="pt-6 px-4">
        <div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <admin-block title="12" description="New users this week" size="2xl:col-span-2" h="full">
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
                            @click="openUserModal(item)">
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
                            @click="openUserModal(item)">
                        </v-list-item>
                    </sequential-entrance>
                </template>
            </admin-block>

            <admin-block title="Tasks" description="Need to be done" h="full">
                <template #aditional>
                    <div class="flex gap-4">
                        <v-button type="button" bgColor="no-color" color="lime" size="sm" @click="openCreateTaskModal"
                            >Create +</v-button
                        >
                        <router-link to="/admin/board">
                            <v-button type="button" bgColor="no-color" color="lime" size="sm">View All</v-button>
                        </router-link>
                    </div>
                </template>

                <template #body>
                    <sequential-entrance class="divide-y dark:divide-slate-600 mt-4">
                        <v-list-item
                            v-for="(item, index) in tasks"
                            v-wave
                            :key="item._id"
                            :picture="item.user.picture"
                            :name="item.title"
                            :aditional="item.user.username"
                            :flag="item.status"
                            type="user"
                            @select="newUsers"
                            @click="openTaskModal(item._id)">
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

        <!--? Task Modal -->
        <app-modal
        :title="taskData.title"
        ref="taskModal"
        :titleInput="true"
        @titleChange="(title) => (taskData.title = title)">
        <div class="grid grid-cols-6 gap-x-6">
            <div class="col-span-6">
                <app-textarea
                    v-model="taskData.description"
                    title="Description"
                    :placeholder="'Description ...'"
                    :disabled="false">
                </app-textarea>
            </div>
            <div class="col-span-6 sm:col-span-3">
                <app-select title="Select User" :options="admins" v-model="taskData.user._id" :disabled="false">
                </app-select>
            </div>
            <div class="col-span-6 sm:col-span-3">
                <app-select title="Flag" v-model="taskData.flag" :options="flags" :disabled="false"> </app-select>
            </div>
        </div>

        <div class="items-center py-6 border-t border-gray-200 rounded-b flex gap-4">
            <v-button
                type="button"
                bgColor="default"
                size="base"
                @btnClick="closeTaskModal(), updateTask(taskData._id, taskData), closeTaskModal()">
                Submit
            </v-button>
            <v-button type="button" bgColor="red" size="base" @btnClick="deleteTask(taskData._id), closeTaskModal()">Delete</v-button>
        </div>
        </app-modal>

        <!--? Create Task Modal -->
        <app-modal ref="createTaskModal" title="Create Task" :titleInput="false">
            <div class="grid grid-cols-6 gap-x-6">
            <div class="col-span-6">
                <app-input
                    v-model="createData.title"
                    title="Title"
                    placeholder="Title..."
                    :disabled="false">
                </app-input>
            </div>
            <div class="col-span-6">
                <app-textarea
                    v-model="createData.description"
                    title="Description"
                    placeholder="Description ..."
                    :disabled="false">
                </app-textarea>
            </div>
            <div class="col-span-6 sm:col-span-3">
                <app-select title="Select User" :options="admins" v-model="createData.user" :disabled="false">
                </app-select>
            </div>
            <div class="col-span-6 sm:col-span-3">
                <app-select title="Flag" v-model="createData.flag" :options="flags" :disabled="false"> </app-select>
            </div>
        </div>

        <div class="items-center py-6 border-t border-gray-200 rounded-b flex gap-4">
            <v-button
                type="button"
                bgColor="default"
                size="base"
                @btnClick="createTask(createData) ,closeCreateTaskModal()">
                Submit
            </v-button>
        </div>
        </app-modal>

        <!--? User Modal -->
        <app-modal title="User Modal" ref="userModal">
            <div class="grid grid-cols-6 gap-x-6">
                <div class="col-span-6">
                    <app-input
                        :disabled="!userEditFlag"
                        title="Username"
                        v-model="user.username"
                        :placeholder="'Username ...'"></app-input>
                    <app-input
                        :disabled="!userEditFlag"
                        title="Email"
                        v-model="user.email"
                        :placeholder="'Email ...'"></app-input>
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <app-select :disabled="!userEditFlag" v-model="user.roles" title="User Role" :options="roles" />
                </div>
            </div>

            <!--? Modal Footer-->

            <div class="items-center py-6 border-t border-gray-200 rounded-b flex gap-4">
                <v-button type="button" bgColor="default" size="base" @btnClick="closeUserModal(), editUser(user)"
                    >Submit</v-button
                >
                <v-button type="button" bgColor="alternative" size="base" @btnClick="editUserModal">Edit</v-button>
            </div>
        </app-modal>
    </main>
</template>
<script setup>
import { AppModal, AppInput, AppTextarea, AppSelect, VButton, AdminBlock, VListItem, VChart } from "@/components"
import { reactive, ref, onMounted } from "vue"
import { useAdminStore, useRecipeStore, useTaskStore, refs } from "@/store"

const { editUser, getAdmins, loadNewUsers, getRoles } = useAdminStore()
const { newUsers, roles, admins } = refs(useAdminStore())
const { getTasks, createTask, updateTask, deleteTask, } = useTaskStore()
// const { recipe } = refs(useRecipeStore())
const { tasks, flags, lists } = refs(useTaskStore())

onMounted(() => {
    getRoles()
    if (admins.value == null) getAdmins()
    loadNewUsers()
    if (tasks.value.length == 0) getTasks()
})

const userEditFlag = ref(false)
const taskModal = ref(null)
const userModal = ref(null)
const user = reactive({})
const taskData = reactive({})
const createTaskModal = ref(null)
const createData = reactive({
    flag: 'Low',
    user: "62f90f56a3a0c9fe75e9f77b",
    status: lists.value[0].name
})

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

const openUserModal = ({ username, email, roles, _id }) => {
    userModal.value.openModal()
    Object.assign(user, { username, email, roles: roles[0]._id, id: _id })
}
const closeUserModal = () => {
    userEditFlag.value = false
    userModal.value.closeModal()
}
const editUserModal = () => (userEditFlag.value = true)

const openCreateTaskModal = () => createTaskModal.value.openModal()
const closeCreateTaskModal = () => {
    Object.assign(createData, {title: '', description: '', flag: 'Low', user: '62f90f56a3a0c9fe75e9f77b'})
    createTaskModal.value.closeModal()
}

const openTaskModal = (id) => {
    const task = tasks.value.find((e) => e._id == id)
    Object.assign(taskData, task)
    taskModal.value.openModal()
}
const closeTaskModal = () => taskModal.value.closeModal()

</script>
