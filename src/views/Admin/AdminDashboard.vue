<template>
    <main class="pt-6 px-4">
        <div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">12</span>
                        <h3 class="text-base font-normal text-gray-500">New users this week</h3>
                    </div>
                    <div class="flex items-center justify-end flex-1 text-lime text-base font-bold">
                        <i class="fa fa-arrow-up pr-2"></i>
                        <span>12.5%</span>
                    </div>
                </div>
                <AdminChart class="block w-full max-h-64 xl:max-h-[490px]" />
            </div>
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">New Recipes</span>
                        <h3 class="text-base font-normal text-gray-500">Incomming from users</h3>
                    </div>
                    <router-link
                        to="/admin/recipes/all"
                        class="text-sm cursor-pointer font-medium text-lime hover:bg-gray-100 rounded-lg p-2">
                        view all
                    </router-link>
                </div>
                <header class="grid grid-cols-4 bg-gray-50 p-3 rounded-t-lg border-b gap-x-4">
                    <span class="col-span-2 text-gray-500">Title</span>
                    <span class="text-gray-500">User</span>
                    <span class="text-gray-500">Status</span>
                </header>

                <!--! Component AdminListItem.vue-->
                <div class="overflow-hidden">
                    <sequential-entrance>
                        <router-link
                            :to="`/admin/recipes/${item._id}`"
                            class="grid grid-cols-4 gap-x-4 p-3 items-center hover:bg-gray-200 rounded-md"
                            v-for="(item, index) in recipe"
                            :key="item._id"
                            :class="(index + 1) % 2 == 0 && 'bg-gray-50'">
                            <span class="col-span-2 text-gray-500" v-if="!item.langs.ro.title">No title</span>
                            <!--TODO de sters asta cind o sa lucreze validarea la title-->
                            <span
                                class="col-span-2 text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis"
                                v-else
                                >{{ item.langs.ro.title }}</span
                            >
                            <span class="text-black font-bold whitespace-nowrap overflow-hidden text-ellipsis">{{
                                item?.user?.username
                            }}</span>
                            <span
                                :class="{
                                    'text-lime': item.approved === 'approved',
                                    'text-yellow-500': item.approved === 'pending',
                                    'text-red-600': item.approved === 'rejected',
                                }"
                                >{{ item.approved }}</span
                            >
                        </router-link>
                    </sequential-entrance>
                </div>
            </div>
        </div>
        <div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 pt-6">
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8" v-ripple>
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">976</span>
                        <h3 class="text-base font-normal text-gray-500">Total users</h3>
                    </div>
                    <div class="flex items-center justify-end flex-1 text-lime text-base font-bold">
                        <i class="fa fa-arrow-up pr-2"></i>
                        <span>12.5%</span>
                    </div>
                </div>
            </div>
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8" v-ripple>
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">17</span>
                        <h3 class="text-base font-normal text-gray-500">New users (last month)</h3>
                    </div>
                    <div class="flex items-center justify-end flex-1 text-lime text-base font-bold">
                        <i class="fa fa-arrow-up pr-2"></i>
                        <span>3%</span>
                    </div>
                </div>
            </div>
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8" v-ripple>
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">23</span>
                        <h3 class="text-base font-normal text-gray-500">New Recipes (last month)</h3>
                    </div>
                    <div class="flex items-center justify-end flex-1 text-red-600 text-base font-bold">
                        <i class="fa fa-arrow-down pr-2"></i>
                        <span>-1.2%</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full grid grid-cols-1 xl:grid-cols-2 gap-4 pt-6">
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">New Users</span>
                        <h3 class="text-base font-normal text-gray-500">Last 10 new users</h3>
                    </div>
                    <router-link to="/admin/users"
                        class="text-sm cursor-pointer font-medium text-lime hover:bg-gray-100 rounded-lg p-2">
                        view all
                    </router-link>
                </div>
                <div class="overflow-y-scroll overflow-x-hidden max-h-96">
                    <sequential-entrance class="divide-y">
                        <admin-users-card
                            v-for="(item, index) in newUsers"
                            :key="index"
                            :user="item"
                            type="new"
                            @select="newUsers"
                            @click="openUserModal(item)">
                        </admin-users-card>
                    </sequential-entrance>
                </div>
            </div>
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">Tasks</span>
                        <h3 class="text-base font-normal text-gray-500">Need to be done</h3>
                    </div>

                    <div class="flex gap-4">
                        <div
                            class="text-sm cursor-pointer font-medium text-lime hover:bg-gray-100 rounded-lg p-2 select-none"
                            @click="openTaskModal">
                            Create +
                        </div>
                        <router-link
                            class="text-sm cursor-pointer font-medium text-lime hover:bg-gray-100 rounded-lg p-2 select-none" to="/admin/board">
                            view all
                        </router-link>
                    </div>
                </div>
                <div class="border-t overflow-y-scroll cursor-pointer select-none max-h-96">
                    <div
                        class="hover:bg-gray-100 flex items-center gap-x-4 p-2"
                        v-ripple
                        v-for="(item, index) in tasks"
                        :key="task._id">
                        <input
                            id="checkbox-1"
                            aria-describedby="checkbox-1"
                            type="checkbox"
                            class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded block" />
                        <div class="whitespace-nowrap space-x-6">
                            <div
                                class="w-10 h-10 flex items-center justify-center text-xl rounded-full border-dashed border overflow-hidden">
                                <img :src="item.user.picture" alt="profilePic" />
                            </div>
                        </div>
                        <div
                            class="whitespace-nowrap text-ellipsis overflow-hidden text-base font-medium text-gray-900">
                            {{ item.title }}
                        </div>
                        <div class="whitespace-nowrap font-medium text-sm text-gray-900 col-span-2 ml-auto">
                            <span class="bg-lime px-4 py-1 text-white rounded-sm">{{ item.status }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <a
            href="https://github.com/kirillpanfile/qf-frontend"
            target="_blank"
            v-ripple
            class="flex items-center justify-between sm:p-3 p-4 mb-8 text-sm shrink font-semibold bg-white rounded-lg shadow-md text-black mt-6">
            <div class="flex items-center">
                <i class="fa-solid fa-code-branch w-5 mr-2"></i>
                <span>Open project on github</span>
            </div>
            <span>View more -></span>
        </a>

        <!--? Task Modal -->
        <app-modal title="Create New Task" ref="taskModal">
            <div class="grid grid-cols-6 gap-x-6">
                <div class="col-span-6">
                    <app-input
                        title="Task title"
                        :placeholder="'Task title ...'"
                        :disabled="false"
                        v-model="task.title"></app-input>
                    <app-textarea
                        v-model="task.description"
                        title="Description"
                        :placeholder="'Description ...'"
                        :disabled="false"></app-textarea>
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <app-select title="Select User" :options="admins" v-model="task.user" :disabled="false">
                    </app-select>
                    <!--? Default value = 0 -->
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <app-select title="Flag" :options="flags" v-model="task.flag" :disabled="false"></app-select>
                </div>
                <div class="col-span-6">
                    <app-select title="Status" v-model="task.status" :options="lists" :disabled="false"></app-select>
                </div>
            </div>

            <!--? Modal Footer-->

            <div class="items-center py-6 border-t border-gray-200 rounded-b flex gap-4">
                <app-button text="Submit" @btnClick="createTask(task)"></app-button>
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
                <app-button text="Submit" @btnClick="closeUserModal(), editUser(user)"></app-button>
                <app-button text="Edit" @btnClick="editUserModal"></app-button>
            </div>
        </app-modal>
    </main>
</template>
<script setup>
import { AdminUsersCard, AppModal, AdminChart, AppInput, AppTextarea, AppSelect, AppButton } from "@/components"
import { reactive, ref } from "vue"
import { useAdminStore, useRecipeStore, useTaskStore, refs } from "@/store"

const { editUser, getAdmins } = useAdminStore()
const { newUsers, roles, admins } = refs(useAdminStore())
// const { getAllRecipes } = useRecipeStore()
const { recipe } = refs(useRecipeStore())
const { createTask } = useTaskStore()
const { tasks, flags, lists } = refs(useTaskStore())

// User Values

const userEditFlag = ref(false)
const taskModal = ref(null)
const userModal = ref(null)

const user = reactive({
    username: null,
    email: null,
    roles: null,
    id: null,
})

const task = reactive({
    title: null,
    description: null,
    flag: "Low",
    status: "Open",
    user: null,
})

// User Functions
const openUserModal = ({ username, email, roles, _id }) => {
    userModal.value.openModal()
    Object.assign(user, { username, email, roles: roles[0]._id, id: _id })
}

const closeUserModal = () => {
    ;(userEditFlag.value = false), userModal.value.closeModal()
}
const editUserModal = () => (userEditFlag.value = true)

// Task Functions
const openTaskModal = () => taskModal.value.openModal()
</script>
